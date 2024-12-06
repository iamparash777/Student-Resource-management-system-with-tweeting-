
// src/app/components/pages/widgets/PostsContent.js

import React from 'react';
import Header from '../pages/widgets/Header';
import PostInput from '../pages/widgets/PostInput';
import PostFeed from '../pages/widgets/PostFeed';

const PostsContent = () => (
  <div className="flex flex-col h-screen w-full  text-gray-200">
        <div className="flex items-center justify-between ">
      <h1 className="font-bold text-3xl font-sans">Post</h1> {/* Updated Title */}
      <Header />
    </div>
    <div className="flex-1 p-6 overflow-y-auto">
      <PostInput />
      <PostFeed />
      {/* Render multiple PostFeed components if needed */}
    </div>
  </div>
);

export default PostsContent;
