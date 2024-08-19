"use client";
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget,
} from "@/components";
import AdjacentPosts from "@/section/AdjacentPosts";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const PostDetails = ({ params }) => {
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const { slug } = params;

  useEffect(() => {
    if (slug) {
      fetch(`/api/${slug}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setPost(data);
        })
        .catch((error) => {
          console.error("Error fetching post details:", error);
          setError(error.message);
        });
    }
  }, [slug]);

  if (error) {
    return <div className="flex h-full items-center justify-center text-white">{error}</div>;
  }

  if (!post) {
    return <div className="flex h-full items-center justify-center">
      <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 text-white" />
    </div>;
  }

  const categories = post.categories ? post.categories.map((category) => category.name) : [];

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
          {post.author && <Author author={post.author} />}
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget categories={categories} data={post} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
