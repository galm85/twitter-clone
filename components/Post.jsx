import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline"
import Moment from "react-moment"

const Post = ({post}) => {
  
  
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
                    <span className="text-sm sm:text-[15px] hover:underline"><Moment fromNow>{post?.timestemp?.toDate()}</Moment></span>
                </div>
                {/* dots icon */}
                <DotsHorizontalIcon className=" hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-2"/>
            </div>

            {/* post text */}
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post.data().text}</p>

            {/* post image */}
            <img src={post.data().image} alt="post image" className="rounded-2xl mr-2" />

            {/* actions icons */}
            <div className="flex justify-between text-gray-500 p-2">
                <ChatIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
                <TrashIcon className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
                <HeartIcon className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
                <ShareIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
                <ChartBarIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            </div>

        </div>
    </div>
  )

}

export default Post