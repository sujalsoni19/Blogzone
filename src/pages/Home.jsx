import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, Postcard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authstatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);

  if (!loading) {
    return (
      <>
        <div className="flex flex-col min-h-87 mx-auto">
          <div className=" flex-1 mx-auto">
            <div className="text-2xl ml-2 mt-8 mb-3">
              <h1>Trending posts:</h1>
            </div>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="flex flex-wrap">
                  <Postcard {...post} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col min-h-87 mx-auto">
          <div className=" flex-1 mx-auto">
            <div className="text-2xl ml-2 mt-3 mb-3">
              <h1>Your posts:</h1>
            </div>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="flex flex-wrap">
                  <Postcard {...post} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className=" flex flex-col min-h-80 ">
          <div className=" flex-1">
            <div className="text-2xl ml-2 mt-3 mb-3">
              <h1>Your posts:</h1>
            </div>
            {authstatus ? <div></div> : null}
          </div>
        </div> */}
      </>
    );
  } else {
    return (
      <div className="min-h-105 flex items-center justify-center bg-gray-300">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  // if(authstatus){

  //     if(!loading) {
  //         if (posts.length === 0){
  //             return (
  //                 <div className="w-full py-8 mt-4 text-center">
  //                     <Container>
  //                         <div className="flex flex-wrap">
  //                             <div className="p-2 w-full">
  //                                 <h1 className="text-2xl font-bold hover:text-gray-500">
  //                                     Start by writing your own blogs
  //                                 </h1>
  //                             </div>
  //                         </div>
  //                     </Container>
  //                 </div>
  //             )
  //         }else{
  //             return (
  //                 <div className='w-full py-8'>
  //                     <Container>
  //                         <div className='flex flex-wrap'>
  //                             {posts.map((post) => (
  //                                 <div key={post.$id} className='p-2 w-1/4'>
  //                                     <Postcard {...post} />
  //                                 </div>
  //                             ))}
  //                         </div>
  //                     </Container>
  //                 </div>
  //             )
  //         }

  //     }else{
  //         return(
  //             <div className="w-full py-8 mt-4 text-center">
  //                     <Container>
  //                         <div className="flex flex-wrap">
  //                             <div className="p-2 w-full">
  //                                 <h1 className="text-2xl font-bold hover:text-gray-500">
  //                                     Loading...
  //                                 </h1>
  //                             </div>
  //                         </div>
  //                     </Container>
  //                 </div>
  //         )
  //     }

  // }else{
  //     return (
  //         <div className="w-full py-8 mt-4 text-center">
  //             <Container>
  //                 <div className="flex flex-wrap">
  //                     <div className="p-2 w-full">
  //                         <h1 className="text-2xl font-bold hover:text-gray-500">
  //                             Login to see all posts
  //                         </h1>
  //                     </div>
  //                 </div>
  //             </Container>
  //         </div>
  //     )
  // }

  // return(
  //   <div className='bg-red-500 flex flex-col min-h-120'>
  //       <div className='bg-amber-300 flex-1'>
  //           <div className='bg-pink-500 text-2xl ml-5 mt-3 mb-3'>
  //               <h1>Trending posts:</h1>
  //           </div>
  //           <div >

  //           </div>

  //       </div>
  //   </div>

  // )
}

export default Home;
