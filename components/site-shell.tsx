'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    <nav className="desktop-nav" aria-label="主导航">{links.map((link) => <Link key={link.href} href={link.href} scroll={false} className="nav-item"><NavLabel label={link.label} active={(link.section === activeSection && pathname === '/') || link.route === pathname} /></Link>)}<Link href="/#contact" scroll={false} className="nav-item nav-contact"><NavLabel label="联系我" arrow /></Link></nav>
    <details className="mobile-nav"><summary aria-label="打开导航菜单"><Menu size={19} /></summary><nav>{links.map((link) => <Link key={link.href} href={link.href} scroll={false}>{link.label}</Link>)}<Link href="/#contact" scroll={false}>联系我 <ArrowUpRight size={14} /></Link></nav></details>
  </div></header>;
}

export function SiteFooter() {
  return <footer id="contact" className="site-footer"><div className="shell footer-grid"><div><p className="eyebrow">联系我 · CONTACT</p><h2>谢谢浏览，如有项目或设计相关问题，欢迎与我联系</h2></div><a href="mailto:zhangyi_yeee@163.com">zhangyi_yeee@163.com <ArrowUpRight size={18} /></a></div><div className="shell footer-meta"><span>© 2026 Zhang Yi</span></div></footer>;
}
