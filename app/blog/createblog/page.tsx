// pages/create-post.tsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TinyMCEEditor from '@/components/Rich';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null); // State to hold the thumbnail
  const router = useRouter();

  const extractThumbnail = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      thumbnail
    };

    const response = await axios.post('/api/blog/create', postData);

    if (response.status === 201) {
      router.push('/');
    } else {
      console.error('Error creating post:', response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <TinyMCEEditor
          value={description}
          onChange={(newContent) => {
          setDescription(newContent);
          setThumbnail(extractThumbnail(newContent)); // Extract thumbnail on content change
          }}
        />
      </div>
      {thumbnail && (
        <div className="thumbnail-preview">
          <label className="block text-sm font-medium text-gray-700">Thumbnail Preview:</label>
          <img src={thumbnail} alt="Thumbnail Preview" className="mt-2 w-32 h-32 object-cover border rounded-md" />
        </div>
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
