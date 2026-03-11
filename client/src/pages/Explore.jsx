import React, { useState } from 'react';
import MasonryGrid from '../components/MasonryGrid';
import PostCard from '../components/PostCard';
import CategoryFilter from '../components/CategoryFilter';
import { MOCK_POSTS } from '../mockData';

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto mt-4">
      <div className="mb-8">
        <h1 className="text-3xl font-syne font-bold mb-6">Discover</h1>
        <CategoryFilter 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />
      </div>

      {filteredPosts.length > 0 ? (
        <MasonryGrid>
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No posts found for this category.
        </div>
      )}
    </div>
  );
};

export default Explore;
