import React from 'react';
import Header from './widgets/Header';
import PostInput from './widgets/PostInput';
import PostFeed from './widgets/PostFeed';

const PostsContent = () => (
  <div className="flex flex-col h-screen w-full text-gray-200">
    {/* Title and Header in the same line */}
    <div className="flex items-center justify-between p-4">
      <h1 className="font-bold text-3xl font-sans">Home</h1> {/* Updated Title */}
      <Header />
    </div>
    <div className="flex-1 p-6 overflow-y-auto">
      <PostInput />
      <PostFeed />
    </div>
  </div>
);

export default PostsContent;
