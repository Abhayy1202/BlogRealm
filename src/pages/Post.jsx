import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
      <div className="py-8">
        <Container>
          <div className="container w-full justify-center mb-4 relative border rounded-xl p-2 h-auto flex flex-col">
            <div className="w-full mb-6">
              <h1 className="px-10 font-display text-3xl font-extrabold sm:text-4xl sm:leading-snug dark:text-gray-300">
                {post.title}
              </h1>
            </div>
            <div>
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="float-right rounded-xl h-2/5 w-2/5 mr-4 dark:outline dark:outline-offset-2 dark:outline-gray-500"
              />
              <div className="prose prose-gray max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-display prose-a:font-medium prose-a:text-gray-500 prose-a:underline-offset-4 hover:prose-a:text-black prose-thead:text-lg px-5 py-10 sm:px-10 dark:text-gray-400">
                {parse(post.content)}
                
              </div>
            </div>

            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
    ) : null;
  }

