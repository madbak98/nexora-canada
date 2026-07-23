import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Nexora — Digital systems with strategy before design", template: "%s · Nexora" },
  description: "Nexora helps businesses build clearer, more strategic digital systems across web, search, growth, brand, and product.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Nexora — Digital systems with strategy before design",
    description: "Clearer digital decisions, stronger systems, and growth with more direction.",
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora — Digital systems with strategy before design",
    description: "Clearer digital decisions, stronger systems, and growth with more direction.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
