"use client";
import { getRecentPost, getSimilarPosts } from "@/services";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PostWidget = ({ categories=[], slug }) => {
  const [related, setRelated] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => setRelated(result));
    } else {
      getRecentPost().then((result) => setRelated(result));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>

      {related.map((post) => (
        <div className="flex items-center  mb-4" key={post.title}>
          <div className="w-16 flex-none">
            <Image
              alt={post.title}
              height={80}
              width={80}
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link
              key={post.title}
              href={`/post/${post.slug}`}
              className="text-md"
            >
              {post.title.slice(0, 30).concat("...")}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
