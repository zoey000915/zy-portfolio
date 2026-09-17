'use client';

import { useLayoutEffect } from 'react';

export function SosReveal() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.sos-case');
    if (!root || !('IntersectionObserver' in window)) return;

    const groups = Array.from(root.querySelectorAll<HTMLElement>(
      '.sos-hero, .sos-final-film, .sos-modes, .sos-logic, .sos-making',
    ));
    const createObserver = () => {
      const triggerOffset = Math.round(window.innerHeight * 0.3);
      return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-sos-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: `0px 0px -${triggerOffset}px 0px` });
    };

    let observer = createObserver();
    root.classList.add('sos-reveal-enabled', 'is-sos-reveal-ready');
    groups.forEach((group) => observer.observe(group));

    const handleResize = () => {
      observer.disconnect();
      observer = createObserver();
      groups.filter((group) => !group.classList.contains('is-sos-visible'))
        .forEach((group) => observer.observe(group));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return null;
}
