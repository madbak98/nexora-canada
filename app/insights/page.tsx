import type { Metadata } from "next";
import Link from "next/link";
import { ArrowButton, Eyebrow, SiteShell } from "../components/site-shell";
import { insights } from "../data";
import { NexoraFerrofluid } from "../components/nexora-ferrofluid";
import { LightSectionGrid } from "../components/nexora-interactions";

export const metadata: Metadata = { title: "Insights", description: "Practical digital thinking for clearer decisions before you build, spend, or scale." };

export default function InsightsPage() {
  return <SiteShell><main>
    <section className="insights-hero"><NexoraFerrofluid /><div className="container insights-hero-grid"><div><Eyebrow light>Insights / practical digital thinking</Eyebrow><h1>Clarity for the decisions behind the work.</h1><p className="hero-lead">Articles and guides for businesses trying to build a clearer digital presence, make better choices, and keep moving.</p></div><div className="insight-hero-art"><span>08</span><strong>Questions before execution.</strong><p>Structure the decision, then build the right thing.</p><div className="insight-hero-bars"><i /><i /><i /><i /></div></div></div></section>
    <section className="section section-light"><LightSectionGrid /><div className="container"><div className="section-heading split-heading"><div><Eyebrow>Browse the thinking</Eyebrow><h2>Useful perspective, without the agency fog.</h2></div><p>Start with the question closest to the decision in front of you. Each insight is designed to help you see the system behind the task.</p></div><div className="insights-list">{insights.map((item) => <Link href="/start-project" className="insight-row" key={item.title}><span className="insight-number">{item.accent}</span><span className="insight-row-copy"><span>{item.category} · {item.read}</span><h3>{item.title}</h3></span><span className="insight-arrow">↗</span></Link>)}</div></div></section>
    <section className="section insight-cta"><div className="container insight-cta-panel"><div><Eyebrow light>Turn insight into direction</Eyebrow><h2>Ready to make the digital plan clearer?</h2></div><ArrowButton href="/start-project">Start a project</ArrowButton></div></section>
  </main></SiteShell>;
}
