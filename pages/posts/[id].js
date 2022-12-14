import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import Widgets from '../../components/Widgets'
import CommentModel from '../../components/CommentModel'
import Post from '../../components/Post';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { comment } from 'postcss';
import Comment from '../../components/Comment';
import { AnimatePresence ,motion} from 'framer-motion';


export default function PostPage({newsResults,randomUsersResults}) {

    const router = useRouter();
    const {id} = router.query;
    const [post,setPost] = useState(null);
    const [comments,setComments] = useState([]);

   

    // get post data
    useEffect(()=>{    
         onSnapshot(doc(db,'posts',id),
        snapshot=>{
          setPost(snapshot);
        })
        
    },[db,id]);

    // get post comments
    useEffect(()=>{
      onSnapshot(query(collection(db,"posts",id,"comments"), orderBy("timestemp","desc")) , snapshot=>setComments(snapshot.docs));
    },[db,id])



  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className='flex min-h-screen   mx-auto '>

        {/* sidebar */}
        <Sidebar/>



        {/* Feed */}
        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
            
            {/* header */}
            <div className="flex items-center py-2 px-3 sticky space-x-2 top-0 z-50 bg-white border-b border-gray-200">
                <div className='hoverEffect' onClick={()=>router.push('/')}>
                    <ArrowLeftIcon className='h-5'/>
                </div>
                <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
            </div>

            {/* post render */}
            {post &&   <Post id={id} post={post} />}


            {/* comments render */}
            {comments.length > 0 && (
              <div>
                <AnimatePresence>
                {comments.map(comment=>(
                  <motion.div key={comment.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
                    <Comment key={comment.id} originalPostId={id} commentId={comment.id} comment={comment.data()}/>
                  </motion.div>
                  ))}
                </AnimatePresence>
              </div> 
            )}


        </div>


        {/* Widgets */}
        <Widgets newsResults={newsResults.articles} randomUsersResults={randomUsersResults.results} />

        {/* modal */}
        <CommentModel/>
      </main>
    
    </div>
  )
}


// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json
// https://randomuser.me/api/?results=30&inc=name,login,picture

export async function getServerSideProps(){
  // news api
  const newsResults = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json').then(res=>res.json());
  
  // followers
  
  const randomUsersResults = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture").then(res=>res.json()); 
  return{
    props:{
      newsResults,
      randomUsersResults
    }
  }
}

