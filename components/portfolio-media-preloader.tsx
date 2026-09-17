'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type ConnectionInfo = {
  effectiveType?: string;
  saveData?: boolean;
};

type PreloadPlan = {
  nextRoute: string;
  images: string[];
  video?: string;
  delay: number;
};

const plans: Record<string, PreloadPlan> = {
  '/': {
    nextRoute: '/work/link-lab',
    images: [
      '/assets/linklab/linklab-home.png',
      '/assets/linklab/linklab-situation-detail.png',
      '/assets/linklab/linklab-my-path-main.png',
    ],
    delay: 1200,
  },
  '/about': {
    nextRoute: '/work/link-lab',
    images: [
      '/assets/linklab/linklab-home.png',
      '/assets/linklab/linklab-situation-detail.png',
      '/assets/linklab/linklab-my-path-main.png',
    ],
    delay: 1200,
  },
  '/work/link-lab': {
    nextRoute: '/work/luggease',
    images: ['/assets/luggease/luggease-composite.jpg'],
    delay: 1400,
  },
  '/work/luggease': {
    nextRoute: '/work/step-of-strength',
    images: ['/assets/step-of-strength/hero-dancers-alley.png'],
    video: '/assets/step-of-strength/final-film.mp4',
    delay: 1800,
  },
};

const warmedAssets = new Set<string>();

function warmAsset(href: string, as: 'image' | 'video') {
  if (warmedAssets.has(href)) return;
  warmedAssets.add(href);

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = as;
  link.setAttribute('fetchpriority', 'low');
  if (as === 'video') link.type = 'video/mp4';
  document.head.appendChild(link);
}

async function waitForVisibleImages() {
  const images = Array.from(document.images).filter((image) => {
    const rect = image.getBoundingClientRect();
    return rect.bottom > -100 && rect.top < window.innerHeight * 1.25;
  });

  await Promise.all(images.map(async (image) => {
    if (!image.complete) {
      await new Promise<void>((resolve) => {
        image.addEventListener('load', () => resolve(), { once: true });
        image.addEventListener('error', () => resolve(), { once: true });
      });
    }
    if ('decode' in image) await image.decode().catch(() => undefined);
  }));
}

export function PortfolioMediaPreloader() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const normalizedPath = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname;
    const plan = plans[normalizedPath];
    if (!plan) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let videoTimer: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const schedule = async () => {
      await waitForVisibleImages();
      if (cancelled || document.visibilityState !== 'visible') return;

      timer = setTimeout(() => {
        const run = () => {
          if (cancelled || document.visibilityState !== 'visible') return;

          router.prefetch(plan.nextRoute);
          plan.images.forEach((image) => warmAsset(image, 'image'));

          if (!plan.video) return;
          const connection = (navigator as Navigator & { connection?: ConnectionInfo }).connection;
          if (connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return;

          videoTimer = setTimeout(() => {
            if (!cancelled && document.visibilityState === 'visible') warmAsset(plan.video!, 'video');
          }, 1600);
        };

        if ('requestIdleCallback' in window) {
          idleId = window.requestIdleCallback(run, { timeout: 2200 });
        } else {
          run();
        }
      }, plan.delay);
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (timer) clearTimeout(timer);
      if (videoTimer) clearTimeout(videoTimer);
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
    };
  }, [pathname, router]);

  return null;
}
