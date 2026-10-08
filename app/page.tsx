import { Hero } from "@/components/hero/Hero";
import { LetsBuild } from "@/components/contact/LetsBuild";
import { Ownership } from "@/components/sections/Ownership";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ServicesDeck } from "@/components/services/ServicesDeck";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SelectedWork />
        <ServicesDeck />
        <Ownership />
        <Process />
        <LetsBuild />
      </main>
      <Footer />
    </>
  );
}
