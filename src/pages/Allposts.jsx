import React,{useState,useEffect} from "react";
import appwriteservice from '../appwrite/config';
import { Container,Postcard } from "../components";

function Allposts(){

    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
      appwriteservice.getPosts([])
      .then((posts)=>{
        if(posts){
            setPosts(posts.documents)
            setLoading(false)
        }
      })  
    },[])

    return !loading ? (
        <div className="w-full py-8">
            <Container>

                {/* <-- MATCHES Trending: responsive grid 1 / 2 / 3 / 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                  {posts.map((post)=>(
                    <div key={post.$id} className="w-full">
                        <Postcard {...post} />
                    </div>   
                  ))}
                </div>

            </Container>
        </div>
    )
    : (
        <div className="w-full py-8 mt-4">
            <Container>
                <div className="min-h-105 flex items-center justify-center bg-gray-300">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
            </Container>
        </div>
    )
}

export default Allposts
