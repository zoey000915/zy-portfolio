'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SosVideoPlayer } from '@/components/sos-video-player';

type Mode = {
  number: string;
  title: string;
  subtitle: string;
  src: string;
};

const DESKTOP_QUERY = '(min-width: 761px)';
const MODE_CHANGE_THRESHOLD = 32;
const EXIT_THRESHOLD = 140;
const WHEEL_QUIET_MS = 120;

export function ThreeModesCarousel({ modes, asset }: { modes: Mode[]; asset: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const wheelTotalRef = useRef(0);
  const wheelDirectionRef = useRef(0);
  const exitDeltaRef = useRef(0);
  const exitReleasedRef = useRef(false);
  const exitPendingRef = useRef(false);
  const interactionLockedRef = useRef(false);
  const transitionFinishedRef = useRef(true);
  const lastWheelAtRef = useRef(0);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setIsNearViewport(entry.isIntersecting), {
      rootMargin: '800px 0px',
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const resetWheelIntent = useCallback(() => {
    wheelTotalRef.current = 0;
    wheelDirectionRef.current = 0;
    exitDeltaRef.current = 0;
  }, []);

  const selectMode = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(modes.length - 1, index));
    activeIndexRef.current = nextIndex;
    exitReleasedRef.current = false;
    exitPendingRef.current = false;
    resetWheelIntent();
    setActiveIndex(nextIndex);
  }, [modes.length, resetWheelIntent]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLVideoElement>('.sos-mode:not(.is-active) video').forEach((video) => video.pause());
  }, [activeIndex]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const normalizeDelta = (event: WheelEvent) => event.deltaMode === WheelEvent.DOM_DELTA_LINE
      ? event.deltaY * 16
      : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
        ? event.deltaY * window.innerHeight
        : event.deltaY;

    const getCapturePosition = () => {
      const activeCard = root.querySelector<HTMLElement>('.sos-mode.is-active');
      if (!activeCard) return null;

      const headerRect = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();
      const safeTop = (headerRect?.bottom ?? 0) + 14;
      const safeBottom = window.innerHeight - 14;

      return {
        cardRect,
        safeTop,
        safeBottom,
        fitsViewport: cardRect.height <= safeBottom - safeTop,
        isFullyVisible: cardRect.top >= safeTop && cardRect.bottom <= safeBottom,
      };
    };

    const finishLockedInteraction = () => {
      if (!transitionFinishedRef.current) return;

      const now = performance.now();
      const quietRemaining = Math.max(0, WHEEL_QUIET_MS - (now - lastWheelAtRef.current));

      if (quietRemaining > 0) {
        unlockTimerRef.current = setTimeout(finishLockedInteraction, quietRemaining);
        return;
      }

      interactionLockedRef.current = false;
      resetWheelIntent();
      if (exitPendingRef.current) {
        exitPendingRef.current = false;
        exitReleasedRef.current = true;
      }
      root.dataset.wheelState = exitReleasedRef.current ? 'exit-ready' : 'ready';
    };

    const scheduleUnlock = () => {
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
      if (!transitionFinishedRef.current) return;
      const delay = Math.max(1, WHEEL_QUIET_MS - (performance.now() - lastWheelAtRef.current));
      unlockTimerRef.current = setTimeout(finishLockedInteraction, delay);
    };

    const lockAfterModeChange = (nextIndex: number) => {
      interactionLockedRef.current = true;
      transitionFinishedRef.current = false;
      exitPendingRef.current = nextIndex === modes.length - 1;
      root.dataset.wheelState = 'transitioning';
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return;
      const card = event.target instanceof HTMLElement ? event.target : null;
      if (!card?.matches('.sos-mode.is-active') || !interactionLockedRef.current) return;

      if (exitPendingRef.current) lastWheelAtRef.current = performance.now();
      transitionFinishedRef.current = true;
      scheduleUnlock();
    };

    const handleWheel = (event: WheelEvent) => {
      if (!desktopQuery.matches || event.ctrlKey || event.deltaY === 0) return;

      const direction = Math.sign(event.deltaY);
      const currentIndex = activeIndexRef.current;
      const normalizedDelta = normalizeDelta(event);
      let modeDelta = normalizedDelta;

      if (interactionLockedRef.current) {
        event.preventDefault();
        lastWheelAtRef.current = performance.now();
        scheduleUnlock();
        return;
      }

      if (direction < 0 && currentIndex === 0) {
        resetWheelIntent();
        root.dataset.wheelState = 'ready';
        return;
      }

      if (direction > 0 && currentIndex === modes.length - 1 && exitReleasedRef.current) {
        root.dataset.wheelState = 'released';
        return;
      }

      const capturePosition = getCapturePosition();

      if (!capturePosition?.isFullyVisible) {
        const distanceToFullReveal = capturePosition
          ? Math.max(0, capturePosition.cardRect.bottom - capturePosition.safeBottom)
          : 0;
        const reachesFullReveal = direction > 0
          && capturePosition?.fitsViewport
          && capturePosition.cardRect.top >= capturePosition.safeTop
          && capturePosition.cardRect.bottom > capturePosition.safeBottom
          && normalizedDelta >= distanceToFullReveal;

        if (reachesFullReveal && capturePosition) {
          event.preventDefault();
          resetWheelIntent();
          window.scrollBy({ top: distanceToFullReveal, left: 0, behavior: 'auto' });
          modeDelta = normalizedDelta - distanceToFullReveal;
          root.dataset.wheelState = 'capture-aligned';
          if (modeDelta < MODE_CHANGE_THRESHOLD) return;
        } else {
          const hasPassedCapturePosition = direction > 0
            && capturePosition?.fitsViewport
            && capturePosition.cardRect.top < capturePosition.safeTop
            && capturePosition.cardRect.bottom <= capturePosition.safeBottom
            && capturePosition.cardRect.bottom > capturePosition.safeTop;

          if (hasPassedCapturePosition && capturePosition) {
            event.preventDefault();
            resetWheelIntent();
            window.scrollBy({
              top: capturePosition.cardRect.top - capturePosition.safeTop,
              left: 0,
              behavior: 'auto',
            });
            root.dataset.wheelState = 'capture-aligned';
            return;
          }

          resetWheelIntent();
          exitReleasedRef.current = false;
          exitPendingRef.current = false;
          root.dataset.wheelState = 'entering';
          return;
        }
      }

      event.preventDefault();
      lastWheelAtRef.current = performance.now();

      if (direction > 0 && currentIndex === modes.length - 1) {
        exitDeltaRef.current += Math.max(0, modeDelta);
        root.dataset.wheelState = 'exit-buffer';

        if (exitDeltaRef.current >= EXIT_THRESHOLD) {
          exitDeltaRef.current = 0;
          exitPendingRef.current = true;
          interactionLockedRef.current = true;
          transitionFinishedRef.current = true;
          root.dataset.wheelState = 'exit-settling';
          scheduleUnlock();
        }
        return;
      }

      exitDeltaRef.current = 0;
      exitReleasedRef.current = false;
      if (wheelDirectionRef.current !== direction) wheelTotalRef.current = 0;
      wheelDirectionRef.current = direction;
      wheelTotalRef.current += modeDelta;

      if (Math.abs(wheelTotalRef.current) < MODE_CHANGE_THRESHOLD) return;

      const nextIndex = currentIndex + direction;
      selectMode(nextIndex);
      lockAfterModeChange(nextIndex);
    };

    const handleBreakpointChange = () => {
      if (!desktopQuery.matches) {
        interactionLockedRef.current = false;
        transitionFinishedRef.current = true;
        exitReleasedRef.current = false;
        exitPendingRef.current = false;
        resetWheelIntent();
        root.dataset.wheelState = 'responsive-list';
      }
    };

    root.dataset.wheelState = desktopQuery.matches ? 'entering' : 'responsive-list';
    desktopQuery.addEventListener('change', handleBreakpointChange);
    root.addEventListener('transitionend', handleTransitionEnd);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      desktopQuery.removeEventListener('change', handleBreakpointChange);
      root.removeEventListener('transitionend', handleTransitionEnd);
      window.removeEventListener('wheel', handleWheel);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, [modes.length, resetWheelIntent, selectMode]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectMode(activeIndexRef.current + 1);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectMode(activeIndexRef.current - 1);
    }
  };

  return <div ref={rootRef} className="sos-mode-carousel" aria-label="三种体验状态轮播" data-active-index={activeIndex}>
    <div className="sos-mode-ring">
      {modes.map((mode, index) => {
        const relativeIndex = (index - activeIndex + modes.length) % modes.length;
        const position = relativeIndex === 0 ? 'is-active' : relativeIndex === 1 ? 'is-next' : 'is-prev';
        return <article key={mode.title} className={`sos-mode ${position}`}>
          <SosVideoPlayer
            src={`${asset}${mode.src}`}
            label={`${mode.title} mode video`}
            className="sos-mode-video"
            preload={isNearViewport ? (index === activeIndex ? 'auto' : 'metadata') : (index === activeIndex ? 'metadata' : 'none')}
          />
          <div className="sos-mode-copy"><h3>{mode.title}</h3><strong>{mode.subtitle}</strong></div>
        </article>;
      })}
    </div>
    <fieldset className="sos-carousel-controls" aria-label="选择体验状态">
      {modes.map((mode, index) => <button key={mode.number} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => selectMode(index)} onKeyDown={handleKeyDown} aria-label={`显示 ${mode.title}`} aria-current={index === activeIndex ? 'true' : undefined}><span>{mode.number}</span></button>)}
    </fieldset>
    <p className="sos-carousel-status" aria-live="polite">{modes[activeIndex].number} / {modes.length.toString().padStart(2, '0')}</p>
  </div>;
}
