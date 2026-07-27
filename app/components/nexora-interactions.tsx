"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import CircularGallery from "./react-bits/Components/CircularGallery/CircularGallery";
import CircularText from "./react-bits/TextAnimations/CircularText/CircularText";
import LogoLoop from "./react-bits/Animations/LogoLoop/LogoLoop";
import HexagonPattern from "./react-bits/Backgrounds/HexagonPattern/HexagonPattern";
import TargetCursor from "./react-bits/Animations/TargetCursor/TargetCursor";
import FlowingMenu from "./react-bits/Components/FlowingMenu/FlowingMenu";
import MagicBento from "./react-bits/Components/MagicBento/MagicBento";
import PlasmaWave from "./react-bits/Backgrounds/PlasmaWave/PlasmaWave";
import SpecularButton from "./react-bits/Components/SpecularButton/SpecularButton";
import TextPressure from "./react-bits/TextAnimations/TextPressure/TextPressure";
import ScrollStack, { type ScrollStackItem } from "./react-bits/Components/ScrollStack/ScrollStack";
import ProjectCardSwap, { type ProjectCardSwapItem } from "./react-bits/Components/CardSwap/ProjectCardSwap";
import OptionWheel from "./react-bits/Components/OptionWheel/OptionWheel";
import ScrollVelocityBand from "./scroll-velocity";

export function HeroPlasma() {
  return <PlasmaWave colors={["#2563EB", "#1D4ED8"]} speed1={0.045} speed2={0.055} bend1={1.15} bend2={0.62} focalLength={0.82} />;
}

export function InsightsVelocityBand() {
  return <ScrollVelocityBand />;
}

const shortcutSections = ["top", "about", "services", "work", "team", "insights", "contact"];

