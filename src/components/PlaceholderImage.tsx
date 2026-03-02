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
    return <div className={`placeholder-img ${className}`} title={alt} />;
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
