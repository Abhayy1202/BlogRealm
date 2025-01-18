import React, { useEffect, useRef } from "react";
import { ParticleEffect } from "../components";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { useSelector } from "react-redux";

function Home() {
  const el = useRef(null);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Blogs", "Stories to Inspire", "Knowledge Hub"],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section
      id="hero"
      className="bg-neutral-900 min-h-[70vh] flex items-center relative overflow-hidden "
    >
      {/* background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-neutral-900/50"></div>
        <div className="absolute inset-0">
          <svg
            className="absolute w-full h-full opacity-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)"></path>
            <defs>
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
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate__animated animate__fadeInDown">
            Welcome to the realm of{" "}
            <span className="text-purple-500" ref={el} />
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
            Explore a world of captivating stories and insightful knowledge.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate__animated animate__fadeInUp animate__delay-2s">
            <Link
              to={authStatus ? "#blogGrid" : "/login"}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
            >
              Start Reading
            </Link>
            <Link
              to={authStatus ? "/add-post" : "/login"}
              className="px-8 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors duration-300 text-lg font-semibold border border-purple-500"
            >
              Start Writing
            </Link>
          </div>
        </div>
      </div>
      <ParticleEffect />
    </section>
  );
}

export default Home;
