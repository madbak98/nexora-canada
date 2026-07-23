import Link from "next/link";
import { ArrowButton, Eyebrow, SiteShell } from "./components/site-shell";
import { KineticGallery } from "./components/kinetic-gallery";
import { insights, services } from "./data";

const pillars = [
  { title: "Strategic Planning", detail: "Every campaign begins with research-driven insights and measurable growth objectives.", icon: "01" },
  { title: "Conversion Focused", detail: "We build websites that guide visitors toward meaningful action and higher conversions.", icon: "02" },
  { title: "Search Visibility", detail: "SEO strategies that increase rankings, traffic quality, and long-term online authority.", icon: "03" },
  { title: "Creative Branding", detail: "Distinct brand identities that communicate value and build emotional connection.", icon: "04" },
  { title: "Performance Tracking", detail: "Clear reporting that measures ROI and reveals optimization opportunities.", icon: "05" },
  { title: "Scalable Solutions", detail: "Digital systems designed to grow with your business and evolving goals.", icon: "06" },
];

const strengths = [
  ["Proven Expertise", "Extensive multi-industry experience delivering measurable and scalable digital growth solutions."],
  ["Data-Driven Decisions", "Every strategic decision is supported by analytics, research insights, and performance tracking."],
  ["Client-First Approach", "Clear communication, proactive support, and transparency throughout every project phase."],
  ["Full-Service Team", "Designers, developers, and marketing specialists collaborate to deliver cohesive digital work."],
  ["Modern Technology", "Scalable, secure, and performance-optimized technologies for long-term growth."],
  ["Ongoing Support", "Continuous monitoring, optimization, and refinement for sustainable digital success."],
];

const testimonials = [
  ["Nexora transformed our online presence. Our traffic doubled and lead quality improved significantly within months.", "Emily Carter", "Marketing Director"],
  ["Their team truly understands growth strategy. Our new website converts far better than before.", "David Nguyen", "Founder"],
  ["Professional, responsive, and results focused. Working with Nexora gave us confidence in our digital direction.", "Sophia Martinez", "Operations Manager"],
];

const team = [
  ["MH", "Michael Harrison", "Founder & Managing Director", "Michael guides brands toward scalable digital growth and measurable success."],
  ["ST", "Sarah Thompson", "Creative Director", "Leads brand identity, visual storytelling, and creative campaigns."],
  ["DR", "Daniel Roberts", "Lead Web Developer", "Builds secure, scalable websites that support long-term business goals."],
  ["AP", "Ava Patel", "UX Designer", "Designs intuitive digital experiences that improve usability and conversion."],
  ["OC", "Olivia Chen", "SEO Strategist", "Develops technical and content SEO strategies to improve visibility."],
];

function HeroArt() {
  return <div className="agency-hero-art" aria-label="Abstract digital growth system"><div className="agency-art-grid" /><div className="agency-art-orbit orbit-one" /><div className="agency-art-orbit orbit-two" /><div className="agency-art-core">NX</div><div className="agency-art-card card-one"><span>strategy / 01</span><strong>Built around growth</strong><i /><i /></div><div className="agency-art-card card-two"><span>systems / 06</span><strong>Ready to scale</strong><b>+28.4%</b></div></div>;
}

