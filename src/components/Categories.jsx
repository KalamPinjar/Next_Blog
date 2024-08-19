"use client";
import { getCategories } from "@/services";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const PostCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>

      {categories.map((category) => (
        <div className="flex items-center mb-4" key={category.name}>
          <div className="flex gap-2">
            <Link
              key={category.name}
              href={`/category/${category.slug}`}
              className="text-md"
            >
              {category.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCategories;
