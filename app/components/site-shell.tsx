"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "../data";

export function Brand({ light = false }: { light?: boolean }) {
  return <span className={`brand ${light ? "brand-light" : ""}`}><span className="brand-mark" aria-hidden="true"><span /></span><span>Nexora</span></span>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" aria-label="Nexora home" onClick={() => setOpen(false)}><Brand /></Link>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <div className="nav-services">
            <button type="button" className="nav-link nav-services-button">Services <span>+</span></button>
            <div className="services-menu">
              {services.slice(0, 6).map((service) => <Link key={service.slug} href={`/services/${service.slug}`} onClick={() => setOpen(false)}><span className="menu-code">{service.code}</span><span><strong>{service.category}</strong><small>{service.title.replace(".", "").slice(0, 42)}…</small></span></Link>)}
            </div>
          </div>
          <Link className="nav-link" href="/insights" onClick={() => setOpen(false)}>Insights</Link>
          <Link className="nav-link" href="/#work" onClick={() => setOpen(false)}>Selected work</Link>
          <Link className="nav-cta" href="/start-project" onClick={() => setOpen(false)}>Start a project <span>↗</span></Link>
        </nav>
        <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
    </header>
  );
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div className="footer-intro"><Link href="/"><Brand light /></Link><p>Nexora helps businesses build clearer, more strategic digital systems.</p><Link className="footer-email" href="mailto:hello@nexoradm.ca">hello@nexoradm.ca <span>↗</span></Link></div>
    <div><h3>Services</h3>{services.slice(0, 6).map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.category}</Link>)}</div>
    <div><h3>Decisions</h3><Link href="/services/business-consultation">Business Consultation</Link><Link href="/services/application-development">Application Development</Link><Link href="/services/digital-strategy">Digital Strategy</Link><Link href="/insights">Insights</Link></div>
    <div><h3>Start here</h3><p>Not sure what to do next? Begin with a clear conversation about the business, the priority, and the next move.</p><Link className="footer-action" href="/start-project">Start a project <span>↗</span></Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Nexora Digital Marketing Inc.</span><span>Vancouver, BC · Digital systems with strategy before design.</span></div></footer>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <><Header />{children}<Footer /></>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? "eyebrow-light" : ""}`}><i />{children}</span>;
}

export function ArrowButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link className={`button ${secondary ? "button-secondary" : ""}`} href={href}>{children}<span className="button-arrow">↗</span></Link>;
}
