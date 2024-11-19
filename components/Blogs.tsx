"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard"; // Assuming BlogCard is in the same folder

// Define the type for a single blog post
interface Blog {
  id: number;
  title: string;
  content: string;
  images: string[];
}

// Define the response structure from your API
interface BlogApiResponse {
  data: Blog[]; // Data contains the array of Blog objects
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Enforce type for blogs
  console.log({ blogs });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<BlogApiResponse>("/api/blog/all"); // Expecting BlogApiResponse structure
        setBlogs(response.data.data); // Access response.data.data as it contains the array of blogs
      } catch (err) {
        setError("Failed to fetch blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs && blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          // content={blog.content}
          images={blog.images}
        />
      ))}
    </div>
  );
}
