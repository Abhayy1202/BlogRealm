import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AI_helper, Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        category: post?.category || "Technology",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        category: post?.category || "Technology",
        slug: post.$id,
        content: post.content,
        status: post.status,
      });
    }
  }, [post, reset]);

  // console.log("Edit post",post);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [Ai, setAi] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const submit = async (data) => {
    if (post) {
      let fileId = post.featuredImage; // Retain the old image by default

      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          appwriteService.deleteFile(post.featuredImage);
          fileId = file.$id;
        }
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: fileId,
        author: userData.name,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          author: userData.name,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleApply = (prompt, setPrompt) => {
    setValue("content", prompt);
    setPrompt("");
  };

  return (
    <section
      id="edit-post"
      className="py-20 bg-neutral-100 dark:bg-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-8 animate__animated animate__fadeIn">
            {post ? "Update Post" : "Create New Post"}
          </h2>
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div>
              <Input
                label="Post Title"
                placeholder="Title"
                className=" focus:border-transparent"
                {...register("title", { required: true })}
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Select
                  options={["Technology", "Design", "Development", "Writing"]}
                  label="Category"
                  className="w-full"
                  {...register("category", { required: true })}
                />
              </div>
              <div className="w-1/2">
                {/* <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Slug
                </label> */}
                <Input
                  label="Slug"
                  placeholder="Slug"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </div>
            <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                {/* if there is image then preview it instead of svg */}
                <svg
                  className="w-12 h-12 text-neutral-400 mb-4"
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
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                  Drag and drop your featured image here
                </p>

                <Input
                  label="Browse Files"
                  type="file"
                  className="hidden"
                  forlabel="text-purple-600 hover:text-purple-700 cursor-pointer"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Content
              </label>
              <RTE
                // label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>

            {/* <div className="w-1/3 px-2 dark:text-gray-200"> */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <Select
                  options={["Active", "Inactive"]}
                  className="w-2/3"
                  label="Status"
                  {...register("status", { required: true })}
                />
              </div>
              <div className="w-1/2 ">
                <Button
                  type="button"
                  className=" bg-purple-500 text-white p-2 rounded-full shadow-lg transition-opacity duration-300 opacity-100 hover:opacity-80"
                  onClick={(e) => (e.preventDefault(), setAi(!Ai))}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sparkle"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  </svg>
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className={`px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 ${isSubmitting} ? 'opacity-75 cursor-not-allowed' : ''`}
              onClick={() => setIsSubmitting(true)}
            >
              {isSubmitting ? (<span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {post ? "Updating..." : "Processing..."}
                </span>):(
              post ? "Update" : "Submit"
              )}
            </Button>
            {/* </div> */}
          </form>
        </div>
      </div>
      <AI_helper handleApply={handleApply} Ai={Ai} setAi={setAi} />
    </section>
  );
}
