"use client";

import { Categories, PostCard, PostWidget, Stars } from "@/components";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CategoryPost = ({ params: { slug } }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      console.log("Fetching posts for slug:", slug);
      fetch(`/api/category/${slug}?nocache=${Date.now()}`)
        .then(async(response) => {
          if (!response.ok) {
            const errorDetails = await response.json();
            console.error('GraphQL Error Details:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received:", data);
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
    return (
      <div className="flex h-full items-center justify-center text-white">
        {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-full items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 text-white" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <Stars />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {post.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget categories={post.categories} slug={post.slug} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;
