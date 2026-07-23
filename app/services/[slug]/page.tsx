import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowButton, Eyebrow, SiteShell } from "../../components/site-shell";
import { serviceBySlug, services, type Service } from "../../data";

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = serviceBySlug[params.slug];
  return service ? { title: service.category, description: service.description } : {};
}

function ServiceVisual({ service }: { service: Service }) {
  return <div className="service-visual"><div className="service-visual-glow" /><div className="service-visual-header"><span>nexora / {service.code.toLowerCase()}</span><i>● ● ●</i></div><div className="service-visual-main"><div className="service-visual-core">{service.code}</div><div className="service-visual-ring ring-one" /><div className="service-visual-ring ring-two" /><div className="service-visual-label label-top">{service.quick[0].label}</div><div className="service-visual-label label-right">{service.quick[2].label}</div><div className="service-visual-label label-bottom">{service.quick[4].label}</div></div><div className="service-visual-footer"><span>system status</span><strong><i /> aligned for next action</strong></div></div>;
}

function QuickView({ service }: { service: Service }) {
  return <section className="section section-light" id="quick-view"><div className="container"><div className="section-heading split-heading"><div><Eyebrow>Quick view</Eyebrow><h2>{service.category} works best when the pieces connect.</h2></div><p>{service.quickIntro}</p></div><div className="quick-grid">{service.quick.map((item, index) => <a href={`#${item.anchor}`} key={item.label} className="quick-card"><span className="quick-number">0{index + 1}</span><div><h3>{item.label}</h3><p>{item.detail}</p></div><span className="quick-arrow">↘</span></a>)}</div></div></section>;
}

function ProblemSection({ service }: { service: Service }) {
  return <section className="section problem-section" id="solves"><div className="container"><div className="section-heading"><Eyebrow light>What this solves</Eyebrow><h2>{service.problemTitle}</h2></div><div className="problem-grid">{service.problems.map((item, index) => <article className="problem-card" key={item.title}><span className="problem-number">0{index + 1}</span><h3>{item.title}</h3><div className="problem-row"><span>Problem</span><p>{item.problem}</p></div><div className="problem-row"><span>Nexora solution</span><p>{item.solution}</p></div><div className="problem-outcome"><span>Outcome</span><strong>{item.outcome}</strong></div></article>)}</div></div></section>;
}

function IncludedSection({ service }: { service: Service }) {
  return <section className="section section-light" id="included"><div className="container"><div className="section-heading split-heading"><div><Eyebrow>What we deliver</Eyebrow><h2>{service.includedTitle}</h2></div><p>{service.includedIntro}</p></div><div className="deliver-grid">{service.deliverables.map((item, index) => <article className="deliver-card" key={item.title}><span className="deliver-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div></div></section>;
}

function ProcessSection({ service }: { service: Service }) {
  return <section className="section process-section" id="process"><div className="container"><div className="process-layout"><div className="process-intro"><Eyebrow light>How it works</Eyebrow><h2>{service.processTitle}</h2><p>{service.processIntro}</p><div className="process-stat"><strong>01 → 05</strong><span>One clear system from first decision to next improvement.</span></div></div><div className="process-list">{service.process.map((item, index) => <article className="process-step" key={item.title}><div className="process-index">0{index + 1}</div><div><h3>{item.title}</h3><p>{item.detail}</p><div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></div></div></section>;
}

function OutcomesSection({ service }: { service: Service }) {
  return <section className="section outcomes-section" id="outcomes"><div className="container"><div className="section-heading"><Eyebrow light>Why Nexora</Eyebrow><h2>{service.outcomesTitle}</h2></div><div className="outcome-grid">{service.outcomes.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div></div></section>;
}

function FAQSection({ service }: { service: Service }) {
  return <section className="section section-light" id="faq"><div className="container faq-layout"><div><Eyebrow>Questions</Eyebrow><h2>Before you start.</h2><p className="faq-intro">A few useful answers to help you decide whether this is the right next conversation.</p></div><div className="faq-list">{service.faq.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></div></section>;
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceBySlug[params.slug];
  if (!service) notFound();
  return <SiteShell><main>
    <section className="service-hero"><div className="container service-hero-grid"><div className="service-hero-copy"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{service.category}</span></div><Eyebrow light>{service.category}</Eyebrow><h1>{service.title}</h1><p className="hero-lead">{service.description}</p><div className="button-row"><ArrowButton href="/start-project">Start a project</ArrowButton><ArrowButton href="#quick-view" secondary>See what’s included</ArrowButton></div><div className="service-proof"><span>Clear scope</span><span>Connected direction</span><span>Built to improve</span></div></div><ServiceVisual service={service} /></div></section>
    <QuickView service={service} /><ProblemSection service={service} /><IncludedSection service={service} /><ProcessSection service={service} /><OutcomesSection service={service} /><FAQSection service={service} />
    <section className="section service-cta"><div className="container service-cta-panel"><div><Eyebrow light>Start a project</Eyebrow><h2>Ready to make your next move clearer?</h2><p>Tell us what you are trying to build, fix, improve, or decide. We’ll help shape the right next phase.</p></div><div className="service-cta-actions"><ArrowButton href="/start-project">Start the conversation</ArrowButton><Link href="/insights" className="quiet-link">Read Nexora insights <span>↗</span></Link></div></div></section>
  </main></SiteShell>;
}
