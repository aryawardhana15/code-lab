import React, { useState } from 'react';

const LikeButton = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    // In a real app, send like/unlike action to backend
  };

  return (
    <button
      onClick={handleLikeToggle}
      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
        isLiked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill={isLiked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H3.737a2 2 0 01-1.789-2.894l3.5-7A2 2 0 017.237 9H10V7a2 2 0 012-2h2a2 2 0 012 2v3z"
        />
      </svg>
      <span>{likes} Suka</span>
    </button>
  );
};

export default LikeButton;
