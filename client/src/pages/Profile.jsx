import React from 'react';
import { useParams } from 'react-router-dom';
import { CURRENT_USER, MOCK_POSTS } from '../mockData';
import MasonryGrid from '../components/MasonryGrid';
import PostCard from '../components/PostCard';
import UserAvatar from '../components/UserAvatar';
import { Settings, Share2, MapPin, Calendar } from 'lucide-react';

const Profile = () => {
  const { username } = useParams();
  
  // In a real app, fetch user by username. Using CURRENT_USER for mock.
  const isCurrentUser = username === CURRENT_USER.username;
  const userPosts = MOCK_POSTS.slice(0, 8); // Mocking user's posts

  return (
    <div className="w-full relative pb-20">
      {/* Cover Image */}
      <div className="h-64 sm:h-80 w-full relative">
        <img 
          src="https://picsum.photos/seed/cover_art/1200/400" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 sm:-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div className="flex items-end gap-6 relative z-10">
            <UserAvatar src={CURRENT_USER.avatar} alt="Profile" size="xl" ring />
            <div className="mb-2">
              <h1 className="text-3xl font-syne font-bold text-white">{CURRENT_USER.name}</h1>
              <p className="text-gray-400">@{CURRENT_USER.username}</p>
            </div>
          </div>
          
          <div className="flex gap-3 relative z-10 sm:mb-2">
            <button className="p-2 rounded-full glass-card hover:bg-white/10 transition-colors">
              <Share2 className="w-5 h-5 text-gray-300" />
            </button>
            {isCurrentUser ? (
              <button className="flex items-center gap-2 px-6 py-2 rounded-full glass-card hover:bg-white/10 transition-colors font-medium">
                <Settings className="w-4 h-4 text-gray-300" /> Edit Profile
              </button>
            ) : (
              <button className="px-8 py-2 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-medium shadow-lg shadow-violet-600/20">
                Follow
              </button>
            )}
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="max-w-2xl text-gray-300 mb-8 space-y-4">
          <p className="leading-relaxed">{CURRENT_USER.bio}</p>
          
          <div className="flex gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> Neo-Tokyo, Cyberspace</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> Joined March 2026</div>
          </div>

          <div className="flex gap-8 pt-4 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">{CURRENT_USER.postsCount}</span>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Posts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">{CURRENT_USER.followers}</span>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Followers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">{CURRENT_USER.following}</span>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Following</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-white/10">
          <button className="pb-4 font-medium text-violet-400 border-b-2 border-violet-500 relative">
            Creations
          </button>
          <button className="pb-4 font-medium text-gray-400 hover:text-white transition-colors">
            Liked
          </button>
          <button className="pb-4 font-medium text-gray-400 hover:text-white transition-colors">
            Collections
          </button>
        </div>

        {/* Posts Grid */}
        <MasonryGrid>
          {userPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </MasonryGrid>
      </div>
    </div>
  );
};

export default Profile;
