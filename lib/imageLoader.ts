"use client";

interface ImageLoaderProps {
  src: string;
  width: number;
  quality: number;
}

export default function myImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
}
