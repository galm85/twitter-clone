import {getProviders,signIn} from 'next-auth/react';


const Signin = ({providers}) => {
  return (
    <div className='flex justify-center mt-20 space-x-4'>
        <img className='hidden rotate-6 object-cover md:w-44 md:h-80 md:inline-flex' src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png" alt="twitter image on phone" />

        <div className=''>
            {Object.values(providers).map((provider)=>(
                <div key={provider.name} className='flex flex-col items-center'>
                    <img className='w-36 object-cover'  src="https://www.pngkey.com/png/full/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png" alt="" />
                    <p className='text-center text-sm italic my-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, sint.</p>
                    <button onClick={()=>signIn(provider.id,{callbackUrl:"/"})} className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-500'>Sign In with {provider.name}</button>
                </div>
            ))}
        </div>
    
    </div>
  )
}

export default Signin





export async function getServerSideProps(){
    const providers = await getProviders();
    return{
        props:{
            providers
        }
    }
}