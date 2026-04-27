import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://yasircodes.online"),
  title: {
    default: "YasirCodes — WordPress Developer & Creator",
    template: "%s | YasirCodes",
  },
  description: "Yasir Malik — WordPress Developer with 4+ years of experience. Specializing in WooCommerce, theme & plugin development, and custom PHP solutions.",
  keywords: [
    "Yasir Malik",
    "YasirCodes",
    "WordPress Developer",
    "WooCommerce Developer",
    "WordPress Developer Pakistan",
    "WooCommerce customization",
    "WordPress themes",
    "WordPress plugins",
    "PHP developer",
    "web developer Pakistan",
    "freelance WordPress developer",
    "portfolio",
  ],
  authors: [{ name: "Yasir Malik", url: "https://yasircodes.online" }],
  creator: "Yasir Malik",
  publisher: "YasirCodes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yasircodes.online",
    siteName: "YasirCodes",
    title: "YasirCodes — WordPress Developer & Creator",
    description: "Building products, crafting themes, shipping plugins — and writing about all of it.",
  },
  twitter: {
    card: "summary_large_image",
    title: "YasirCodes — WordPress Developer & Creator",
    description: "Building products, crafting themes, shipping plugins — and writing about all of it.",
    creator: "@yasirmalik",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://yasircodes.online",
  },
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
              url: "https://yasircodes.online",
              jobTitle: "WordPress Developer",
              description: "WordPress Developer with 4+ years of experience specializing in WooCommerce, theme & plugin development.",
              sameAs: [
                "https://github.com/codesyasir",
                "https://www.linkedin.com/in/yasir-malik-web/",
                "https://twitter.com/yasircodes",
              ],
              knowsAbout: ["WordPress", "WooCommerce", "PHP", "JavaScript", "Web Development"],
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
              },
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