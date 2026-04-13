import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yasircodes.vercel.app"),
  title: {
    default: "YasirCodes — Full-Stack Developer & Creator",
    template: "%s | YasirCodes",
  },
  description: "Portfolio of Yasir Malik — Full-Stack Developer, plugin creator, theme builder, and writer. Building modern web apps with React, Next.js, Strapi, and Node.js.",
  keywords: ["Yasir Malik", "YasirCodes", "full-stack developer", "Next.js", "React", "Strapi", "portfolio", "plugins", "themes", "blog"],
  authors: [{ name: "Yasir Malik" }],
  creator: "Yasir Malik",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "YasirCodes",
    title: "YasirCodes — Full-Stack Developer & Creator",
    description: "Building products, crafting themes, shipping plugins — and writing about all of it.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "YasirCodes Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YasirCodes — Full-Stack Developer & Creator",
    description: "Building products, crafting themes, shipping plugins — and writing about all of it.",
    creator: "@yasirmalik",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Yasir Malik",
              alternateName: "YasirCodes",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://yasircodes.vercel.app",
              jobTitle: "Full-Stack Developer",
              sameAs: [
                "https://github.com/codesyasir",
                "https://linkedin.com/in/yasirmalik",
                "https://twitter.com/yasirmalik",
              ],
            }),
          }}
        />
      </head>
      <body>
        <div className="grain" />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}