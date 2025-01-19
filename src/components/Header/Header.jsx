import * as React from "react";
import { Logo, LogoutBtn, Container, ThemeBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navbarRef = React.useRef(null);
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Blogs", slug: "#blogGrid", active: true },
    { name: "Featured", slug: "#featured", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // console.log(currentScroll);
      if (currentScroll > 150.0) {
        setIsNavbarVisible(false); // Hide navbar
      } else {
        setIsNavbarVisible(true); // Show navbar
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    console.log("clicked");
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="relative z-50 bg-white dark:bg-gray-900">
      <nav
        ref={navbarRef}
        className={`fixed w-full z-50 bg-neutral-900 text-white transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex gap-2 flex-shrink-0 animate__animated animate__fadeIn">
              <Link to="/">
                <Logo width="70px" />
              </Link>
              <a href="#" className="text-2xl font-bold mt-1">
                BlogRealm
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex items-center space-x-8">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className={
                          item.name === "Login" || item.name === "Signup"
                            ? "bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center"
                            : "hover:text-purple-400 transition-colors"
                        }
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
                <li>
                  <ThemeBtn />
                </li>
              </ul>
            </div>
            <div className="md:hidden">
              <button
                id="mobileMenuBtn"
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-neutral-800 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {/* Correct Button Css Pending below */}
          <div
            id="mobileMenu"
            className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          >
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems
                .filter((item) => item.active)
                .map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.slug}
                      className={
                        item.name === "Login"
                          ? "bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors text-center block text-sm"
                          : "hover:text-purple-400 transition-colors block text-sm"
                      }
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
            </ul>

            {/* <div className="flex flex-col space-y-4">
              <a
                href="#hero"
                className="hover:text-purple-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#blogGrid"
                className="hover:text-purple-400 transition-colors"
              >
                Blogs
              </a>
              <a
                href="#featured"
                className="hover:text-purple-400 transition-colors"
              >
                Featured
              </a>
              <a
                href="#categories"
                className="hover:text-purple-400 transition-colors"
              >
                Categories
              </a>
              <a
                href="#authentication"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center"
              >
                Login
              </a>
            </div> */}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
