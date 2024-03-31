import { useEffect, useState } from 'react';

const defaultFallbackImage = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/book-placeholder.png`;

// Custom hook for preloading images
export function useImagePreload(src?: string, fallbackSrc: string = defaultFallbackImage) {
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
