import React from "react";

function Profile() {
  return (
    <section
      id="userProfile"
      className="py-20 bg-neutral-100 dark:bg-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden">
          {/* <!-- Profile Header --> */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-48 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 bg-neutral-300 dark:bg-neutral-600 rounded-full border-4 border-white dark:border-neutral-900"></div>
            </div>
          </div>

          <div className="pt-16 px-8 pb-8">
            {/* <!-- Profile Info --> */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-1">
                  John Doe
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Senior Web Developer
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  Settings
                </button>
              </div>
            </div>

            {/* <!-- Stats --> */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">24</p>
                <p className="text-neutral-600 dark:text-neutral-400">Posts</p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">1.2k</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Followers
                </p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">348</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Following
                </p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">15k</p>
                <p className="text-neutral-600 dark:text-neutral-400">Views</p>
              </div>
            </div>

            {/* <!-- Tabs --> */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 mb-8">
              <nav className="flex space-x-8">
                <button className="text-purple-600 border-b-2 border-purple-600 pb-4 px-2">
                  Posts
                </button>
                <button className="text-neutral-600 dark:text-neutral-400 pb-4 px-2 hover:text-purple-600">
                  Drafts
                </button>
                <button className="text-neutral-600 dark:text-neutral-400 pb-4 px-2 hover:text-purple-600">
                  Saved
                </button>
                <button className="text-neutral-600 dark:text-neutral-400 pb-4 px-2 hover:text-purple-600">
                  Analytics
                </button>
              </nav>
            </div>

            {/* <!-- Recent Activity --> */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
                Recent Activity
              </h3>

              <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-neutral-800 dark:text-white">
                    Published a new article
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    "Modern Web Development Practices" - 2 hours ago
                  </p>
                </div>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-neutral-800 dark:text-white">
                    Commented on an article
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    "React vs Vue in 2023" - 5 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
