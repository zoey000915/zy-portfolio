import type { Metadata } from 'next';
import './globals.css';
import './home-refinements.css';
import { RouteScrollReset } from '@/components/route-scroll-reset';

export const metadata: Metadata = { title: '章怡 Yi Zhang — UX/UI Portfolio', description: '章怡的交互设计与 UX/UI 作品集。' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><RouteScrollReset />{children}</body></html>;
}
