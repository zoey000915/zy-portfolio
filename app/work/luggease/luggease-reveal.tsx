'use client';

import { useLayoutEffect } from 'react';

export function LuggEaseReveal() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.lugg-case');
    if (!root || !('IntersectionObserver' in window)) return;

    const groups = Array.from(root.querySelectorAll<HTMLElement>('.lugg-hero, .lugg-section, .lugg-experience-card'));
    const createObserver = () => {
      const triggerOffset = Math.round(window.innerHeight * 0.3);
      return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-lugg-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: `0px 0px -${triggerOffset}px 0px` });
    };

    let observer = createObserver();
    root.classList.add('lugg-reveal-enabled', 'is-reveal-ready');
    groups.forEach((group) => observer.observe(group));

    const handleResize = () => {
      observer.disconnect();
      observer = createObserver();
      groups.filter((group) => !group.classList.contains('is-lugg-visible'))
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
