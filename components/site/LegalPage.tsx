import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { LEGAL, type LegalSection } from "@/content/legal";

/** Shared layout for the plain-text legal pages. */
export function LegalPage({
  title,
  intro,
  sections,
  other,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  other: { href: string; label: string };
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[820px] px-7 pb-24 pt-10 md:px-10 md:pt-16">
        <h1 className="font-display text-[clamp(2.6rem,10vw,3.6rem)] font-black leading-[0.98] tracking-[-0.045em]">
          {title}
        </h1>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/50">
          Last updated: {LEGAL.updated}
        </p>
        <p className="mt-8 text-[17px] leading-relaxed text-muted">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-[24px] font-extrabold tracking-[-0.03em]">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-muted">
                {s.blocks.map((b, i) =>
                  typeof b === "string" ? (
                    <p key={i}>{b}</p>
                  ) : (
                    <ul key={i} className="list-disc space-y-2 pl-6 marker:text-ink/40">
                      {b.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-line pt-6 text-[14px] text-ink/60">
          See also our{" "}
          <Link href={other.href} className="link-underline text-ink">
            {other.label}
          </Link>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
