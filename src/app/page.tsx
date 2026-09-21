import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Sponsors } from "@/components/site/sponsors";
import { Events } from "@/components/site/events";
import { About } from "@/components/site/about";
import { Team } from "@/components/site/team";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { BackToTop } from "@/components/site/back-to-top";
import { Konami } from "@/components/site/konami";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="absolute top-2 left-1/2 z-300 -translate-x-1/2 -translate-y-[160%] rounded-lg bg-brand px-5 py-2.5 font-bold text-on-brand transition-transform duration-200 focus:translate-y-0"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Sponsors />
        <Events />
        <About />
        <Team />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <Konami />
    </>
  );
}
