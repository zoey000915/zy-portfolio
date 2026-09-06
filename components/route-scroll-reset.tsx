'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export function RouteScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousBehavior;
  }, [pathname]);

  return null;
}
