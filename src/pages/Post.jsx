import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const date = new Date(post?.$updatedAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const UpDate = date?.toLocaleDateString("en-US", options);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPosts = async () => {
      if (slug) {
        await appwriteService
          .getPost(slug)
          .then((post) => {
            if (post) {
              console.log("post fetched - ", post);

              setPost(post);
            } else navigate("/");
          })
          .catch((error) => console.log("error post.jsx- ", error));
      } else navigate("/");
    };
    fetchPosts();
  }, [slug, navigate]);

  useEffect(() => {
    const fetchImagePreview = async () => {
      if (post?.featuredImage) {
        const imageUrl = await appwriteService.getFilePreview(
          post.featuredImage
        );
        setImageUrl(imageUrl);
        console.log("imageUrl -", imageUrl);
      }
    };
    if (post) {
      fetchImagePreview();
    }
  }, [post]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <section
      id="posts"
      className="py-20 bg-neutral-100 dark:bg-neutral-900 overflow-hidden"
    >
      <div
        className="max-w-7xl bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 animate__animated animate__fadeInUp mx-auto px-4 sm:px-6 lg:px-8 "
        id="el-nmxkhpr9"
      >
        <div
          className="text-3xl flex justify-between font-bold text-center mb-11 pt-4 text-neutral-800 dark:text-white animate__animated animate__fadeIn"
          id="el-58esimzj"
        >
          <h2
            className="text-4xl font-bold text-left px-4 pt-2"
            id="el-srq77qch"
          >
            {post?.title}
          </h2>
          {isAuthor && (
            <div className="text-base flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="bg-green-500 h-full text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Edit
                </button>
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div
          className="relative h-96 bg-neutral-200  dark:bg-neutral-700"
          id="el-1qndadge p-[7px] m-[45px]"
        >
          {imageUrl && (
            <img
              src={imageUrl}
              // src="./Designer.png"
              alt="Blog post cover"
              className="w-full h-full object-contain transition-opacity duration-300 opacity-100"
              id="el-ngh26yy4"
              loading="lazy"
            />
          )}
        </div>
        <div className="p-8" id="el-uvv4he2n">
          <div className="flex items-center mb-8" id="el-e53n232c">
            <div className="flex items-center" id="el-x4iklmbk">
              <div
                className="w-12 h-12 rounded-full bg-neutral-300 dark:bg-neutral-600"
                id="el-h2hgehq8"
              ></div>
              <div className="ml-4" id="el-li43r2xd">
                <p
                  className="text-lg font-medium text-neutral-800 dark:text-white"
                  id="el-0chffcrv"
                >
                  {post?.author}
                </p>
                <p
                  className="text-sm text-neutral-500 dark:text-neutral-400"
                  id="el-kn1rjixi"
                >
                  {UpDate} · 10 min read
                </p>
              </div>
            </div>
            <div className="ml-auto" id="el-wbc8z951">
              <span
                className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full"
                id="el-9n76juz2"
              >
                {post?.category}
              </span>
            </div>
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none dark:text-white "
            id="el-mbs1r8e5"
          >
            {parse(post.content)}
          </div>

          <div
            className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700"
            id="el-fsbzvdk8"
          >
            <h4
              className="text-lg font-semibold text-neutral-800 dark:text-white mb-4"
              id="el-xxloyh1j"
            >
              Share this article
            </h4>
            <div className="flex space-x-4" id="el-i0hbwka3">
              <button
                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                id="el-gbl8atqf"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  id="el-px8ilj36"
                >
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                    className=""
                    id="el-wx7nhlix"
                  ></path>
                </svg>
              </button>
              <button
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                id="el-jk6vwmev"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  id="el-tz4pc4cr"
                >
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    className=""
                    id="el-iemhjsj0"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
}
