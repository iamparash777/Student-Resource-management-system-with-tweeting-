// C:\Users\PARASH\Desktop\New folder (2)\study\src\components\PostInput.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image'; // Image upload icon
import GifIcon from '@mui/icons-material/Gif'; // GIF upload icon
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Emoji icon

const PostInput: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null); // Create a ref for the component

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsExpanded(false); // Collapse when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup
    };
  }, []);

  return (
    <div
      ref={ref} // Attach ref to the main div
      className={`border border-gray-300 p-2 rounded-md transition-all duration-300 ${
        isExpanded ? 'w-full h-40 flex-col items-start' : 'w-full h-12 flex-row items-center justify-between'
      } flex`}
      onClick={() => setIsExpanded(true)}
    >
      {/* User Icon */}
      <div className="rounded-full bg-black w-8 h-8 mr-2"></div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="What’s on your mind?"
        className="flex-grow px-2 py-1 border-none outline-none bg-transparent text-gray-600"
        onFocus={() => setIsExpanded(true)}
      />

      {/* Post Button (only show when collapsed) */}
      {!isExpanded && (
        <div className="flex justify-end w-full">
          <button className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Post
          </button>
        </div>
      )}

      {/* Expanded Icons and Post Button (only show when expanded) */}
      {isExpanded && (
        <div className="flex mt-2 space-x-3 justify-between items-center">
          {/* Icons */}
          <div className="flex space-x-3">
            {/* Image Upload Icon */}
            <ImageIcon className="text-gray-500 cursor-pointer" titleAccess="Upload Image" />

            {/* GIF Upload Icon */}
            <GifIcon className="text-gray-500 cursor-pointer" titleAccess="Upload GIF" />

            {/* Emoji Icon */}
            <EmojiEmotionsIcon className="text-gray-500 cursor-pointer" titleAccess="Add Emoji" />
          </div>

          {/* Post Button */}
          <button className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default PostInput;
