import React from 'react';

const UserAvatar = ({ src, alt, size = 'md', isOnline = false, ring = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover shadow-md ${
          ring ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-[#0a0a0f]' : ''
        }`}
      />
      {isOnline && (
        <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ring-[#0a0a0f] bg-green-500"></span>
      )}
    </div>
  );
};

export default UserAvatar;
