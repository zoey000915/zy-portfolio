'use client';

import { useEffect, useRef } from 'react';

type ManagedVideoProps = {
  src: string;
  label: string;
  className?: string;
  muted?: boolean;
};

export function ManagedVideo({ src, label, className = '', muted = true }: ManagedVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !video.paused) video.pause();
    }, { threshold: 0.1 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} className={className} controls muted={muted} playsInline preload="metadata" aria-label={label}>
    <source src={src} type="video/mp4" />
    抱歉，浏览器不支持该视频播放。
  </video>;
}
