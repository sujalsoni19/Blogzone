import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, userId, Authorname }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="flex gap-1 border-2 text-xl  flex-col items-center py-2 m-3 w-2xs rounded-xl bg-white">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="rounded w-[260px] h-[147px] object-contain"
        />
        <div>{title}</div>
        <div className="text-sm pr-2 self-end">by: {Authorname ? Authorname : "anonymous"}</div>
      </div>
    </Link>
  );
}

export default PostCard;
