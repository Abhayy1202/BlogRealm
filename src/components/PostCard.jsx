import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import background from "../../Images/blog2.jpg";

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full h-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
            
          />
          {/* <img src={`${background}`}
                className='rounded-xl h-6 w-70px' /> */}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}


export default PostCard