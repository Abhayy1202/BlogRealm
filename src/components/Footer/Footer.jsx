import React,{useEffect,useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
 const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

 const handleClick = () => {
   window.scrollTo({
     top: 0,
     behavior: "smooth",
   });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsScrollToTopVisible(true);
    } else {
      setIsScrollToTopVisible(false);
    }
  };
 useEffect(() => {


   window.addEventListener("scroll", handleScroll);

   return () => {
     window.removeEventListener("scroll", handleScroll);
   };
 }, []);


  return (
    <footer id="footer" className="bg-neutral-900 text-neutral-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="animate__animated animate__fadeIn">
            <h3 class="text-2xl font-bold text-white mb-4">BlogRealm</h3>
            <p class="mb-4">
              Empowering voices through modern blogging technology and creative
              expression.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="hover:text-purple-500 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" class="hover:text-purple-500 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                </svg>
              </a>
              <a href="#" class="hover:text-purple-500 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
              <a href="#" class="hover:text-purple-500 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </a>
            </div>
          </div>

          <div class="animate__animated animate__fadeIn animate__delay-1s">
            <h4 class="text-white font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li>
                <a href="#hero" class="hover:text-purple-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#blogGrid"
                  class="hover:text-purple-500 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  class="hover:text-purple-500 transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  class="hover:text-purple-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  class="hover:text-purple-500 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div class="animate__animated animate__fadeIn animate__delay-2s">
            <h4 class="text-white font-semibold mb-4">Categories</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="hover:text-purple-500 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-purple-500 transition-colors">
                  Design
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-purple-500 transition-colors">
                  Development
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-purple-500 transition-colors">
                  Writing
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-purple-500 transition-colors">
                  Business
                </a>
              </li>
            </ul>
          </div>

          <div class="animate__animated animate__fadeIn animate__delay-3s">
            <h4 class="text-white font-semibold mb-4">Contact Us</h4>
            <ul class="space-y-2">
              <li class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>{" "}
                contact@blogrealm.com
              </li>
              <li class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>{" "}
                (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-neutral-800 py-6 text-sm text-center">
          <p>&copy; 2025 BlogRealm. All rights reserved.</p>
          <div class="mt-2 space-x-4">
            <a href="#" class="hover:text-purple-500 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" class="hover:text-purple-500 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" class="hover:text-purple-500 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
        {isScrollToTopVisible && (
          <button
            onClick={handleClick}
            className="fixed bottom-4 right-4 bg-purple-500 text-white p-2 rounded-full shadow-lg transition-opacity duration-300 opacity-100 hover:opacity-80"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </footer>
  );
}

export default Footer