'use client';

import { useLayoutEffect } from 'react';

export function LinkLabReveal() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.link-case');
    if (!root) return;

    const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-link-reveal]'));

    if (!('IntersectionObserver' in window)) return;

    const createObserver = () => {
      const triggerOffset = Math.round(window.innerHeight * 0.3);
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-link-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: `0px 0px -${triggerOffset}px 0px` });
      return observer;
    };

    let observer = createObserver();
    root.classList.add('link-reveal-enabled', 'is-reveal-ready');
    groups.forEach((group) => observer.observe(group));
    const handleResize = () => {
      observer.disconnect();
      observer = createObserver();
      groups.filter((group) => !group.classList.contains('is-link-visible'))
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
