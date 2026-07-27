import Link from "next/link";
import { ArrowButton, Footer, Header, Eyebrow } from "./components/site-shell";
import { LayoutTextFlip } from "./components/layout-text-flip";
import { ContactFlowingMenu, HeroCircularText, HeroPlasma, InsightsHeroParallax, InsightsVelocityBand, LightSectionGrid, NexoraLogoLoop, ProjectsCardSwap, ServicesGallery, ServicesScrollStack, SpecularLink, TeamHoverMembers } from "./components/nexora-interactions";
import { services } from "./data";

const serviceLinks = services;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="nx-hero" id="top">
          <div className="nx-hero-bg" aria-hidden="true"><HeroPlasma /></div>
          <div className="nx-hero-wash" aria-hidden="true" />
          <div className="container nx-hero-inner">
            <div className="nx-hero-copy">
              <Eyebrow light>Nexora Digital Marketing Inc.</Eyebrow>
              <h1>Digital systems built with strategy before design.</h1>
              <p>We help businesses plan, design, build, and improve a clearer digital presence across web, search, growth, brand, and product.</p>
              <div className="nx-actions">
                <SpecularLink href="/start-project" size="lg">Start a project</SpecularLink>
                <Link className="nx-text-link" href="#services">Explore services <span>↘</span></Link>
              </div>
              <div className="nx-proof"><span>Vancouver-based</span><span>Strategy-first</span><span>Built to improve</span></div>
            </div>
            <div className="nx-hero-circular" aria-hidden="true"><HeroCircularText /></div>
          </div>
          <a className="nx-scroll" href="#services" aria-label="Scroll to services">Scroll to explore <span>↓</span></a>
        </section>

        <div className="nx-home-light-sections"><LightSectionGrid />
        <section className="nx-about" id="about">
          <div className="container nx-about-intro">
            <div className="nx-about-copy">
              <Eyebrow>About Nexora Digital Marketing Inc.</Eyebrow>
              <h2><LayoutTextFlip text="Strategic digital" words={["growth partners.", "systems.", "direction."]} /></h2>
              <p>Nexora helps businesses build powerful digital foundations. From high-performance websites to data-driven marketing campaigns, we focus on strategies that increase visibility, attract qualified leads, and turn attention into measurable growth.</p>
              <p>Our team blends creativity with analytics. We design user-focused websites, implement advanced SEO strategies, and build brand identities that stand out in competitive markets. Every solution is crafted to support long-term scalability and sustainable success.</p>
              <div className="nx-about-actions"><ArrowButton href="/start-project">Get a free consultation</ArrowButton><Link className="nx-text-link" href="#services">Explore our services <span>↘</span></Link></div>
            </div>
            <div className="nx-about-visual"><img src="/images/insights/brand-system.png" alt="Nexora brand system visual" /><div><strong>01</strong><span>Clear direction<br />measurable growth</span></div></div>
          </div>
          <div className="container nx-about-pillars">
            {["Strategic Planning", "Conversion Focused", "Search Visibility", "Creative Branding", "Performance Tracking", "Scalable Solutions"].map((title, index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{["Every campaign begins with research-driven insights and measurable growth objectives.", "We build websites that guide visitors toward meaningful action and higher conversions.", "Our SEO strategies increase rankings, traffic quality, and long-term online authority.", "Distinct brand identities that communicate value and build emotional connection.", "Clear reporting dashboards measure ROI and reveal optimization opportunities.", "Digital systems designed to grow with your business and evolving goals."][index]}</p></article>)}
          </div>
          <div className="container nx-about-why"><div><Eyebrow>Why businesses choose Nexora</Eyebrow><h3>Technical precision, creative thinking, and performance expertise.</h3></div><div className="nx-about-why-grid"><article><strong>Proven Expertise</strong><p>Multi-industry experience delivering measurable and scalable digital growth solutions.</p></article><article><strong>Data-Driven Decisions</strong><p>Every strategic decision is supported by analytics, research insights, and performance tracking.</p></article><article><strong>Client-First Approach</strong><p>Clear communication, proactive support, and transparency through every project phase.</p></article></div></div>
        </section>
        <section className="nx-logo-loop-band" aria-label="Nexora capabilities">
          <div className="container nx-logo-loop-meta"><Eyebrow light>One connected system</Eyebrow><span>Strategy · design · growth · product</span></div>
          <div className="nx-logo-loop-shell"><NexoraLogoLoop /></div>
        </section>

        <section className="nx-services" id="services">
          <div className="container nx-section-head">
            <div><Eyebrow>What we build</Eyebrow><h2><LayoutTextFlip text="One system." words={["Six ways to move forward.", "A clearer next move.", "Built to improve."]} /></h2></div>
            <p>Explore the service paths that help your business become clearer, more visible, and easier to grow.</p>
          </div>
          <div className="container nx-gallery-frame"><ServicesGallery /></div>
          <div className="container nx-service-stack"><ServicesScrollStack items={serviceLinks.map((service, index) => ({ number: `0${index + 1}`, title: service.category, description: service.description, href: `/services/${service.slug}` }))} /></div>
        </section>

        <section className="nx-projects" id="work">
          <div className="container nx-projects-grid">
            <div className="nx-projects-copy"><Eyebrow>Selected directions</Eyebrow><h2><LayoutTextFlip text="Projects built around" words={["the next clear move.", "measurable growth.", "useful systems."]} /></h2><p>Concept work showing how Nexora connects strategy, design, growth, and product into one useful system.</p><Link className="nx-text-link" href="/start-project">Start a conversation <span>↗</span></Link></div>
            <ProjectsCardSwap />
          </div>
        </section>

        <section className="nx-team" id="team">
          <div className="container"><TeamHoverMembers /></div>
        </section>

        <section className="nx-insights nx-insights-parallax-section" id="insights">
          <InsightsHeroParallax />
          <div className="container nx-insights-footer"><Link className="nx-text-link nx-text-link-light" href="/insights">Explore all insights <span>↗</span></Link></div>
        </section>

        <InsightsVelocityBand />

        <section className="nx-contact" id="contact">
          <div className="container nx-contact-head">
            <div><Eyebrow light>Start the conversation</Eyebrow><h2><LayoutTextFlip text="Tell us what you are trying to" words={["make clearer.", "move forward.", "build next."]} /></h2></div>
            <div><p>You do not need a perfect brief. Share the business context, the decision in front of you, or the part of your digital system that is not working yet.</p><div className="nx-contact-details"><a href="mailto:info@nexoradm.ca">info@nexoradm.ca</a><span>1967-1959 Marine Dr. · North Vancouver, BC</span></div></div>
          </div>
          <div className="container nx-flow-frame"><ContactFlowingMenu /></div>
        </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
