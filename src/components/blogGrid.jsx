import {useEffect,useState} from "react";
import PostCard from "./PostCard";
import appwriteService from "../appwrite/config";

const BlogGrid = () => {

const [posts, setPosts] = useState([]);

useEffect(() => {
  const fetchPosts = async () => {
    const latestPosts = await appwriteService.getLatestPosts(4);
    setPosts(latestPosts.documents);
  };

  fetchPosts();
}, []);

return(
  <section
    id="blogGrid"
    className="py-20 bg-white dark:bg-neutral-900 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4 animate__animated animate__fadeIn">
          Latest Blog Posts
        </h2>
        <div className="flex justify-center gap-4 mb-8">
          <button className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors">
            All Posts
          </button>
          <button className="px-4 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
            Technology
          </button>
          <button className="px-4 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
            Design
          </button>
          <button className="px-4 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
            Development
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeIn">
          <div className="relative pb-[60%] bg-neutral-200 dark:bg-neutral-700">
            {/* Blog Card 1 Content */}
            <div className="absolute inset-0">
              <img
                src="./Designer.png"
                alt="abc"
                className="object-fill w-full h-full rounded-xl"
              />
            </div>
            
          </div>
          <div className="p-6">
            {/* Blog Card 1 Content */}
            <div class="flex items-center mb-4">
              <span class="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm px-3 py-1 rounded-full">
                Technology Category
              </span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">
              The Future of Web Development
            </h3>
            <p class="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
              Exploring the latest trends and technologies shaping the future of
              web development...
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-neutral-800 dark:text-white">
                    John Doe
                  </p>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400">
                    June 1, 2023
                  </p>
                </div>
              </div>
              <a
                href="#"
                class="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
        </div>

        {posts?.map((post) => (
          <PostCard key={post.$id} post={post} />
        ))}
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
)};

export default BlogGrid;
