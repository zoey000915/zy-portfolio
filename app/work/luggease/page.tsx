import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { ArrowRight, BellRing, Boxes, CheckCircle2, CircleGauge, ClipboardCheck, HandHelping, Luggage, MapPinned, QrCode, Route, ScanLine, Smartphone, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LuggEaseReveal } from './luggease-reveal';
import './luggease.css';

// The page intentionally uses only the confirmed final mobile screens.
const asset = '/assets/luggease/';

function Device({ file, alt, className = '' }: { file: string; alt: string; className?: string }) {
  return <figure className={`lugg-device ${className}`}><span className="lugg-island" aria-hidden="true" /><div className="lugg-screen"><img src={`${asset}${file}`} alt={alt} /></div></figure>;
}

function SupportingDevice({ file, alt }: { file: string; alt: string }) {
  return <figure className="lugg-supporting-device"><span className="lugg-supporting-island" aria-hidden="true" /><div className="lugg-supporting-screen"><img src={`${asset}${file}`} alt={alt} /></div></figure>;
}

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return <span className="lugg-icon"><Icon size={20} strokeWidth={1.8} /></span>;
}

function SectionTitle({ label, english, title, intro }: { label: string; english: string; title: string; intro?: string }) {
  return <header className="lugg-section-title"><p>{label} <span>· {english}</span></p><h2>{title}</h2>{intro && <div>{intro}</div>}</header>;
}

const problems: Array<[string, string, string, LucideIcon]> = [
  ['01', '搬运负担', '多件行李持续占用双手和身体精力。', Luggage],
  ['02', '操作压力', '机场流程本身已经包含连续任务，行李管理进一步增加操作负担。', ClipboardCheck],
  ['03', '状态焦虑', '行李离开视线后，用户仍然需要知道当前位置、处理状态和下一步。', CircleGauge],
];

const goals: Array<[string, string, string, string, LucideIcon]> = [
  ['持续搬运行李', '减少搬运', '让用户在不持续携带行李的情况下完成机场移动。', '01', HandHelping],
  ['机场中操作时间有限', '简化预约', '减少输入和操作步骤，让用户可以快速建立服务。', '02', Smartphone],
  ['行李离开用户视线', '保持状态可见', '持续反馈行李的位置、状态和处理进度。', '03', MapPinned],
  ['家庭任务需要灵活分担', '支持家庭协作', '让其他家庭成员也可以查看或完成取件。', '04', UsersRound],
];

const flow: Array<[string, LucideIcon]> = [
  ['选择服务', Boxes], ['填写信息', ClipboardCheck], ['完成预约', CheckCircle2], ['交付行李', Luggage], ['实时追踪', Route], ['到达通知', BellRing], ['二维码取件', QrCode],
];

