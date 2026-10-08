import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

/** Shared layout for the plain-text legal pages. */
export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[820px] px-7 pb-24 pt-10 md:px-10 md:pt-16">
        <h1 className="font-display text-[clamp(2.6rem,10vw,3.6rem)] font-black leading-[0.98] tracking-[-0.045em]">
          {title}
        </h1>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/50">
          {updated}
        </p>
        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-[24px] font-extrabold tracking-[-0.03em]">
                {s.heading}
              </h2>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
