import { useEffect, useState } from 'react';

// Custom hook for preloading images
export function useImagePreload(src?: string, fallbackSrc?: string) {
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    if (!src) {
      // If no src is provided, directly use the fallback
      setImageSrc(fallbackSrc);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(src); // Image loaded successfully
    img.onerror = () => setImageSrc(fallbackSrc); // Error loading image

    // Cleanup function to avoid memory leaks
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  return imageSrc;
}
