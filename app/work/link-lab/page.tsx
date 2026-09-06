import Image from 'next/image';
import {
  ArrowLeft, ArrowRight, CheckSquare2, CircleAlert, ClipboardList,
  Clock3, Compass, FileText, Flag, ListFilter, MapPin, MessageSquareText,
  Milestone, Puzzle, Route, Search, SlidersHorizontal, UserRound,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import './linklab.css';

const asset = '/assets/linklab/';

type IconType = typeof MapPin;

function DeviceMockup({ file, alt, className = '' }: { file: string; alt: string; className?: string }) {
  return <figure className={`link-device ${className}`}>
    <span className="link-device-island" aria-hidden="true" />
    <div className="link-device-screen"><Image src={`${asset}${file}`} width={440} height={956} alt={alt} /></div>
  </figure>;
}

function IconBadge({ icon: Icon, accent = false }: { icon: IconType; accent?: boolean }) {
  return <span className={`link-icon${accent ? ' is-accent' : ''}`}><Icon size={19} strokeWidth={1.8} /></span>;
}

function SectionTitle({ label, english, title }: { label: string; english: string; title: string }) {
  return <header className="link-section-title"><p>{label} <span>· {english}</span></p><h2>{title}</h2></header>;
}

export default function LinkLabPage() {
  const insights: Array<[string, string, string, IconType]> = [
    ['01', '信息并非缺失', '官方渠道、机构页面和个人经验都提供了大量内容，用户的问题并不是完全找不到答案。', FileText],
    ['02', '信息缺少情境关系', '流程顺序、默认规则、行为期待和准备事项往往分散在不同来源中，用户需要自己判断哪些内容与当前情境有关。', Puzzle],
    ['03', '行动仍需自行判断', '即使用户已经获得信息，仍然需要自己拼接流程、确认当前阶段，并决定接下来应该采取什么行动。', Route],
  ];
  const mapping: Array<[string, string, string, IconType]> = [
    ['不知道自己现在在哪一步', '显示当前情境与流程位置', '情境概览 / 我的路径', CircleAlert],
    ['不知道需要准备什么', '提前呈现关键事项', '准备内容 / 情境详情', ClipboardList],
    ['默认规则难以发现', '将容易忽略的信息显性化', '情境说明 / 实用提示', Search],
    ['信息需要自己拼接', '按行动顺序组织内容', '分步路径', Puzzle],
    ['任务无法一次完成', '保存进度和后续行动', '我的路径', Clock3],
  ];
  const iteration = [
    ['01', '抽象的文化或制度解释很难直接帮助用户采取行动。', '强化“第一次租房”“寻找家庭医生”等明确情境，并提高具体场景的优先级。'],
    ['02', '用户即使理解整体流程，仍然可能不知道当前要做什么。', '强化步骤顺序、当前状态和下一步提示，并通过“我的路径”持续保存进度。'],
    ['03', '随着信息量增加，不同页面之间容易出现功能和内容重叠。', '继续明确探索、情境详情、我的路径和发布功能各自承担的任务，并优化信息层级。'],
  ];

  return <><SiteHeader /><main className="link-case">
    <section className="link-hero"><div className="shell link-hero-grid">
      <div className="link-hero-copy"><a href="/#work" className="link-back"><ArrowLeft size={16} />返回项目</a><h1>Link-Lab Hybrid Navigation System</h1><h2>面向澳洲新用户的情境导航平台</h2><p>Link-Lab 聚焦初到澳大利亚的用户在租房、医疗和公共服务中遇到的陌生流程。研究发现，真正的困难并不只是信息分散，而是用户难以理解流程位置、默认规则、准备事项和下一步行动。</p><p>项目最终从较宽泛的信息与经验平台，收缩为以具体情境为入口的导航系统，将分散的信息和经验重新组织成更清晰、可执行的行动路径。</p><div className="link-tags"><span><FileText size={15} />研究分析</span><span><Puzzle size={15} />信息与内容策略</span><span><Route size={15} />UX/UI</span></div></div>
      <div className="link-hero-stage"><DeviceMockup file="linklab-home.png" alt="Link-Lab Home 完整界面" className="is-side" /><DeviceMockup file="linklab-situation-detail.png" alt="Link-Lab Situation Detail 完整界面" className="is-main" /><DeviceMockup file="linklab-my-path-main.png" alt="Link-Lab My Path 完整界面" className="is-side" /></div>
    </div></section>

    <section className="link-section link-context"><div className="shell"><SectionTitle label="问题背景" english="Problem Context" title="第一次进入陌生系统时，信息并不等于理解" /><div className="link-context-grid"><div className="link-body"><p>澳大利亚的租房、医疗和公共服务并不缺少信息，但很多流程依赖用户已经掌握一定的本地经验。对于第一次进入这些系统的人来说，真正容易造成困难的往往是没有被明确说明的部分：需要准备什么、先做哪一步、如何与工作人员沟通，以及接下来会发生什么。</p><p>访谈中的真实经历也反复出现类似情况：第一次乘公交时才发现上下车存在特定刷卡规则，办理网络服务时才知道需要提前取消，面对驾照或医疗流程时则只能边做边理解。</p><p className="link-context-tags">交通 <span>/</span> 医疗 <span>/</span> 租房</p></div><div className="link-step-list">{[['01','我现在在哪一步？',MapPin],['02','需要提前准备什么？',ClipboardList],['03','下一步应该做什么？',Route]].map(([n,text,Icon]) => <div className="link-step" key={String(n)}><IconBadge icon={Icon as IconType} /><span>Step {String(n)}</span><strong>{String(text)}</strong></div>)}</div></div></div></section>

    <section className="link-section link-cool"><div className="shell"><SectionTitle label="研究收敛" english="Research Synthesis" title="从“信息不足”进一步发现“行动判断困难”" /><div className="link-research-lead"><p>进一步比较不同阶段的受访者后，我们发现，这种困难并不只属于刚到澳大利亚的人。</p><p>即使已经生活多年，只要第一次进入一个新的流程，例如申请房贷、选择学校或处理孩子升学，也仍然可能因为缺乏相关经验而不知道如何开始。</p></div><div className="link-insights">{insights.map(([n,title,text,Icon]) => <article key={n}><span className="link-insight-no">{n}</span><IconBadge icon={Icon} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><blockquote className="link-evidence">“最难的部分是不知道下一步是什么。”</blockquote><div className="link-key-insight"><IconBadge icon={Milestone} accent /><strong>核心洞察</strong><p>用户真正缺少的不是更多信息，而是能够把信息转化为行动判断的结构。</p></div></div></section>

    <section className="link-section link-direction-section"><div className="shell"><SectionTitle label="产品方向" english="Product Direction" title="为什么不能继续做一个更大的信息平台" /><div className="link-direction-reframe"><div className="link-direction-top"><article className="link-direction-panel"><div className="link-direction-heading"><IconBadge icon={FileText} /><p className="link-mini-label">早期方向 <span>Early Direction</span></p></div><h3>集中更多信息和经验</h3><p>通过聚合官方内容、个人经验和社区建议，降低搜索成本。</p></article><div className="link-direction-problems"><article><div><IconBadge icon={Puzzle} accent /><span>Problem 01</span></div><h3>信息集中 ≠ 判断更容易</h3><p>用户仍需自己完成：筛选哪些内容与当前情况有关 → 拼接流程顺序 → 判断经验是否适用 → 决定下一步行动。</p></article><article><div><IconBadge icon={Search} accent /><span>Problem 02</span></div><h3>信息检索本身不足以形成产品价值</h3><p>普通的信息检索本身已经可以被搜索和 AI 高效完成。真正值得设计介入的，是帮助用户理解具体情境、规则和行动路径。</p><small className="link-ai-evidence">真实反馈　“如果只是信息检索，AI 已经可以更高效地完成。”</small></article></div></div><article className="link-direction-panel is-final"><div className="link-direction-heading"><IconBadge icon={Compass} /><p className="link-mini-label">最终方向 <span>Final Direction</span></p></div><h3>围绕具体情境组织规则、准备事项、步骤和下一步行动</h3><p>Link-Lab 从宽泛的信息平台收缩为情境导航系统。</p></article></div></div></section>

    <section className="link-section link-cool"><div className="shell"><div className="link-logic-intro"><SectionTitle label="产品结构" english="Research to Product" title="把研究发现转化为一套可执行的信息逻辑" /><p>确定方向以后，产品不再按照“医疗 / 租房 / 教育 / 公共服务”等知识分类简单堆叠内容，而是围绕用户当前正在经历的具体情境组织信息。</p></div><div className="link-logic-table"><header><span>研究发现</span><span>设计策略</span><span>产品体现</span></header>{mapping.map(([research,strategy,product,Icon],i) => <div className="link-logic-row" key={research}><div><IconBadge icon={Icon} accent={i === 1} /><span>{research}</span></div><div><ArrowRight /><span>{strategy}</span></div><div><ArrowRight /><span>{product}</span></div></div>)}</div><div className="link-flow">{[[UserRound,'进入具体情境'],[CircleAlert,'理解当前情况'],[CheckSquare2,'做好准备'],[ListFilter,'跟随路径'],[Flag,'持续行动']].map(([Icon,text],i) => <div key={String(text)}><IconBadge icon={Icon as IconType} accent={i === 1} /><span>{String(text)}</span>{i < 4 && <ArrowRight className="link-flow-arrow" />}</div>)}</div></div></section>

    <section className="link-section link-experience"><div className="shell"><SectionTitle label="核心体验" english="Core Experience" title="用具体情境把用户从“遇到问题”带到“知道下一步”" /><div className="link-experience-cards"><article className="link-experience-card"><div className="link-experience-copy"><span className="link-scenario">第一次租房</span><h3>找到与自己相关的情境</h3><p>用户不需要先理解制度分类，而是可以从“第一次租房”“寻找家庭医生”等具体生活问题进入。</p><p>首页和探索页会同时呈现推荐情境、分类入口和真实经验，帮助用户更快判断哪些内容与自己有关。</p></div><div className="link-experience-stage is-pair"><DeviceMockup file="linklab-home.png" alt="Link-Lab Home 完整界面" /><DeviceMockup file="linklab-explore.png" alt="Link-Lab Explore 完整界面" /></div></article><article className="link-experience-card is-reverse"><div className="link-experience-stage"><DeviceMockup file="linklab-situation-detail.png" alt="Link-Lab Situation Detail 完整界面" /></div><div className="link-experience-copy"><span className="link-scenario">第一次租房</span><h3>建立整体理解</h3><p>情境详情先说明当前场景、预计时间和主要流程，让用户在行动之前先理解这件事大概如何发生。</p><p>标签、难度和适用人群等信息，也帮助用户快速判断这条路径是否适合自己。</p></div></article><article className="link-experience-card"><div className="link-experience-copy"><span className="link-scenario">跟随路径</span><h3>把流程转化为可持续执行的行动</h3><p>当任务无法一次完成时，用户可以把情境加入“我的路径”，按步骤查看当前进度、所需材料和下一步行动，减少中断后的重新搜索成本。</p></div><div className="link-experience-stage"><DeviceMockup file="linklab-my-path-main.png" alt="Link-Lab My Path 完整界面" /></div></article></div></div></section>

    <section className="link-section link-cool"><div className="shell"><SectionTitle label="迭代与判断" english="Iteration & Final Judgement" title="让导航更具体，而不是继续增加功能" /><div className="link-iteration"><header><div><IconBadge icon={MessageSquareText} /><span>Feedback / 反馈</span></div><ArrowRight /><div><IconBadge icon={SlidersHorizontal} accent /><span>Change / 调整</span></div></header>{iteration.map(([n,feedback,adjustment]) => <article key={n}><span className="link-iteration-no">{n}</span><p>{feedback}</p><ArrowRight className="link-iteration-arrow" /><p>{adjustment}</p></article>)}</div><p className="link-conclusion">Link-Lab 的迭代目标最终并不是让平台拥有更多功能，而是尽可能减少用户自己完成搜索、筛选、拼接和判断的负担。</p></div></section>
    <section className="link-section link-final-section"><div className="shell"><div className="link-final-interface"><header><p>最终界面 <span>· Final Interface</span></p><small>Primary Screens</small></header><div className="link-final-primary"><DeviceMockup file="linklab-home.png" alt="Link-Lab Home 完整界面" /><DeviceMockup file="linklab-explore.png" alt="Link-Lab Explore 完整界面" /><DeviceMockup file="linklab-situation-detail.png" alt="Link-Lab Situation Detail 完整界面" /><DeviceMockup file="linklab-my-path-main.png" alt="Link-Lab My Path 完整界面" /></div><small className="link-supporting-label">辅助界面 <span>· Supporting Screens</span></small><div className="link-final-supporting"><DeviceMockup file="linklab-role-selection.png" alt="Link-Lab Choose Your Role 完整界面" /><DeviceMockup file="linklab-create-post.png" alt="Link-Lab Create Post 完整界面" /><DeviceMockup file="linklab-my-path-history.png" alt="Link-Lab My Path History 完整界面" /><DeviceMockup file="linklab-profile.png" alt="Link-Lab Profile 完整界面" /></div></div></div></section>
  </main><SiteFooter /></>;
}
