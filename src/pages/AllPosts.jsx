import React, { useState, useEffect } from "react";
import { PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function AllPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  //   console.log("userData -", userData);

  useEffect(() => {
    const fetchPosts = async () => {
      const queries = [
        Query.equal("status", "active"),
        Query.orderDesc("$createdAt"),
        Query.limit(10),
      ];
      const posts = await appwriteService.getPosts(queries);
      if (posts) {
        const userPosts = posts.documents.filter(
          (post) => post.userId === userData.$id
        );
        const otherPosts = posts.documents.filter(
          (post) => post.userId !== userData.$id
        );
        setUserPosts(userPosts);
        setOtherPosts(otherPosts);
      }
    };

    fetchPosts();
  }, [userData]);

  return (
    <section id="featured" className="py-20 bg-neutral-100 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800 dark:text-white">
          Your Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userPosts?.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.$id} post={post} />)
          ) : (
            <div className="col-span-full text-center text-neutral-600 dark:text-neutral-400">
              No posts available add new blogs.
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800 dark:text-white">
          Other Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllPosts;
