'use client';

/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions -- The native details disclosure and its absolutely positioned menu form one hover boundary. */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu } from 'lucide-react';
import { type MouseEvent, useEffect, useRef, useState } from 'react';

const links = [
  { href: '/', label: '关于我', section: 'about' },
  { href: '/work/link-lab', label: 'Link-Lab', route: '/work/link-lab' },
  { href: '/work/luggease', label: 'LuggEase', route: '/work/luggease' },
  { href: '/work/step-of-strength', label: 'Step of Strength', route: '/work/step-of-strength' },
];

function NavLabel({ label, active = false, arrow = false }: { label: string; active?: boolean; arrow?: boolean }) {
  return <span className={`nav-label ${active ? 'is-active' : ''}`}><span className="nav-default">{label}{arrow && <ArrowUpRight size={15} />}</span><span className="nav-hover" aria-hidden="true">{label}{arrow && <ArrowUpRight size={15} />}</span></span>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDetailsElement>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverClose = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };

  const supportsHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const closeMobileNav = () => {
    clearHoverClose();
    setMobileOpen(false);
  };

  const scrollCurrentPageToTop = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    const targetPath = new URL(href, window.location.origin).pathname.replace(/\/+$/, '') || '/';

    if (currentPath !== targetPath) return;
    event.preventDefault();
    const resetScroll = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    resetScroll();
    window.requestAnimationFrame(resetScroll);
    window.setTimeout(resetScroll, 100);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (mobileOpen && !mobileNavRef.current?.contains(event.target as Node)) closeMobileNav();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !mobileOpen) return;
      closeMobileNav();
      mobileNavRef.current?.querySelector('summary')?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      clearHoverClose();
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (pathname !== '/') return;
    const about = document.getElementById('about');
    if (!about) return;
    const observer = new IntersectionObserver(([entry]) => setActiveSection(entry.isIntersecting ? 'about' : ''), { rootMargin: '-35% 0px -55% 0px' });
    observer.observe(about);
    return () => observer.disconnect();
  }, [pathname]);

  return <header className="site-header"><div className="shell nav-wrap">
    <Link href="/" className="brand" aria-label="章怡作品集首页"><span>章怡</span><small>Zhang Yi</small></Link>
    <nav className="desktop-nav" aria-label="主导航">{links.map((link) => <Link key={link.href} href={link.href} scroll={false} className="nav-item" onClickCapture={(event) => scrollCurrentPageToTop(event, link.href)}><NavLabel label={link.label} active={(link.section === activeSection && pathname === '/') || link.route === pathname} /></Link>)}<Link href="/#contact" className="nav-item nav-contact"><NavLabel label="联系我" arrow /></Link></nav>
    <details ref={mobileNavRef} className="mobile-nav" open={mobileOpen} onToggle={(event) => setMobileOpen(event.currentTarget.open)} onMouseEnter={() => { clearHoverClose(); if (supportsHover()) setMobileOpen(true); }} onMouseLeave={() => { if (!supportsHover()) return; clearHoverClose(); hoverCloseTimer.current = setTimeout(() => setMobileOpen(false), 180); }}><summary aria-label={mobileOpen ? '关闭导航菜单' : '打开导航菜单'} aria-expanded={mobileOpen}><Menu size={19} /></summary><nav>{links.map((link) => <Link key={link.href} href={link.href} scroll={false} onClickCapture={(event) => scrollCurrentPageToTop(event, link.href)} onClick={closeMobileNav}>{link.label}</Link>)}<Link href="/#contact" onClick={closeMobileNav}>联系我 <ArrowUpRight size={14} /></Link></nav></details>
  </div></header>;
}

export function SiteFooter() {
  return <footer id="contact" className="site-footer"><div className="shell footer-grid"><div><p className="eyebrow">联系我 · CONTACT</p><h2>谢谢浏览，如有项目或设计相关问题，欢迎与我联系</h2></div><a href="mailto:zhangyi_yeee@163.com">zhangyi_yeee@163.com <ArrowUpRight size={18} /></a></div><div className="shell footer-meta"><span>© 2026 Zhang Yi</span></div></footer>;
}
