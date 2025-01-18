import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import appwriteService from "../appwrite/config";
import {useSelector} from "react-redux";

const Featured = () => {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchPosts = async () => {
      const latestPosts = await appwriteService.getLatestPostsByCategory(4);
      setPosts(latestPosts.documents);
    };

    fetchPosts();
  }, []);

  return authStatus ? (
    <section id="featured" className="py-20 bg-neutral-100 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-white animate__animated animate__fadeIn">
          Featured Posts
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 animate__animated animate__fadeInUp">
            <div className="bg-neutral-200 dark:bg-neutral-700 h-48 flex items-center justify-center">
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
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm px-3 py-1 rounded-full">
                  Technology
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">
                The Future of Web Development
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
                Exploring the latest trends and technologies shaping the future
                of web development...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-800 dark:text-white">
                      John Doe
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      June 1, 2023
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>

          {posts?.length > 0 ? (
            posts?.map((post) => <PostCard key={post.$id} post={post} />)
          ) : (
            <div className="col-span-full text-center text-neutral-600 dark:text-neutral-400">
              No posts available.
            </div>
          )}
        </div>
      </div>
    </section>
  ) : (
    null
  );
};

export default Featured;
