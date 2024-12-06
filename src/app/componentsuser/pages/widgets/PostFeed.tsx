import React, { useState, useEffect } from 'react';
import { db, auth, collection, getDocs, doc, deleteDoc, updateDoc } from '../../../firebaseConfig';
import { Post } from './types';
import { Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showDropdown, setShowDropdown] = useState<{ [key: string]: boolean }>({});
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [sortType, setSortType] = useState<'recent' | 'top'>('recent'); // Toggle for sorting

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user.uid : null);
    });

    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        let postsData: Post[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username || 'Anonymous',
            userId: data.userId || '',
            content: data.content || '',
            timestamp: data.timestamp || null,
            shares: data.shares || 0,
            bookmarks: data.bookmarks || 0,
          };
        });

        // Apply selected ranking algorithm
        if (sortType === 'recent') {
          postsData = postsData.sort((a, b) => {
            const timeA = a.timestamp ? a.timestamp.toDate().getTime() : 0;
            const timeB = b.timestamp ? b.timestamp.toDate().getTime() : 0;
            return timeB - timeA; // Most recent posts first
          });
        } else if (sortType === 'top') {
          postsData = postsData.sort((a, b) => {
            const scoreA = getRankingScore(a);
            const scoreB = getRankingScore(b);
            return scoreB - scoreA; // Higher scores first
          });
        }

        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
    return () => unsubscribe();
  }, [sortType]); // Refetch posts when sort type changes

  // Helper function for ranking score calculation
  const getRankingScore = (post: Post) => {
    const recencyFactor = post.timestamp ? post.timestamp.toDate().getTime() : 0;
    const engagementFactor = post.shares * 2 + post.bookmarks; // Weigh shares more heavily
    return recencyFactor + engagementFactor;
  };

  const formatTimestamp = (timestamp: Timestamp | null) => {
    return timestamp ? timestamp.toDate().toLocaleString() : 'Loading...';
  };

  const toggleDropdown = (postId: string) => {
    setShowDropdown((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleEditInit = (postId: string, content: string) => {
    setEditingPostId(postId);
    setEditingContent(content);
  };

  const handleEditSave = async (postId: string) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { content: editingContent });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post, content: editingContent } : post))
      );
      setEditingPostId(null);
      setEditingContent('');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  // New function to handle sharing
  const handleShare = (postId: string) => {
    const postLink = `${window.location.origin}/posts/${postId}`; // Adjust the link as necessary
    navigator.clipboard.writeText(postLink).then(() => {
      alert('Post link copied to clipboard!'); // Optional: Notify the user
    }).catch((error) => {
      console.error('Error copying link:', error);
    });
  };

  return (
    <div>
      {/* Sort Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setSortType('recent')}
          className={`px-4 py-2 rounded-md mr-2 ${
            sortType === 'recent' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Most Recent
        </button>
        <button
          onClick={() => setSortType('top')}
          className={`px-4 py-2 rounded-md ${
            sortType === 'top' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Top Posts
        </button>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-gray-800 rounded-md mb-4 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              <div className="ml-3">
                <h3 className="text-white font-semibold">{post.username}</h3>
                <p className="text-sm text-gray-400">{formatTimestamp(post.timestamp)}</p>
              </div>
            </div>
            {currentUser === post.userId && (
              <div className="relative">
                <button onClick={() => toggleDropdown(post.id)} className="text-gray-400 hover:text-gray-600">
                  <MoreVertIcon />
                </button>
                {showDropdown[post.id] && (
                  <div className="absolute right-0 mt-2 w-24 bg-gray-700 rounded shadow-lg">
                    <button
                      onClick={() => handleEditInit(post.id, post.content)}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {editingPostId === post.id ? (
            <div>
              <input
                type="text"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 p-2 rounded-md focus:outline-none"
              />
              <button
                onClick={() => handleEditSave(post.id)}
                className="bg-green-500 text-white px-4 py-1 mt-2 rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-gray-300 mb-2">{post.content}</p>
          )}
          <div className="flex items-center justify-between text-gray-400">
            <button className="flex items-center space-x-1 hover:text-gray-200" onClick={() => handleShare(post.id)}>
              <ShareIcon />
              <span>{post.shares} Shares</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
