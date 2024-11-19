"use client"

import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Blog {
  title: string;
  content: string;
  author: {
    name:string;
    image:string;
  }
  createdAt: string;
}



export default function BlogDetail({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  console.log({blog})
  const blogId = Number(params.id)
  const getBlogDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/blog/${blogId}`);
      setBlog(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!blog) {
    return <div>Blog not found!</div>; // Error handling if blog is not found
  }

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">{blog.title}</h1>
      
      {/* Author and Date Section */}
      <div className="flex items-center mt-4 text-gray-500 dark:text-gray-300">
        <Image src={blog.author.image} width={35} height={35} alt="author" className="rounded-full" />
        <span className='ml-2 font-bold text-blue-500'>{blog.author.name}</span>
        <span className="ml-2">{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content Section */}
      <div className="mt-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }} />
      
      {/* Back Button */}
      <div className="mt-6">
        <a href="/" className="px-6 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700">
          Back to Blogs
        </a>
      </div>
    </div>
  );
}
