import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import { HomeIcon} from '@heroicons/react/solid';
import {BellIcon, BookmarkIcon, ClipboardIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon, HashtagIcon, InboxInIcon, UserIcon} from '@heroicons/react/outline';
import {useSession,signIn} from 'next-auth/react';

const Sidebar = () => {

    const {data:session} = useSession();

  return (
   <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
    {/* twittwr logo */}
    <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image width="50" height="50"  src="https://www.pngkey.com/png/full/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png" />
    </div>


    {/* Menu */}
    <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active/>
        <SidebarMenuItem text="Explore" Icon={HashtagIcon}/>
        {session && (
            <>
                <SidebarMenuItem text="Notifications" Icon={BellIcon}/>
                <SidebarMenuItem text="Messages" Icon={InboxInIcon}/>
                <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon}/>
                <SidebarMenuItem text="Lists" Icon={ClipboardIcon}/>
                <SidebarMenuItem text="Profile" Icon={UserIcon}/>
                <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon}/>
            </>
        )}
    </div>


    {/* Button */}
    {session ? (
        <>
            <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Tweet</button>
            
            {/* Mini profile */}
            <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
                <img src={session.user.image} 
                    alt="user image" 
                    className="h-10 w-10 rounded-full xl:mr-2" 
                    />
                <div className="leading-5  hidden xl:inline">
                    <h4 className="font-bold">{session.user.name}</h4>
                    <p className="text-gray-500 ">@{session.user.username}</p>
                </div>
                <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"/>
            </div>
        </>
    ):(
        <button onClick={signIn} className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Sign In</button>
    )
    }



    
    
   </div>
  )
}

export default Sidebar