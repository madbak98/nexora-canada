"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const startedAt = performance.now();
    const duration = 2100;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);
      if (nextProgress < 100) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    const finishTimer = window.setTimeout(() => {
      setProgress(100);
      setLeaving(true);
      document.body.style.overflow = "";
      window.setTimeout(() => setVisible(false), 760);
    }, duration + 180);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div className={`site-loader ${leaving ? "is-leaving" : ""}`} initial={{ opacity: 1 }} animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: .48, ease: "easeInOut" }} role="status" aria-label="Loading Nexora">
      <div className="site-loader__stairs" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => <motion.span key={index} initial={{ y: "0%" }} animate={{ y: leaving ? "-102%" : "0%" }} transition={{ duration: .72, delay: index * .075, ease: [.76, 0, .24, 1] }} />)}
      </div>
      <div className="site-loader__content">
        <div className="site-loader__brand">
          <span className="site-loader__mark"><img src="/images/brand/nexora-logo.webp" alt="" /></span>
          <span>Nexora</span>
        </div>
        <p>Digital systems with strategy before design.</p>
        <div className="site-loader__progress" aria-hidden="true"><motion.span animate={{ width: `${progress}%` }} transition={{ duration: .18, ease: "easeOut" }} /></div>
        <div className="site-loader__meta"><span>Preparing your next move</span><strong>{String(progress).padStart(2, "0")}%</strong></div>
      </div>
    </motion.div>
  );
}
