import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Inter, Press_Start_2P } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { club } from "@/content";
import "./globals.css";

/* Condensed, heavy display face for headings. */
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-big-shoulders",
  display: "swap",
  // Next has no metric overrides for this face, so it cannot synthesise a
  // matched fallback. The theme declares Arial Narrow instead.
  adjustFontFallback: false,
});

/* Pixel face, used sparingly for arcade-flavoured labels. */
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
  display: "swap",
});

/* Body copy. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${club.name} — ${club.tagline}`,
    template: `%s | ${club.name}`,
  },
  description: club.blurb,
  keywords: [
    "UCalgary", "University of Calgary", "gaming club", "esports",
    "students union club", "board games", "tabletop", "tournaments", "Calgary",
  ],
  openGraph: {
    title: `${club.name} — ${club.tagline}`,
    description: club.blurb,
    type: "website",
    locale: "en_CA",
    siteName: club.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${club.name} — ${club.tagline}`,
    description: club.blurb,
  },
  icons: {
    icon: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning is required: next-themes mutates the class on
    // <html> before React hydrates, which React would otherwise flag.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bigShoulders.variable} ${pressStart.variable} ${inter.variable}`}
    >
      <head>
        {/* Runs before first paint. Scroll-reveal animations are gated behind
            this class so that content stays visible if JS never runs. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
