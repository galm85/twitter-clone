import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"
import Moment from "react-moment"
import { signIn, useSession } from "next-auth/react";
import { db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

const Post = ({post}) => {
  
    const {data:session} = useSession();
    const [likes,setLikes] = useState([]);
    const [hasLiked,setHasLiked] = useState(false);
    const [open,setOpen] = useRecoilState(modalState);

    useEffect(()=>{
        const unsubscribe = onSnapshot(
            collection(db,'posts',post.id,"likes"),
            (snapshot)=>{
                setLikes(snapshot.docs);
            }
        )
    },[db])

    useEffect(()=>{
        setHasLiked(likes.findIndex((like)=>like.id === session?.user.uid) !== -1);
    },[likes])

    const likePosts = async()=>{
        if(session){

            if(hasLiked){
                await deleteDoc(doc(db,'posts',post.id,'likes',session?.user.uid));
            }else{
                await setDoc(doc(db,'posts',post.id,"likes",session?.user.uid),{
                    username:session.user.username
                });
            }
        }else{
            signIn();
        }
        
    }

    const deletePost = async()=>{
        if(window.confirm('Delete this Post ?')){

            deleteDoc(doc(db,'posts',post.id));
            if(post.data().image){
                deleteObject(ref(storage,`posts/${post.id}/image`));
            }
        }
    }
  
    return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
        {/*user image */}
        <img src={post.data().userImg} alt="user image" className="h-11 w-11 rounded-full mr-4" />


        {/* right side */}
        <div>
            {/* header */}
            <div className="flex items-center justify-between">
                {/* host user info */}
                <div className="flex space-x-1 whitespace-nowrap items-center">
                    <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.data().name}</h4>
                    <span className="text-sm sm:text-[15px]">@{post.data().username} -{" "} </span>
                    <span className="text-sm sm:text-[15px] hover:underline"><Moment fromNow>{post?.data().timestemp?.toDate()}</Moment></span>
                </div>
                {/* dots icon */}
                <DotsHorizontalIcon className=" hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-2"/>
            </div>

            {/* post text */}
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post.data().text}</p>

            {/* post image */}
            {post.data().image && <img src={post.data().image} alt="post image" className="rounded-2xl mr-2" /> }
            
            {/* actions icons */}
            <div className="flex justify-between text-gray-500 p-2">
                <ChatIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" onClick={()=>setOpen(!open)}/>
                {session?.user.uid === post?.data().id && <TrashIcon className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" onClick={deletePost}/> }
                
                <div className="flex items-center">
                    {hasLiked ? ( 
                            <HeartIconFilled onClick={likePosts} className="w-9 h-9 hoverEffect p-2 text-red-600 hover:bg-red-100"/>
                            ) : (                
                            <HeartIcon onClick={likePosts} className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
                            )
                    }
                    {likes.length > 0 && <span className={`${hasLiked && 'text-red-600'} text-sm select-none`}  >{likes.length}</span> }
                </div>
                <ShareIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
                <ChartBarIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            </div>

        </div>
    </div>
  )

}

export default Post