import React, { useState, useEffect } from 'react';
import { db, auth, collection, addDoc, serverTimestamp } from '../../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import SendIcon from '@mui/icons-material/Send';

const PostInput: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || 'Anonymous');
        setUserId(user.uid);
      } else {
        setUsername(null);
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePost = async () => {
    if (!postContent.trim() || !userId || !username) return;

    try {
      await addDoc(collection(db, 'posts'), {
        username,
        userId,
        content: postContent,
        timestamp: serverTimestamp(),
        shares: 0,
        bookmarks: 0,
      });
      setPostContent('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md mb-4">
      <input
        type="text"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder={`What's on your mind, ${username || 'user'}?`}
        className="w-full bg-gray-700 text-gray-200 p-3 rounded-md focus:outline-none"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handlePost}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <SendIcon />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
};

export default PostInput;
