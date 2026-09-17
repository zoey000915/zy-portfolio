import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { SosVideoPlayer } from '@/components/sos-video-player';
import { ThreeModesCarousel } from '@/components/three-modes-carousel';
import { SosReveal } from './sos-reveal';
import './step-of-strength.css';

const asset = '/assets/step-of-strength/';

const modes = [
  { number: '01', title: '被动·Passive', subtitle: '通过空间感受舞者面临的负面压力', src: 'mode-passive-v2.mp4' },
  { number: '02', title: '单人·Individual', subtitle: '一个动作开始改变环境', src: 'mode-individual-v2.mp4' },
  { number: '03', title: '多人·collective', subtitle: '个体行为累积成集体变化', src: 'mode-collective-v2.mp4' },
];

const principles = [
  ['01', '身体参与', '不是阅读一段说明，而是通过“踩下去”完成回应'],
  ['02', '即时反馈', '文字、灯光和声音立即变化，让动作的影响可见'],
  ['03', '集体累积', '个人的微小行为会叠加成整个空间的变化'],
];

export default function StepOfStrengthPage() {
  return <><SiteHeader /><main className="sos-case"><SosReveal />
    <section className="sos-hero" data-sos-reveal><div className="shell sos-hero-grid"><div className="sos-hero-copy"><p className="sos-eyebrow">INTERACTIVE PROJECTION EXPERIENCE</p><h1>Step of Strength</h1><p className="sos-kicker">—— 基于步行参与的互动投影体验·装置展示</p><figure className="sos-hero-media"><img src={`${asset}hero-dancers-alley.png`} alt="Dancers Alley 场地与舞者" /></figure><p>Step of Strength 将 悉尼ICC两座剧院之间的室内连桥转化为一段可参与的互动空间，让经过的人通过踩踏地面投影，把负面文字逐步转化为支持性的内容，在行走中建立对舞者处境的理解。</p><p>Step of Strength 将 悉尼ICC两座剧院之间的室内连桥转化为一段可参与的互动空间，让经过的人通过踩踏地面投影，把负面文字逐步转化为支持性的内容，在行走中建立对舞者处境的理解。</p><ul className="sos-skill-tags"><li>互动体验</li><li>视觉叙事</li><li>影像制作</li><li>3D & AI</li></ul></div></div></section>

    <section className="sos-section sos-final-film"><div className="shell"><header className="sos-heading"><p>最终作品 · <span>FINAL FILM</span></p><h2>用影像完整呈现互动体验</h2><div>通过地面投影、声音与灯光反馈，将普通的步行动作转化为从“看到负面内容”到“主动介入并改变环境”的参与过程。</div></header><SosVideoPlayer src={`${asset}final-film.mp4`} label="Step of Strength final film" className="sos-film" controlPosition="left" preloadAfterPageLoad /></div></section>

    <section className="sos-section sos-modes"><div className="shell"><header className="sos-heading"><p>体验状态 · <span>THREE MODES</span></p><h2>从被动感知到群体参与</h2></header><ThreeModesCarousel modes={modes} asset={asset} /></div></section>

    <section className="sos-section sos-logic"><div className="shell"><header className="sos-heading"><p>体验机制 · <span>EXPERIENCE LOGIC</span></p><h2>让“经过”本身成为一种回应</h2><div>前期观察显示，舞者与普通行人并不是完全分离的两类人，他们持续共享同一条公共动线。问题更多来自彼此缺少理解，以及舞者在公开练习时容易受到围观、干扰和评价。</div><div>研究因此将重点从“保护一个独立的舞蹈区域”转向：如何让经过这里的人以低门槛的方式理解并回应舞者的处境。</div></header><div className="sos-principles">{principles.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="sos-section sos-making"><div className="shell"><header className="sos-heading"><p>制作与表达 · <span>PRODUCTION PROCESS</span></p><h2>从互动逻辑到最终影像</h2></header><div className="sos-production-flow"><article><span>01</span><h3>影像结构</h3><p>根据 Passive、Individual 和 Collective 三种互动状态组织视频节奏，把项目背景、体验机制和最终变化串成一条清晰观看路径。</p></article><i aria-hidden="true">→</i><article><span>02</span><h3>视觉制作</h3><p>根据展示需要制作部分三维场景与视觉素材，并结合网络素材和 AI 生成内容补充难以直接拍摄的演示画面。</p></article><i aria-hidden="true">→</i><article><span>03</span><h3>后期整合</h3><p>在剪映中整合实拍、投影、三维和 AI 素材，并完成英文配音、字幕、节奏调整与最终输出。</p></article></div><figure className="sos-timeline"><img src={`${asset}making-timeline.png`} alt="最终视频剪辑的多轨时间线" /><figcaption>最终视频的多轨内容组织</figcaption></figure><p className="sos-making-summary">制作过程围绕“如何让观众快速理解体验如何发生”展开，从互动逻辑、视觉素材到最终影像保持同一叙事主线。</p></div></section>
  </main><SiteFooter /></>;
}

