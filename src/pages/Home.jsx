import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Postcard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";

function Home() {
  const [posts, setPosts] = useState([]);
  const authstatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (authstatus) {
      authService.getCurrentUser().then((user) => {
        setCurrentUser(user);
      });
    } else {
      setCurrentUser(null);
    }
  }, [authstatus]);

  if (!loading) {
    return (
      <>
        <div className="flex flex-col min-h-87">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="text-2xl ml-0 mt-8 mb-3">
              <h1>Trending posts:</h1>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                gap-4 justify-items-center"
            >
              {posts.slice(0, 4).map((post) => (
                <div key={post.$id} className="w-full">
                  <Postcard {...post} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col min-h-87 mx-auto ">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="text-2xl ml-2 mt-3 mb-3">
              <h1>Your posts:</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
              {authstatus ? (
                <>
                  {currentUser &&
                  posts.filter((post) => post.userId === currentUser.$id)
                    .length === 0 ? (
                    <div className="w-full col-span-full flex justify-center items-center min-h-[200px]">
                      <h1 className="text-xl p-4 text-center w-full">
                        No blogs yet –{" "}
                        <Link to="/add-post" className="underline">
                          click here
                        </Link>{" "}
                        to write your first one!
                      </h1>
                    </div>
                  ) : (
                    posts
                      .filter((post) => post.userId === currentUser.$id)
                      .map((post) => (
                        <div key={post.$id} className="w-full">
                          <Postcard {...post} />
                        </div>
                      ))
                  )}
                </>
              ) : (
                <div className="w-full col-span-full flex justify-center items-center min-h-[200px]">
                  <h1 className="text-3xl p-4 text-center w-full">
                    <Link to="/login" className="underline">
                      login
                    </Link>{" "}
                    to start writing your own blogs
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-105 flex items-center justify-center bg-gray-300">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-black rounded-full delay-150 animate-bounce"></div>
          <div className="w-3 h-3 bg-black rounded-full delay-300 animate-bounce"></div>
        </div>
      </div>
    );
  }
}

export default Home;
