import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import { HomeIcon} from '@heroicons/react/solid';
import {BellIcon, BookmarkIcon, ClipboardIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon, HashtagIcon, InboxInIcon, UserIcon} from '@heroicons/react/outline';


const Sidebar = () => {
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
        <SidebarMenuItem text="Notifications" Icon={BellIcon}/>
        <SidebarMenuItem text="Messages" Icon={InboxInIcon}/>
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon}/>
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon}/>
        <SidebarMenuItem text="Profile" Icon={UserIcon}/>
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon}/>
    </div>


    {/* Button */}
    <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Tweet</button>



    {/* Mini profile */}
    <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" 
             alt="user image" 
             className="h-10 w-10 rounded-full xl:mr-2" 
        />
        <div className="leading-5  hidden xl:inline">
            <h4 className="font-bold">Peter Griffin</h4>
            <p className="text-gray-500 ">@peterg2009</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"/>
    </div>
    
   </div>
  )
}

export default Sidebar