"use client";

import { useState } from "react";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function PlaceholderImage({ src, alt, className = "" }: PlaceholderImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`placeholder-img relative ${className}`} title={alt}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="text-[10px] uppercase tracking-wider text-gray-300">No Image</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
