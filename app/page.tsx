"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  certificates,
  moonspark,
  natura,
  profile,
  skills,
  tools,
  traits,
  unilever,
} from "../content/portfolio";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  label?: string;
};

const navItems = [
  ["Giới thiệu", "about"],
  ["Năng lực", "skills"],
  ["Dự án", "projects"],
  ["Chứng chỉ", "certificates"],
  ["Liên hệ", "contact"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({ number, eyebrow, title, intro }: { number: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="section-heading reveal">
      <div className="section-kicker"><span>{number}</span>{eyebrow}</div>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
  );
}

function Gallery({ images, accent }: { images: GalleryImage[]; accent: string }) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", close);
      document.body.classList.remove("modal-open");
    };
  }, [selected]);

  return (
    <>
      <div className={`gallery gallery-${accent}`}>
        {images.map((item, index) => (
          <button className={`gallery-item reveal delay-${Math.min(index + 1, 4)}`} key={item.src} onClick={() => setSelected(item)} aria-label={`Xem ảnh lớn: ${item.alt}`}>
            <div className="gallery-image">
              <Image src={item.src} alt={item.alt} fill unoptimized sizes="(max-width: 720px) 100vw, 50vw" />
            </div>
            <div className="gallery-copy">
              {item.label && <span className="evidence-label">{item.label}</span>}
              <p>{item.caption}</p>
              <span className="view-link">Xem ảnh lớn <Arrow /></span>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.alt} onMouseDown={(event) => event.currentTarget === event.target && setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Đóng ảnh">×</button>
          <div className="lightbox-card">
            <Image src={selected.src} alt={selected.alt} width={1400} height={1000} unoptimized />
            <p>{selected.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const moveGlow = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", moveGlow, { passive: true });
    return () => window.removeEventListener("pointermove", moveGlow);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb ambient-orb-a" />
        <span className="ambient-orb ambient-orb-b" />
        <span className="ambient-orb ambient-orb-c" />
      </div>
      <div className="pointer-glow" aria-hidden="true" />
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Về đầu trang"><span>PT</span>THUY PHAM</a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Điều hướng chính">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cv" href={profile.cv} target="_blank" rel="noreferrer">Tải CV ↓</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Mở menu"><span /><span /></button>
      </header>

      <main id="top">
        <section className="hero shell">
          <div className="hero-copy reveal is-visible">
            <p className="hero-kicker">MARKETING PORTFOLIO</p>
              <h1 className="hero-name">
                Phạm Thị Thùy
              </h1>
              <p className="hero-role">
                Marketing Intern
              </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Xem dự án <span>↓</span></a>
              <a className="button button-secondary" href={profile.cv} target="_blank" rel="noreferrer">Tải CV <Arrow /></a>
            </div>
            <div className="hero-facts">{profile.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
          </div>
          <div className="hero-visual reveal is-visible">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="portrait-card portrait-photo-card">
              <Image
                src="/portrait.jpg"
                alt="Ảnh chân dung Phạm Thị Thùy"
                fill
                priority
                unoptimized
                sizes="(max-width: 920px) 70vw, 420px"
              />
            </div>
            <div className="floating-proof proof-one"><Image src="/images/moonspark/top-content.webp" alt="Minh chứng dự án MoonSpark" fill unoptimized sizes="260px" /></div>
            <div className="floating-proof proof-two"><Image src="/images/natura/homepage-lighthouse.webp" alt="Minh chứng dự án Natura" fill unoptimized sizes="230px" /></div>
            <div className="hero-note">Tỉ mỉ trong triển khai<br /><strong>Có căn cứ khi đánh giá</strong></div>
          </div>
          <a className="scroll-cue" href="#about">Cuộn để khám phá <span>↓</span></a>
        </section>

        <div className="marquee" aria-label="Năng lực nổi bật">
          <div className="marquee-track">
            {["CUSTOMER INSIGHT", "CAMPAIGN EXECUTION", "CONTENT MARKETING", "DIGITAL EXPERIENCE", "PERFORMANCE ANALYSIS", "CUSTOMER INSIGHT", "CAMPAIGN EXECUTION", "CONTENT MARKETING", "DIGITAL EXPERIENCE", "PERFORMANCE ANALYSIS"].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✦</b></span>)}
          </div>
        </div>

        <section id="about" className="section section-about">
          <div className="shell">
            <SectionHeading number="01" eyebrow="GIỚI THIỆU" title="Xin chào, tôi là Thùy" />
            <div className="about-layout">
              <div className="about-story reveal">
                {profile.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="trait-grid">
                {traits.map((trait, index) => <article className={`trait-card reveal delay-${index + 1}`} key={trait.title}><span>0{index + 1}</span><h3>{trait.title}</h3><p>{trait.text}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-skills">
          <div className="shell">
            <SectionHeading number="02" eyebrow="NĂNG LỰC" title="Những năng lực tôi đã vận dụng trong dự án" intro="Không phải danh sách tự chấm điểm, mà là những đầu việc đã có sản phẩm và minh chứng cụ thể." />
            <div className="skill-grid">
              {skills.map((skill, index) => <article className={`skill-card reveal delay-${index + 1}`} key={skill.title}><span>{skill.index}</span><h3>{skill.title}</h3><ul>{skill.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
            </div>
            <div className="tool-row reveal"><span className="tool-label">Công cụ đã sử dụng</span>{tools.map((tool) => <span className="tool-chip" key={tool}>{tool}</span>)}</div>
          </div>
        </section>

        <section id="projects" className="section section-projects">
          <div className="shell">
            <SectionHeading number="03" eyebrow="DỰ ÁN" title="Những dự án thể hiện rõ nhất cách tôi làm việc" />
            <div className="project-index">
              <a href="#moonspark" className="project-preview preview-moonspark reveal"><span className="project-number">01</span><div><small>CASE STUDY CHÍNH</small><h3>MoonSpark</h3><p>Customer insight · Facebook execution · Performance analysis</p></div><span className="project-arrow">↘</span></a>
              <a href="#natura" className="project-preview preview-natura reveal delay-1"><span className="project-number">02</span><div><small>CASE STUDY CHÍNH</small><h3>Natura</h3><p>Team leadership · Website experience · E-commerce</p></div><span className="project-arrow">↘</span></a>
              <a href="#unilever" className="project-preview preview-unilever reveal delay-2"><span className="project-number">03</span><div><small>DỰ ÁN BỔ TRỢ</small><h3>Unilever</h3><p>Customer analysis · Retention strategy</p></div><span className="project-arrow">↘</span></a>
            </div>
          </div>
        </section>

        <section id="moonspark" className="case-study case-moonspark">
          <div className="shell">
            <div className="case-header reveal"><div><span>CASE STUDY 01</span><h2>{moonspark.title}</h2><p>{moonspark.subtitle}</p></div><div className="case-meta"><span>{moonspark.period}</span><span>{moonspark.scope}</span></div></div>
            <div className="case-intro-grid">
              <div className="case-context reveal"><span className="mini-title">BỐI CẢNH</span><p>{moonspark.context}</p><div className="campaign-pills"><span>Moonlight Moments</span><span>She Glows</span></div><small>Ý tưởng và hoạt động đa kênh là kết quả phối hợp của toàn nhóm.</small></div>
              <div className="role-card reveal delay-1"><span className="mini-title">PHẦN TÔI PHỤ TRÁCH</span><h3>{moonspark.role}</h3><ul>{moonspark.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <div className="subsection-heading reveal"><span>MINH CHỨNG</span><h3>Sản phẩm và kết quả có thể kiểm chứng</h3></div>
            <Gallery images={moonspark.images} accent="moon" />
            <div className="subsection-heading reveal"><span>KẾT QUẢ FACEBOOK</span><h3>Tăng độ phủ và xây dựng tệp theo dõi ban đầu</h3></div>
            <div className="metric-grid">{moonspark.metrics.map((metric, index) => <article className={`metric-card reveal delay-${Math.min(index + 1, 4)}`} key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span>{metric.delta && <small>{metric.delta}</small>}</article>)}</div>
            <p className="scope-note reveal"><strong>Lưu ý phạm vi:</strong> Đây là kết quả chung của kênh Facebook trong chiến dịch nhóm. Tôi phụ trách tham gia triển khai, tổng hợp và phân tích phần này.</p>
            <div className="subsection-heading reveal"><span>INSIGHT → HÀNH ĐỘNG</span><h3>Điều dữ liệu đã thay đổi trong cách tôi nhìn chiến dịch</h3></div>
            <div className="insight-grid">{moonspark.insights.map((insight, index) => <article className={`insight-card reveal delay-${index + 1}`} key={insight.title}><span>0{index + 1}</span><h4>{insight.title}</h4><p>{insight.text}</p><div><strong>Đề xuất</strong>{insight.action}</div></article>)}</div>
          </div>
        </section>

        <section id="natura" className="case-study case-natura">
          <div className="shell">
            <div className="case-header reveal"><div><span>CASE STUDY 02</span><h2>{natura.title}</h2><p>{natura.subtitle}</p></div><div className="case-meta"><span>{natura.period}</span><span>{natura.scope}</span></div></div>
            <div className="case-intro-grid">
              <div className="case-context reveal"><span className="mini-title">BỐI CẢNH</span><p>{natura.context}</p><div className="campaign-pills"><span>20 SKU</span><span>WordPress</span><span>WooCommerce</span></div></div>
              <div className="role-card reveal delay-1"><span className="mini-title">TRƯỞNG NHÓM · 6 THÀNH VIÊN</span><h3>{natura.role}</h3><ul>{natura.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <div className="subsection-heading reveal"><span>SẢN PHẨM</span><h3>Các điểm chạm trong hành trình mua sắm</h3></div>
            <Gallery images={natura.images} accent="natura" />
            <div className="natura-result-layout">
              <div><div className="subsection-heading reveal"><span>KẾT QUẢ CHUNG</span><h3>Từ ý tưởng đến một website có thể trải nghiệm</h3></div><div className="metric-grid metric-grid-four">{natura.metrics.map((metric, index) => <article className={`metric-card reveal delay-${index + 1}`} key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}</div><p className="scope-note reveal"><strong>Lưu ý phạm vi:</strong> Đây là kết quả chung của nhóm. Tôi trực tiếp phụ trách điều phối dự án và các phần giao diện, ưu đãi, trang dịch vụ, chatbot và so sánh sản phẩm.</p></div>
              <div className="process-list"><div className="subsection-heading reveal"><span>CÁCH TÔI ĐIỀU PHỐI</span><h3>Giữ nhiều đầu việc thành một trải nghiệm thống nhất</h3></div>{natura.process.map((step, index) => <article className={`process-item reveal delay-${Math.min(index + 1, 4)}`} key={step.title}><span>0{index + 1}</span><div><h4>{step.title}</h4><p>{step.text}</p></div></article>)}</div>
            </div>
          </div>
        </section>

        <section id="unilever" className="section section-unilever">
          <div className="shell">
            <div className="supporting-label reveal">DỰ ÁN BỔ TRỢ · CUSTOMER ANALYSIS</div>
            <div className="unilever-grid">
              <div className="unilever-copy reveal"><h2>{unilever.title}</h2><h3>{unilever.subtitle}</h3><p className="unilever-role">{unilever.role}</p><ul>{unilever.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul><blockquote>{unilever.insight}</blockquote><p className="scope-note"><strong>Minh bạch phạm vi:</strong> {unilever.note}</p></div>
              <div className="unilever-images">{unilever.images.map((item, index) => <figure className={`reveal delay-${index + 1}`} key={item.src}><Image src={item.src} alt={item.alt} width={1200} height={675} unoptimized /><figcaption>{item.caption}</figcaption></figure>)}</div>
            </div>
          </div>
        </section>

        <section id="certificates" className="section section-certificates">
          <div className="shell">
            <SectionHeading number="04" eyebrow="CHỨNG CHỈ" title="Nền tảng kiến thức tôi đã chủ động bổ sung" />
            <div className="certificate-grid">{certificates.map((certificate, index) => <a className={`certificate-card reveal delay-${index + 1}`} key={certificate.title} href={certificate.url} target="_blank" rel="noreferrer"><div><span>{certificate.issuer}</span><h3>{certificate.title}</h3></div><footer><small>{certificate.year}</small><span>Xem chứng chỉ <Arrow /></span></footer></a>)}</div>
          </div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="shell contact-card reveal">
            <span className="contact-kicker">05 · LIÊN HỆ</span>
            <h2>Hãy cùng tạo nên những chiến dịch chỉn chu và có căn cứ.</h2>
            <p>Tôi mong muốn được phát triển trong một đội ngũ Marketing có quy trình rõ ràng, nơi tôi có thể tham gia triển khai chiến dịch, phát huy sự cẩn thận và khả năng cảm nhận hình ảnh, đồng thời tiếp tục học hỏi từ dữ liệu và trải nghiệm thực tế.</p>
            <div className="contact-actions"><a className="button button-light" href={`mailto:${profile.email}`}>Gửi email <Arrow /></a><a className="button button-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">Xem LinkedIn <Arrow /></a></div>
            <div className="contact-details"><span>{profile.email}</span><span>{profile.phone}</span><span>TP. Hồ Chí Minh</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer shell"><div><strong>Phạm Thị Thùy</strong><span>Marketing Portfolio · 2026</span></div><p>Designed with care and attention to detail.</p><a href="#top">Về đầu trang ↑</a></footer>
    </>
  );
}
