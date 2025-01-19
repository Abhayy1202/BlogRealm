import React, { useState, useEffect } from "react";

function NewsLetter() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
    e.target.reset(); // Reset the form
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isModalVisible) {
      closeModal();
    }
  };

  useEffect(() => {
    // Add event listener for keydown
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalVisible]);

  return (
    <section
      id="newsletter"
      className="py-20 bg-neutral-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#1F2937"
              strokeWidth="0.5"
            ></path>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)"></rect>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate__animated animate__fadeInDown">
            Stay Updated with <span className="text-purple-500">BlogRealm</span>
          </h2>
          <p className="text-neutral-300 mb-8 animate__animated animate__fadeIn animate__delay-1s">
            Subscribe to our newsletter and get the latest tech insights,
            writing tips, and exclusive content delivered straight to your
            inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 animate__animated animate__fadeInUp animate__delay-2s"
          >
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-6 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-400">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>{" "}
              Weekly Updates
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>{" "}
              Exclusive Content
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>{" "}
              No Spam
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">
              Thank you for subscribing!
            </h3>
            <button
              onClick={closeModal}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default NewsLetter;