export default function LuggEasePage() {
  return <><SiteHeader /><main className="lugg-case"><LuggEaseReveal />
    <section className="lugg-hero" data-lugg-reveal><div className="shell lugg-hero-grid"><div className="lugg-hero-copy"><h1>LuggEase</h1><h2>面向家庭旅客的机场行李服务</h2><p>家庭旅客在机场中往往需要同时照顾儿童、处理多件行李并完成值机和移动任务。LuggEase 通过寄存、配送、状态追踪和二维码取件，将分散的行李操作整合为连续服务流程，减少家长在机场中的搬运和管理负担。</p><div className="lugg-tags"><span>用户研究</span><span>服务设计</span><span>产品逻辑</span><span>UX/UI</span></div></div><figure className="lugg-hero-stage lugg-hero-composite"><img src={`${asset}luggease-composite.jpg`} alt="LuggEase Mobile 界面组合展示" /></figure></div></section>

    <section className="lugg-section lugg-problem" data-lugg-reveal><div className="shell"><div className="lugg-problem-grid"><div><SectionTitle label="问题背景" english="Problem Context" title="照顾孩子和处理行李，是同时发生的两件事" /><div className="lugg-body"><p>家庭旅客在机场中需要同时照顾儿童、确认行程、移动并管理多件行李。真正增加负担的并不只是行李重量，而是家长需要不断在照顾儿童、确认流程和处理行李之间切换注意力。</p><p>持续搬运行李会占用双手和体力；值机、等待、移动和登机本身已经包含连续操作；而当行李交由服务处理后，用户仍然需要持续确认行李是否正常、现在在哪里以及下一步会发生什么。</p></div></div><div className="lugg-problem-list">{problems.map(([no,title,text,Icon]) => <article key={no}><span className="lugg-no">{no}</span><IconBadge icon={Icon} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></div></section>

    <section className="lugg-section lugg-goals" data-lugg-reveal><div className="shell"><SectionTitle label="设计目标" english="Design Goals" title="把“减轻负担”转化为具体服务目标" /><div className="lugg-goal-grid">{goals.map(([research,title,text,no,Icon]) => <article key={no}><div className="lugg-goal-source"><small>研究 · RESEARCH</small><p>{research}</p></div><ArrowRight className="lugg-goal-arrow" size={20} /><div className="lugg-goal-output"><small>产品需求 · PRODUCT REQUIREMENT</small><div className="lugg-goal-output-content"><span>{no}</span><IconBadge icon={Icon} /><div><h3>{title}</h3><p>{text}</p></div></div></div></article>)}</div></div></section>

    <section className="lugg-section lugg-flow-section" data-lugg-reveal><div className="shell"><SectionTitle label="服务流程" english="Service Flow" title="从预约到取件，形成连续的行李服务链路" intro="用户完成必要信息填写后，可以交付行李并持续查看行李状态，并在到达机场后通过二维码完成取件。" /><div className="lugg-flow">{flow.map(([text,Icon],index) => <div className="lugg-flow-step" key={text}><IconBadge icon={Icon} /><span>{String(index + 1).padStart(2,'0')}</span><strong>{text}</strong>{index < flow.length - 1 && <ArrowRight className="lugg-flow-arrow" size={18} />}</div>)}</div></div></section>

    <section className="lugg-section lugg-experience"><div className="shell"><SectionTitle label="核心体验" english="Core Experience" title="让服务从快速预约延伸到安心取件" /><div className="lugg-experience-list"><article className="lugg-experience-card booking"><div className="lugg-experience-copy"><span>体验 01</span><h3>快速完成预约</h3><p className="lugg-user-problem">机场环境中不适合填写过多复杂信息</p><p>先选择 Storage / Delivery，再只填写必要的航班、行李和预约信息，减少输入负担</p><ul><li>服务类型先行</li><li>清晰确认操作</li></ul></div><div className="lugg-phone-group three"><Device file="landing.png" alt="LuggEase 服务选择界面" /><Device file="storage.png" alt="LuggEase 寄存预约界面" /><Device file="delivery.png" alt="LuggEase 配送预约界面" /></div></article><article className="lugg-experience-card tracking"><div className="lugg-phone-group two"><Device file="tracking.png" alt="LuggEase 行李追踪界面" /><Device file="reservation.png" alt="LuggEase 我的预约界面" /></div><div className="lugg-experience-copy"><span>体验 02</span><h3>持续掌握行李状态</h3><p className="lugg-user-problem">行李离开视线后，用户会担心服务是否正常推进</p><p>通过当前状态、流程进度、地图、时间线和时间戳，持续反馈行李的位置与处理阶段</p><div className="lugg-status-chips"><span>进度反馈清晰</span><span>降低等待焦虑</span></div></div></article><article className="lugg-experience-card pickup"><div className="lugg-experience-copy"><span>体验 03</span><h3>灵活完成取件</h3><p className="lugg-user-problem">家庭旅客不一定始终由同一个人负责处理行李</p><p>通过二维码和共享取件信息，让其他家庭成员也可以完成取件，降低单一预约人的操作负担</p><div className="lugg-pickup-route"><span className="lugg-pickup-pill"><ScanLine size={18} /><strong>二维码</strong></span><ArrowRight size={16} /><span className="lugg-pickup-pill"><UsersRound size={18} /><strong>共享取件</strong></span></div></div><div className="lugg-pickup-visual"><img src={`${asset}family-scene.jpg`} alt="家庭旅客在机场使用 LuggEase" /><Device file="qr-code.png" alt="LuggEase 二维码取件界面" /></div></article></div></div></section>

    <section className="lugg-section lugg-iteration-section"><div className="shell"><SectionTitle label="迭代优化" english="Interface Refinement" title="围绕可读性、视觉层级和信息分组，进一步简化关键页面" /><div className="lugg-iteration-list"><article className="lugg-refinement-landing"><div className="lugg-refinement-copy"><header><span>迭代01</span><h3>提升首页信息辨识度</h3><p><strong>发现的问题</strong>Stark 对比度检查显示，欢迎区部分文字辨识度不足；顶部状态信息与快捷入口层级也不够清楚。</p><p><strong>设计调整</strong>提高欢迎文字的字号与字重，将航班与行李摘要移到快捷入口下方，并取消二维码按钮与欢迎区重叠的布局。</p><p className="lugg-result">优化结果：首页的信息层级更加清晰，状态信息与可执行操作更容易区分。</p></header><ul><li>Stark 对比度检查</li><li>提升文字辨识度</li><li>重构信息层级</li></ul></div><div className="lugg-compare"><div className="lugg-compare-stage"><small>较早版本</small><Device file="refinement-earlier-landing.png" alt="PDF 中较早的 Landing Page" className="iteration-early iteration-landing" /></div><ArrowRight className="lugg-compare-arrow" /><div className="lugg-compare-stage"><small>最终版本</small><Device file="landing.png" alt="最终 Landing Page" className="iteration-final iteration-landing" /></div></div></article><article className="lugg-refinement-booking"><div className="lugg-refinement-copy"><header><span>迭代02</span><h3>简化预约页信息结构</h3><p><strong>发现的问题</strong>早期 Storage 页面使用较多卡片和输入框立体效果，locker 信息、item 数量与价格集中在同一区块，信息关系不够清楚。</p><p><strong>设计调整</strong>采用更扁平的视觉，并重新划分信息区块，将 locker 信息与 item / 价格拆分显示。</p><p className="lugg-result">优化结果：视觉噪音减少，服务位置、数量和费用之间的关系更容易快速理解。</p></header><ul><li>减少视觉噪音</li><li>强化信息分组</li><li>明确阅读顺序</li></ul></div><div className="lugg-compare"><div className="lugg-compare-stage"><small>较早版本</small><Device file="refinement-earlier-storage.png" alt="较早版本 Storage 页面" className="iteration-early" /></div><ArrowRight className="lugg-compare-arrow" /><div className="lugg-compare-stage"><small>最终版本</small><Device file="storage.png" alt="最终 Storage 页面" className="iteration-final" /></div></div></article></div></div></section>

    <section className="lugg-section lugg-final"><div className="shell"><SectionTitle label="最终界面" english="Final Interface" title="Mobile 行李服务的完整界面系统" /><div className="lugg-final-stage"><div className="lugg-final-label"><span>主要界面</span><small>Primary Screens</small></div><div className="lugg-final-grid primary"><Device file="tracking.png" alt="LuggEase Tracking" className="final-tracking" /><Device file="landing.png" alt="LuggEase Landing Page" className="final-landing" /><Device file="reservation.png" alt="LuggEase My Reservation" className="final-reservation" /><Device file="qr-code.png" alt="LuggEase QR Code" className="final-qr" /></div><div className="lugg-final-label supporting"><span>辅助界面</span><small>Supporting Screens</small></div><div className="lugg-supporting-devices"><SupportingDevice file="delivery.png" alt="LuggEase Delivery" /><SupportingDevice file="storage.png" alt="LuggEase Storage" /></div></div></div></section>
  </main><SiteFooter /></>;
}
