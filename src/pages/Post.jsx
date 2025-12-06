import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showActions, setShowActions] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const currentUserId = userData?.userData?.$id ?? userData?.$id ?? null;
  const isAuthor =
    post && currentUserId ? post.userId === currentUserId : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (!post) return;
    const postId = post.$id ?? post.id;
    if (!postId) return;

    appwriteService.deletePost(postId).then((status) => {
      if (status) {
        if (post.featuredImage) appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-105 flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-black rounded-full delay-150 animate-bounce"></div>
          <div className="w-3 h-3 bg-black rounded-full delay-300 animate-bounce"></div>
        </div>
      </div>
    );
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4">
          <div className="relative border rounded-xl p-2 inline-block">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl w-full max-w-[960px] h-auto object-contain"
            />

            {isAuthor && (
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-2">

                {showActions && (
                  <>
                    <Link to={`/edit-post/${post.$id ?? post.id}`}>
                      <Button bgColor="bg-green-500">Edit</Button>
                    </Link>

                    <Button bgColor="bg-red-500" onClick={deletePost}>
                      Delete
                    </Button>
                  </>
                )}

                <button
                  className="text-black hover:cursor-pointer bg-white rounded-2xl text-2xl sm:text-4xl"
                  onClick={() => setShowActions((prev) => !prev)}
                >
                  ⋮
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="border border-stone-500 rounded-xl">
          <div className="w-[calc(100%-1.5rem)] mx-auto my-2 mb-6 flex flex-col gap-2">
            <h1 className="w-full break-all text-base sm:text-2xl font-extrabold">
              {post.title}
            </h1>
            <p className="text-xs sm:text-base">
              by:{post.Authorname ?? "Anonymous"}
            </p>
          </div>

          <div className="text-[10px] sm:text-sm mb-6 browser-css w-[calc(100%-1.5rem)] mx-auto">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
