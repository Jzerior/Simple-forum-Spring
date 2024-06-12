import React from 'react';

interface PostProps {
  id: number;
  name: string;
  content: string;
  author: string;
}

const Post: React.FC<PostProps> = ({ id, name, content, author }) => {
  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-700">{content}</p>
      <p className="text-sm text-gray-500">Posted by {author}</p>
    </div>
  );
};

export default Post;
