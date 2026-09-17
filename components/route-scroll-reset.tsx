'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export function RouteScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash));
      if (target) {
        const frame = window.requestAnimationFrame(() => {
          const previousBehavior = root.style.scrollBehavior;
          root.style.scrollBehavior = 'auto';
          target.scrollIntoView();
          root.style.scrollBehavior = previousBehavior;
        });
        return () => window.cancelAnimationFrame(frame);
      }
    }

    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousBehavior;
  }, [pathname]);

  return null;
}
