import React from 'react';
import MasonryGrid from '../components/MasonryGrid';
import PostCard from '../components/PostCard';
import { MOCK_POSTS } from '../mockData';
import { Sparkles } from 'lucide-react';

const Feed = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto mt-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-syne font-bold">Your Feed</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm">
            Following
          </button>
          <button className="px-4 py-2 rounded-full glass-card text-gray-400 font-medium hover:text-white transition-colors text-sm flex items-center gap-1.5 cursor-pointer">
            <Sparkles className="w-4 h-4" /> For You
          </button>
        </div>
      </div>
      
      <MasonryGrid>
        {MOCK_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </MasonryGrid>
    </div>
  );
};

export default Feed;
