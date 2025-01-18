import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const { $id, title, category, featuredImage, content, author } = post;
  const excerpt = content.substring(0, 40);
  const [imageUrl, setImageUrl] = useState("");
  const date = new Date(post?.$updatedAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const UpDate = date?.toLocaleDateString("en-US", options);
  const Postcategory = category || "Not Specified";
  const owner = author || "John Doe";
  // console.log("PostCard -",post);

   const categoryColors = {
     Technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
     Design: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
     Development: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
     Writing:
       "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
     "Not Specified": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
   };

  useEffect(() => {
    const fetchImagePreview = async () => {
      if (featuredImage) {
        const imageUrl = await appwriteService.getFilePreview(featuredImage);
        setImageUrl(imageUrl);
        console.log("imageUrl -", imageUrl);
      }
    };
    fetchImagePreview();
  }, [featuredImage]);

  return (
    <>
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeIn">
        <div className="relative pb-[60%] bg-neutral-200 dark:bg-neutral-700">
          {/* Blog Card 1 Content */}
          {imageUrl ? (
            <div className="absolute inset-0">
              <img
                src={imageUrl}
                alt={title}
                className="object-fill w-full h-full rounded-xl"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="p-6">
          {/* Blog Card 1 Content */}
          <div className="flex items-center mb-4">
            <span className={`${categoryColors[Postcategory]} text-sm px-3 py-1 rounded-full`}>
              {Postcategory}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">
            {title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
            {excerpt.replace("<p>", "").replace("</p>", "")}...
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-800 dark:text-white">
                  {owner}
                  {/* Owner Name */}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {UpDate}
                  {/* update date */}
                </p>
              </div>
            </div>

            <Link
              to={`/post/${$id}`}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