export function SectionOptionWheel() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.dataset.theme === "dark");
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.location.pathname !== "/") return;

    let frame = 0;
    const syncWithScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const marker = window.innerHeight * 0.38;
        let nextIndex = 0;
        let closestTop = Number.NEGATIVE_INFINITY;

        shortcutSections.forEach((id, index) => {
          const section = document.getElementById(id);
          if (!section) return;
          const top = section.getBoundingClientRect().top;
          if (top <= marker && top > closestTop) {
            closestTop = top;
            nextIndex = index;
          }
        });

        setActiveSection((current) => current === nextIndex ? current : nextIndex);
      });
    };

    syncWithScroll();
    window.addEventListener("scroll", syncWithScroll, { passive: true });
    window.addEventListener("resize", syncWithScroll);
    return () => {
      window.removeEventListener("scroll", syncWithScroll);
      window.removeEventListener("resize", syncWithScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goToSection = (index: number) => {
    const id = shortcutSections[index];
    if (!id) return;
    if (window.location.pathname !== "/") {
      window.location.assign(`/#${id}`);
      return;
    }
    setActiveSection(index);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${id}`);
  };

  return (
    <div className="nx-option-wheel" aria-label="Quick section navigator">
      <OptionWheel
        key={`section-wheel-${activeSection}`}
        items={["Home", "About", "Services", "Projects", "Team", "Insights", "Contact"]}
        defaultSelected={activeSection}
        onChange={(index) => goToSection(index)}
        textColor={isDark ? "#94A3B8" : "#64748B"}
        activeColor={isDark ? "#F8FAFC" : "#13213A"}
        side="right"
        fontSize={.72}
        spacing={1.45}
        curve={1.2}
        tilt={13}
        blur={1.2}
        fade={.2}
        minOpacity={.18}
        smoothing={180}
        inset={27}
        draggable
      />
    </div>
  );
}

export function NexoraTargetCursor() {
  return <TargetCursor targetSelector=".button, .nav-cta, .specular-button, button" cursorColor="#13213A" cursorColorOnTarget="#2563EB" />;
}

export function HeroCircularText() {
  return (
    <div className="nx-hero-circular-lockup">
      <CircularText text="NEXORA*NEXORA*NEXORA*" spinDuration={22} onHover="none" className="nx-circular-text nx-circular-text-outer" />
    </div>
  );
}

export function HeroTitlePressure() {
  const lines = ["Digital systems built", "with strategy before", "design."];

  return (
    <div className="nx-pressure-heading" role="heading" aria-level={1} aria-label="Digital systems built with strategy before design.">
      {lines.map(line => (
        <div className="nx-pressure-line" key={line} aria-hidden="true">
          <TextPressure
            text={line}
            as="div"
            fontFamily="Roboto Flex"
            width
            weight
            italic
            textColor="#FFFFFF"
            minFontSize={24}
          />
        </div>
      ))}
    </div>
  );
}

export function NexoraLogoLoop() {
  return (
    <LogoLoop
      logos={[
        { node: <><img className="nx-loop-logo" src="/images/brand/nexora-logo.webp" alt="" /><span>NEXORA</span></>, title: "Nexora" },
        { node: <><b className="nx-loop-dot">●</b><span>STRATEGY</span></>, title: "Strategy" },
        { node: <><b className="nx-loop-mark">01</b><span>WEB SYSTEMS</span></>, title: "Web systems" },
        { node: <><b className="nx-loop-dot">✦</b><span>SEARCH & GROWTH</span></>, title: "Search and growth" },
        { node: <><b className="nx-loop-mark">NX</b><span>BRAND SYSTEMS</span></>, title: "Brand systems" },
        { node: <><b className="nx-loop-dot">↗</b><span>BUILT TO IMPROVE</span></>, title: "Built to improve" },
      ]}
      speed={36}
      logoHeight={21}
      gap={104}
      hoverSpeed={24}
      pauseOnHover={false}
      fadeOut={false}
      scaleOnHover={false}
      ariaLabel="Nexora capabilities loop"
      className="nx-logo-loop"
    />
  );
}

export function ServicesGallery() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.dataset.theme === "dark");
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <CircularGallery
      key={isDark ? "dark" : "light"}
      bend={2.4}
      borderRadius={0.055}
      textColor={isDark ? "#F8FAFC" : "#13213A"}
      font="800 26px Inter"
      scrollSpeed={1.8}
      scrollEase={0.065}
      items={[
        { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85", text: "Web Design" },
        { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85", text: "SEO & Local" },
        { image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85", text: "Google Ads" },
        { image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85", text: "Brand Systems" },
        { image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85", text: "Digital Strategy" },
        { image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85", text: "Website Care" },
      ]}
    />
  );
}

export function ServicesScrollStack({ items }: { items: ScrollStackItem[] }) {
  return <ScrollStack items={items} />;
}

export function ProjectsCardSwap() {
  const items: ProjectCardSwapItem[] = [
    { title: "Phoenix Future Foundation", category: "Web Design & Development", description: "A clearer digital presence built to explain the mission and guide the next action.", image: "/images/insights/web-structure.png" },
    { title: "Work Injury Advocates", category: "Digital Marketing & SEO", description: "A search-aware service experience designed around trust, relevance, and qualified inquiries.", image: "/images/insights/local-search.png" },
    { title: "Trust Hands", category: "Branding & Creative Services", description: "A consistent brand direction that makes the organization easier to recognize and remember.", image: "/images/insights/brand-system.png" },
    { title: "Best Vancouver Cleaning Services", category: "Search Visibility", description: "A local growth path connecting service intent, useful content, and a confident conversion journey.", image: "/images/insights/paid-growth.png" },
  ];
  return <ProjectCardSwap items={items} />;
}

export function InsightsBento() {
  return (
    <MagicBento
      cards={[
        { color: "#FFFFFF", image: "/images/insights/web-structure.png", label: "Web Design", title: "Start with structure, not visuals", description: "The best websites make the business and next action easy to understand." },
        { color: "#FFFFFF", image: "/images/insights/local-search.png", label: "SEO", title: "Local SEO before content", description: "Search relevance begins with services, intent, trust, and page structure." },
        { color: "#EFF6FF", image: "/images/insights/paid-growth.png", label: "Google Ads", title: "The landing page matters", description: "Better paid traffic needs a better path after the click." },
        { color: "#FFFFFF", image: "/images/insights/brand-system.png", label: "Digital Strategy", title: "Which move comes first?", description: "Make the priority clear before you build, spend, or scale." },
        { color: "#FFFFFF", image: "/images/insights/brand-system.png", label: "Brand Systems", title: "A logo is not the whole brand", description: "Consistency is a system that travels across every touchpoint." },
        { color: "#FFFFFF", image: "/images/insights/web-structure.png", label: "Product Direction", title: "App projects need an MVP path", description: "Map the workflow and product scope before development gets expensive." },
      ]}
      textAutoHide={false}
      enableStars
      enableSpotlight
      enableBorderGlow
      enableTilt
      enableMagnetism
      glowColor="37, 99, 235"
      spotlightRadius={320}
      particleCount={10}
    />
  );
}

export function InsightsGrid() {
  return <HexagonPattern className="nx-insights-grid" />;
}

export function LightSectionGrid() {
  return <div className="nx-light-section-grid" aria-hidden="true"><HexagonPattern /></div>;
}

const teamMembers = [
  { name: "Michael Harrison", role: "Founder & Managing Director", detail: "Guides brands toward scalable digital growth and measurable success.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85" },
  { name: "Sarah Thompson", role: "Creative Director", detail: "Leads brand identity, visual storytelling, and creative campaigns that strengthen market positioning.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85" },
  { name: "Daniel Roberts", role: "Lead Web Developer", detail: "Builds secure, scalable digital experiences around real business goals.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85" },
  { name: "Ava Patel", role: "UX Designer", detail: "Designs intuitive digital experiences that improve usability, engagement, and conversion rates.", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85" },
  { name: "James Walker", role: "Performance Marketer", detail: "Manages data-driven paid campaigns focused on measurable ROI and sustainable growth.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85" },
  { name: "Olivia Chen", role: "SEO Strategist", detail: "Develops technical and content SEO strategies to improve rankings and online visibility.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85" },
]; 

export function TeamHoverMembers() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeMember = activeIndex === null ? null : teamMembers[activeIndex];

  return (
    <div className="nx-team-showcase" onMouseLeave={() => setActiveIndex(null)}>
      <div className="nx-team-kicker"><span /> People behind the system <span>Hover to explore</span></div>
      <div className="nx-team-thumbnails" aria-label="Nexora team members">
        {teamMembers.map((member, index) => (
          <button type="button" className={`team-thumbnail-button shimmer-button ${activeIndex === index ? "is-active" : ""}`} key={member.name} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} aria-label={`Show ${member.name}`}>
            <img src={member.image} alt="" />
          </button>
        ))}
      </div>
      <div className="nx-team-title-wrap" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h2 key={activeMember?.name ?? "nexora"} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
            {(activeMember?.name ?? "NEXORA").split("").map((letter, index) => <motion.span key={`${activeMember?.name ?? "nexora"}-${index}`} initial={{ y: "115%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-115%", opacity: 0 }} transition={{ duration: .48, delay: index * .035, ease: [.22, 1, .36, 1] }}>{letter === " " ? "\u00A0" : letter}</motion.span>)}
          </motion.h2>
        </AnimatePresence>
      </div>
      <div className="nx-team-member-meta">
        <span>{activeMember?.role ?? "TEAM / STRATEGY / DESIGN / GROWTH"}</span>
        <p>{activeMember?.detail ?? "A connected team for clearer digital decisions."}</p>
      </div>
      <div className="nx-team-footer"><span>01 — 06</span><span>Nexora digital team · Vancouver, BC</span></div>
    </div>
  );
}

export function ContactFlowingMenu() {
  return (
    <FlowingMenu
      speed={18}
      textColor="#13213A"
      bgColor="#FFFFFF"
      marqueeBgColor="#2563EB"
      marqueeTextColor="#FFFFFF"
      borderColor="rgba(226, 232, 240, .95)"
      items={[
        { link: "/start-project", text: "Start a project", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85" },
        { link: "/services/business-consultation", text: "Book a consultation", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85" },
        { link: "mailto:info@nexoradm.ca", text: "Email Nexora", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85" },
      ]}
    />
  );
}

export function SpecularLink({ href, children, className = "", size = "md" }: { href: string; children: React.ReactNode; className?: string; size?: "sm" | "md" | "lg" }) {
  const router = useRouter();
  const handleClick = () => {
    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
      window.location.href = href;
      return;
    }
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    router.push(href);
  };

  return <SpecularButton size={size} className={`nx-specular ${className}`} baseColor="#2563EB" lineColor="#93C5FD" intensity={1.25} tint="#1D4ED8" tintOpacity={0.22} textColor="#FFFFFF" onClick={handleClick}>{children}<span aria-hidden="true">↗</span></SpecularButton>;
}
