import { SearchIcon } from "@heroicons/react/outline"
import { useState } from "react"
import News from "./News"

const Widgets = ({newsResults,randomUsersResults}) => {

    const [articleNumber,setArticleNumber] = useState(3);
    const [followersNumber,setFollowersNumber] = useState(4);


  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
        {/* search bar section */}
        <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50 ">
            <div className="flex items-center p-3 rounded-full bg-red-100 relative ">
                <SearchIcon className="h-5 z-50 text-gray-500" />
                <input type="text" placeholder="Search Twitter" className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100" />
            </div>
        </div>

            {/* news section */}
        <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
            <h4 className="font-bold text-xl px-4">What's happening</h4>
            {newsResults.slice(0,articleNumber).map((article)=>(
                <News key={article.title} article={article}/>
            ))}
            <button onClick={()=>{setArticleNumber(articleNumber + 3)}} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show More</button>
        </div>


        {/* who to follow */}
        <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%] sticky top-16">
            <h4 className="font-bold text-xl px-4">Who to Follow</h4>
            {randomUsersResults.slice(0,followersNumber).map((randomUser)=>(
                
                <div key={randomUser.login.username} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
                    <img src={randomUser.picture.thumbnail} alt=""  className="w-[40px] rounded-full "/>
                    <div className="truncate ml-4 leading-5">
                        <h4 className="font-bold hover:underline text-[14px] truncate">{randomUser.login.username}</h4>
                        <h5 className="text-[13px] text-gray-500 truncate">{randomUser.name.first + " " + randomUser.name.last}</h5>
                    </div>
                    <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-4.5 font-bold">Follow</button>
                </div>

            ))}
            <button onClick={()=>{setFollowersNumber(followersNumber + 3)}} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show More</button>
        </div>

    </div>
  )
}

export default Widgets