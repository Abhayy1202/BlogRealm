import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";


const BlogGrid = () => {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Posts");
   const authStatus = useSelector((state) => state.auth.status);

  const categories = ["All Posts", "Technology", "Design", "Development", "Writing"];

 const filteredPosts =
   activeCategory === "All Posts"
     ? posts
     : posts?.filter((post) => post.category === activeCategory);

  useEffect(() => {
    const fetchPosts = async () => {
      const latestPosts = await appwriteService.getLatestPosts(4);
      setPosts(latestPosts.documents);
    };

    fetchPosts();
  }, []);

  return authStatus ? (
    <section
      id="blogGrid"
      className="py-20 bg-white dark:bg-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4 animate__animated animate__fadeIn">
            Latest Blog Posts
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2  rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts?.length > 0 ? (
            filteredPosts?.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center text-neutral-600 dark:text-neutral-400">
              No posts available for this category.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="col-span-full flex justify-center mt-12 gap-2">
          <button className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
            1
          </button>
          <button className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
            2
          </button>
          <button className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
            3
          </button>
          <button className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
            Next
          </button>
        </div>
        <div className="text-center mt-12">
          <button
            id="loadMoreBtn"
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Load More Posts
          </button>
        </div>
      </div>
    </section>
  ) : (
    null
  );
};

export default BlogGrid;
