import { SparklesIcon } from "@heroicons/react/outline"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { AnimatePresence,motion} from "framer-motion"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import Input from "./Input"
import Post from "./Post"

const Feed = () => {


  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    return onSnapshot(
      query(collection(db,"posts"), orderBy('timestemp',"desc")),
      (snapshot)=>{
        setPosts(snapshot.docs)
      });
      
  },[]);

  

  // const posts = [
  //   {
  //     id:"1",
  //     name:'Gal Mizrahi',
  //     username:'galmizrahi',
  //     userImg:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
  //     img:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2948&q=80",
  //     text:"nice view",
  //     timestamp:"2 hours ago"
  //   },
  //   {
  //     id:"2",
  //     name:'Gal Mizrahi',
  //     username:'galmizrahi',
  //     userImg:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
  //     img:"https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  //     text:"sunset",
  //     timestamp:"3 days ago"
  //   },
  // ]

  
    return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      
      <div className="flex py-2 px-3 sticky justify-between top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 w-9 h-9">
          <SparklesIcon className="h-5"/>
        </div>
      </div>

      <Input/>
      <AnimatePresence>
        {posts.map((post)=>(
          <motion.div key={post.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
            <Post key={post.id} post={post}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  
}

export default Feed