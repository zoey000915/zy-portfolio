'use client';

import { useEffect, useRef, useState } from 'react';
import { ManagedVideo } from '@/components/managed-video';

type PlaybackState = 'idle' | 'playing' | 'paused' | 'ended';

type SosVideoPlayerProps = {
  src: string;
  label: string;
  className: string;
  controlPosition?: 'center' | 'left';
  preload?: 'none' | 'metadata' | 'auto';
  preloadAfterPageLoad?: boolean;
};

export function SosVideoPlayer({ src, label, className, controlPosition = 'center', preload = 'metadata', preloadAfterPageLoad = false }: SosVideoPlayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [effectivePreload, setEffectivePreload] = useState(preload);

  useEffect(() => setEffectivePreload(preload), [preload]);

  useEffect(() => {
    if (!preloadAfterPageLoad) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      const connection = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
      if (connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return;
      timer = setTimeout(() => {
        if (document.visibilityState === 'visible') setEffectivePreload('auto');
      }, 1000);
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      window.removeEventListener('load', schedule);
      if (timer) clearTimeout(timer);
    };
  }, [preloadAfterPageLoad]);

  useEffect(() => {
    const video = rootRef.current?.querySelector('video');
    if (!video) return;

    const handlePlay = () => setPlaybackState('playing');
    const handlePause = () => {
      if (!video.ended) setPlaybackState(video.currentTime > 0 ? 'paused' : 'idle');
    };
    const handleEnded = () => setPlaybackState('ended');

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayback = () => {
    const video = rootRef.current?.querySelector('video');
    if (!video) return;

    if (video.ended) video.currentTime = 0;
    if (video.paused) {
      setPlaybackState('playing');
      video.play().catch(() => setPlaybackState(video.ended ? 'ended' : 'paused'));
    } else {
      setPlaybackState('paused');
      video.pause();
    }
  };

  const isPlaying = playbackState === 'playing';
  const isEnded = playbackState === 'ended';
  const actionLabel = isEnded ? `重新播放 ${label}` : isPlaying ? `暂停 ${label}` : `播放 ${label}`;

  return <div ref={rootRef} className={`${className} sos-video-player is-${playbackState}`}>
    <ManagedVideo src={src} label={label} muted={false} controls={false} preload={effectivePreload} />
    <button
      className={`sos-video-toggle is-${controlPosition}`}
      type="button"
      onClick={togglePlayback}
      aria-label={actionLabel}
    >
      <span className="sos-video-toggle-icon" aria-hidden="true">{isEnded ? '↻' : isPlaying ? 'Ⅱ' : '▶'}</span>
    </button>
  </div>;
}
