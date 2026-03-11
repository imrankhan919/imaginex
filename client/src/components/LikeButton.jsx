import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const LikeButton = ({ initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes || 0);

  const toggleLike = (e) => {
    e.preventDefault(); // Prevent navigation if inside a Link
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <button 
      onClick={toggleLike}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ${
        liked 
          ? 'bg-fuchsia-500/20 text-fuchsia-500 border border-fuchsia-500/50' 
          : 'bg-black/40 text-white hover:bg-black/60 border border-white/10'
      }`}
    >
      <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
      <span className="text-xs font-bold">{likesCount.toLocaleString()}</span>
    </button>
  );
};

export default LikeButton;