export default function Home() {
  return <SiteShell><main>
    <section className="reference-hero"><div className="container reference-hero-grid"><div className="reference-hero-copy"><Eyebrow light>Hi! We are</Eyebrow><h1>Nexora <em>Digital</em><br />Marketing Inc.</h1><p className="hero-lead">Modern creative digital agency building powerful foundations for visibility, qualified leads, and measurable growth.</p><div className="button-row"><ArrowButton href="/start-project">Get started</ArrowButton><ArrowButton href="#about" secondary>Discover Nexora</ArrowButton></div><div className="reference-hero-note"><span>Web design</span><span>SEO</span><span>Branding</span><span>Performance</span></div></div><HeroArt /></div></section>
    <KineticGallery />

    <section className="reference-about section section-light" id="about"><div className="container about-grid"><div className="about-visual"><div className="about-visual-label">NEXORA / 2026</div><div className="about-visual-word">GROW<br /><em>SMARTER</em></div><div className="about-visual-orbit" /><span>strategy → systems → growth</span></div><div className="about-copy"><Eyebrow>About Nexora Digital Marketing Inc.</Eyebrow><h2>Strategic digital growth partners.</h2><p>We help businesses build powerful digital foundations. From high-performance websites to data-driven marketing campaigns, we focus on strategies that increase visibility, attract qualified leads, and turn attention into measurable growth.</p><p>Our team blends creativity with analytics. Every solution is crafted to support long-term scalability and sustainable success.</p><div className="about-actions"><ArrowButton href="/services/digital-strategy">See our approach</ArrowButton><Link className="text-link" href="/start-project">More about Nexora <span>↗</span></Link></div></div></div></section>

    <section className="reference-pillars section section-light"><div className="container"><div className="section-heading centered-heading"><Eyebrow>What drives the work</Eyebrow><h2>Digital growth with a clear reason behind it.</h2><p>We combine technical precision, creative thinking, and performance marketing expertise to deliver consistent, measurable results.</p></div><div className="pillar-grid">{pillars.map((pillar) => <article key={pillar.title}><span>{pillar.icon}</span><h3>{pillar.title}</h3><p>{pillar.detail}</p></article>)}</div></div></section>

    <section className="reference-cta"><div className="container reference-cta-inner"><div><Eyebrow light>Ready to grow?</Eyebrow><h2>Let’s build your digital advantage.</h2><p>Tell us about your business goals and we’ll help shape the right next move.</p></div><div className="cta-contact"><a href="tel:+17783786424">+1 (778) 378-6424</a><ArrowButton href="/start-project">Get free consultation</ArrowButton></div></div></section>

    <section className="reference-testimonials section section-light"><div className="container"><div className="section-heading centered-heading"><Eyebrow>What clients say</Eyebrow><h2>Good work should feel good to trust.</h2></div><div className="testimonial-grid">{testimonials.map(([quote, name, role]) => <article key={name}><span className="quote-mark">“</span><p>{quote}</p><div><strong>{name}</strong><span>{role}</span></div></article>)}</div></div></section>

    <section className="reference-strengths section" id="strengths"><div className="container"><div className="section-heading split-heading"><div><Eyebrow light>Why choose Nexora</Eyebrow><h2>Strategy, creativity, and precision in one team.</h2></div><p>From the first conversation to ongoing improvement, we keep the work aligned with what the business actually needs.</p></div><div className="strength-grid">{strengths.map(([title, detail], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></div></section>

    <section className="reference-projects section section-light" id="work"><div className="container"><div className="section-heading split-heading"><div><Eyebrow>Recent projects</Eyebrow><h2>Digital work built for real businesses.</h2></div><p>Explore a few of the businesses where clarity, trust, and performance became part of the digital system.</p></div><div className="reference-project-grid"><a href="https://phoenixfuturefoundation.ca/" target="_blank" rel="noreferrer" className="reference-project project-phoenix"><span>Non-profit / Web presence</span><h3>Phoenix Future Foundation</h3><b>View website ↗</b></a><a href="https://workinjuryadvocates.ca/" target="_blank" rel="noreferrer" className="reference-project project-injury"><span>Legal / SEO structure</span><h3>Work Injury Advocates</h3><b>View website ↗</b></a><a href="https://trusthands.ca/" target="_blank" rel="noreferrer" className="reference-project project-trust"><span>Home care / Website</span><h3>Trust Hands</h3><b>View website ↗</b></a><a href="https://bestvancouvercleaningservices.ca/" target="_blank" rel="noreferrer" className="reference-project project-cleaning"><span>Local service / Visibility</span><h3>Best Vancouver Cleaning Services</h3><b>View website ↗</b></a></div><Link href="/#services" className="text-link">View all services <span>↗</span></Link></div></section>

    <section className="reference-team section section-light"><div className="container"><div className="section-heading split-heading"><div><Eyebrow>Meet the team</Eyebrow><h2>People who keep the work moving.</h2></div><p>Designers, developers, strategists, and marketers working together across the details that shape growth.</p></div><div className="team-grid">{team.map(([initials, name, role, detail]) => <article key={name}><div className="team-avatar">{initials}</div><h3>{name}</h3><span>{role}</span><p>{detail}</p></article>)}</div></div></section>

    <section className="reference-process section"><div className="container"><div className="section-heading centered-heading"><Eyebrow light>Our process</Eyebrow><h2>From first question to lasting growth.</h2><p>Every project starts with understanding the business, then moves through a clear strategy and improvement path.</p></div><div className="reference-process-grid">{[{n:"01",title:"Discovery Phase",detail:"Analyze business goals, competitors, audience behavior, and market positioning."},{n:"02",title:"Strategic Planning",detail:"Create a roadmap for design, marketing initiatives, targets, timelines, and milestones."},{n:"03",title:"Execution & Launch",detail:"Develop, optimize, and deploy the website or campaign with quality assurance."},{n:"04",title:"Optimization & Growth",detail:"Monitor performance data, refine strategies, and implement useful improvements."}].map((step) => <article key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.detail}</p><b>↗</b></article>)}</div></div></section>

    <section className="reference-blog section section-light"><div className="container"><div className="section-heading split-heading"><div><Eyebrow>Insights & digital trends</Eyebrow><h2>Useful thinking for the next decision.</h2></div><p>Practical guidance for clearer digital choices before you build, spend, or scale.</p></div><div className="blog-grid">{insights.slice(0, 4).map((item, index) => <Link href="/insights" className="blog-card" key={item.title}><span>0{index + 1} · {item.category}</span><h3>{item.title}</h3><b>Read insight ↗</b></Link>)}</div><Link className="text-link" href="/insights">Visit our blog <span>↗</span></Link></div></section>

    <section className="reference-contact section" id="contact"><div className="container contact-grid"><div><Eyebrow light>Get in touch with us</Eyebrow><h2>Tell us about your project, business goals, and growth objectives.</h2><p>We’re here to help you find the right next move, whether that is a website, campaign, brand system, product, or clearer plan.</p><div className="contact-details"><a href="tel:+17783786424">+1 (778) 378-6424</a><a href="mailto:info@nexoradm.ca">info@nexoradm.ca</a><span>1967-1959 Marine Dr.<br />North Vancouver, BC V7P 3G1</span></div></div><div className="contact-card"><span>Start the conversation</span><h3>What are you looking to improve?</h3><div className="contact-options"><span>Website & development</span><span>Digital marketing & SEO</span><span>Branding & creative</span><span>Business consultation</span></div><ArrowButton href="mailto:info@nexoradm.ca?subject=Project%20inquiry%20for%20Nexora">Send message</ArrowButton></div></div></section>
  </main></SiteShell>;
}
