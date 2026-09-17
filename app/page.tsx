import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Download, MapPin } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { HomeReveal } from './home-reveal';

const skills = {
  '语言能力': ['雅思 6.5', '大学英语六级', '英语可作为学习及工作语言'],
  '专业技能': ['Figma', 'Photoshop', 'Illustrator', '剪映', 'SketchUp', 'CAD', 'Enscape', 'Lumion', 'Cinema 4D', 'Canva'],
  '其他技能': ['Excel', 'PowerPoint', 'Word', 'C1 机动车驾驶证'],
};

function SectionHeading({ title, english }: { title: string; english: string }) {
  return <header className="home-section-heading"><h2>{title}</h2><p>{english}</p></header>;
}

export default function Home() {
  return <><SiteHeader /><main><HomeReveal />
    <section className="home-identity shell"><div className="identity-copy"><p className="identity-eyebrow">UX / 交互设计 / 本地化</p><h1>Portfolio of Zhang Yi</h1><p className="identity-lead">悉尼大学交互设计硕士，具备海外学习背景，长期参与用户研究、数字产品与内容制作项目，具备英文沟通、信息整理与视觉表达能力</p><div className="identity-actions"><span className="location"><MapPin size={16} />杭州</span><a className="resume-button" href="/assets/zhang-yi-resume.pdf" download><Download size={16} />下载简历</a><Link className="contact-button" href="/#contact">联系我 <ArrowUpRight size={16} /></Link></div></div><figure className="identity-photo"><Image src="/assets/profile/zhang-yi-sydney.jpg" width={1080} height={1440} priority alt="章怡在悉尼歌剧院前" /></figure></section>

    <section id="about" className="about-section"><div className="shell"><SectionHeading title="关于我" english="About" /><div className="about-education-grid"><section className="about-profile"><div><p>硕士阶段长期参与用户研究、数字产品与内容制作，接触跨文化用户场景，并参与用户访谈、场景分析、竞品研究、交互原型和视觉内容制作。能够梳理复杂信息、识别表达与流程中的问题，并根据反馈持续调整和优化方案，重点关注如何将零散需求、复杂流程与信息重新组织为更清晰、易于理解和执行的体验。</p></div></section>
      <section className="education-block" aria-labelledby="education-title"><header><h3 id="education-title">教育背景 <span>Education</span></h3></header><div className="education-list"><article><div className="education-main"><h4>悉尼大学 <small>The University of Sydney</small></h4><p className="degree">交互设计与电子艺术｜硕士 <time>2025.02 – 2026.12</time></p><p className="courses"><strong>主修课程：</strong>体验设计工作室（87/100 · HD）　设计思维（81/100 · DI）　创意编程（80/100 · DI）　界面设计（79/100 · DI）</p></div></article><article><div className="education-main"><h4>浙大城市学院</h4><p className="degree">环境与设计｜本科 <time>2020.09 – 2024.06</time></p><p className="courses"><strong>主修课程：</strong>设计构成（92/100）　工程制图与测验（94/100）　室内设计（92/100）　模型技术与制作（90/100）</p></div><div className="awards"><p>获奖经历 <span>Awards</span></p><ul><li>2023 “建行裕农通杯”第六届浙江省乡村振兴大赛｜浙江省银奖</li><li>2023 米兰设计周中国高校设计学科师生优秀作品展｜浙江分赛区三等奖</li><li>2022 “广宇杯”大学生创新创业大赛“互联网+”｜三等奖</li><li>2020–2023 校三好学生及学业优秀奖学金</li></ul></div></article></div></section></div>
      <section className="skill-block"><header><h3>技能</h3><p>Skills</p></header><div className="skill-cards">{Object.entries(skills).map(([title, list]) => <article key={title}><h4>{title}</h4>{title === '专业技能' && <p>交互、平面、建模相关设计软件</p>}<div>{list.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></section>
    </div></section>

    <section id="work" className="works-section shell"><SectionHeading title="项目经历" english="Selected Works" /><div className="works-grid">
      <Link href="/work/link-lab" scroll={false} className="work-card work-linklab"><div className="work-card-copy"><p className="work-index">01 · MAIN CASE STUDY</p><h3>Link-Lab Hybrid Navigation System</h3><h4>面向澳洲新用户的情境导航平台</h4><p>围绕 newcomers 在租房、医疗和公共服务中的陌生流程，将隐性规则、准备事项和下一步行动重新组织为更清晰、可执行的情境导航。</p><div className="work-tags"><span>用户研究</span><span>内容与信息策略</span><span>UX/UI</span></div></div><div className="work-visual linklab-visual"><div className="linklab-phone linklab-phone-side"><div className="linklab-phone-screen"><Image src="/assets/linklab/linklab-home.png" width={440} height={956} alt="Link-Lab Home" /></div></div><div className="linklab-phone linklab-phone-main"><div className="linklab-phone-screen"><Image src="/assets/linklab/linklab-situation-detail.png" width={440} height={956} alt="Link-Lab Situation Detail" /></div></div><div className="linklab-phone linklab-phone-side"><div className="linklab-phone-screen"><Image src="/assets/linklab/linklab-my-path-main.png" width={440} height={956} alt="Link-Lab My Path" /></div></div></div></Link>
      <Link href="/work/luggease" scroll={false} className="work-card work-luggease"><div className="work-card-copy"><p className="work-index">02 · UX / SERVICE DESIGN</p><h3>LuggEase</h3><h4>面向家庭旅客的机场行李服务</h4><p>围绕家庭旅客同时照顾儿童、处理多件行李和完成机场移动的负担，将寄存、配送、状态追踪与二维码取件整合为连续的服务流程。</p><div className="work-tags"><span>用户研究</span><span>服务设计</span><span>产品逻辑</span><span>UX/UI</span></div></div><div className="work-visual luggease-visual"><Image src="/assets/luggease/luggease-composite.jpg" width={1920} height={1280} alt="LuggEase Tracking、Landing、Storage 与 QR Code 界面组合展示" /></div></Link>
      <Link href="/work/step-of-strength" scroll={false} className="work-card work-step"><div className="work-card-copy"><p className="work-index">03 · INTERACTIVE MEDIA / VIDEO</p><h3>Step of Strength</h3><h4>互动投影体验与影像展示</h4><p>通过地面投影、三种互动状态与影像叙事，将公共空间中的负面评价转化为可被参与和回应的体验，并通过最终视频完整呈现互动机制与空间变化。</p><div className="work-tags"><span>互动体验</span><span>视觉叙事</span><span>影像制作</span><span>3D & AI</span></div></div><div className="work-visual step-visual"><Image src="/assets/step-of-strength/step-card-dancers-alley-v3.jpg" width={376} height={249} alt="Step of Strength Dancers Alley 项目主视觉" /></div></Link>
    </div></section>
  </main><SiteFooter /></>;
}
