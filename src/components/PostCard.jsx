import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, content }) {
  const excerpt = content.substring(0, 30);
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full h-full bg-zinc-300 rounded-xl p-4 hover:shadow-xl">
        <div className="w-full justify-center mb-4 max-h-[80%]">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-[200px] object-cover rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-xs text-gray-500 italic ">{excerpt.replace('<p>','').replace('</p>','')}...</p>
      </div>
    </Link>
  );
}

export default PostCard;
