'use client';

import { useLayoutEffect } from 'react';

export function HomeReveal() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('main');
    if (!root || !('IntersectionObserver' in window)) return;

    const groups = Array.from(root.querySelectorAll<HTMLElement>(
      '.home-identity, .about-section, .education-block, .skill-block, .works-section',
    ));
    const createObserver = () => {
      const triggerOffset = Math.round(window.innerHeight * 0.3);
      return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-home-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: `0px 0px -${triggerOffset}px 0px` });
    };

    let observer = createObserver();
    root.classList.add('home-reveal-enabled', 'is-home-reveal-ready');
    groups.forEach((group) => observer.observe(group));

    const handleResize = () => {
      observer.disconnect();
      observer = createObserver();
      groups.filter((group) => !group.classList.contains('is-home-visible'))
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
