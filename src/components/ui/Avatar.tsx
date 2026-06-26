import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className = "" }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-[#121212] shadow-sm transition-transform hover:scale-105 ${className}`}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="aspect-square h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#232531] text-sm font-semibold text-white/80 uppercase">
          {fallback}
        </div>
      )}
    </div>
  );
};
