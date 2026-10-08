import { ArrowUpRight } from "lucide-react";
import { TexhcoX } from "@/components/brand/TexhcoLogo";
import { Reveal } from "@/components/site/Reveal";
import { letsBuild, site } from "@/content/site";
import { ChromeX } from "./ChromeX";
import { VoiceNote } from "./VoiceNote";

/**
 * Closing section: the free-audit pitch (dark card, chrome X) and the way to
 * ask for it — a voice note, an uploaded clip or a typed message.
 * `source` tags the lead with the page it came from.
 */
export function LetsBuild({ source = "home" }: { source?: string }) {
  const { audit } = letsBuild;

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1440px] scroll-mt-6 px-4 pb-10 pt-20 md:px-6 md:pt-28 lg:px-10"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* The offer */}
        <Reveal className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[32px] bg-ink px-7 pb-9 pt-12 text-cream md:rounded-[40px] md:px-11 md:pb-11 md:pt-14 lg:sticky lg:top-6 lg:flex lg:min-h-[660px] lg:flex-col">
            <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-lime/10 blur-3xl" />
            <p className="relative text-[10px] font-medium uppercase tracking-[0.45em] text-cream/60 md:text-[11px]">
              {audit.eyebrow}
            </p>
            <h2 className="relative mt-6 font-display text-[clamp(3.1rem,15vw,4.6rem)] font-black leading-[0.92] tracking-[-0.05em] lg:text-[clamp(3.4rem,4.7vw,5.1rem)]">
              {audit.title[0]}
              <br />
              {audit.title[1]}
            </h2>
            <p className="relative mt-7 font-display text-[clamp(1.35rem,6vw,1.8rem)] font-extrabold leading-tight tracking-[-0.03em]">
              {audit.offer}
            </p>
            <p className="relative mt-3 max-w-[360px] text-[18px] leading-snug text-cream/85">
              {audit.body}
            </p>
            <a
              href="#voice-note"
              className="group relative z-10 mt-8 flex h-16 w-full max-w-[440px] items-center justify-between rounded-full bg-lime pl-7 pr-2 font-display text-[19px] font-extrabold tracking-[-0.02em] text-ink transition-transform duration-300 hover:-translate-y-0.5 md:h-[68px] md:text-[21px]"
            >
              {audit.button}
              <span className="grid size-12 place-items-center rounded-full bg-ink text-lime transition-transform duration-300 group-hover:rotate-45 md:size-[52px]">
                <ArrowUpRight className="size-6" strokeWidth={2.2} />
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="link-underline relative z-10 mt-10 inline-block self-start text-[17px] text-cream/85 hover:text-cream lg:mt-auto lg:pt-10"
            >
              {site.email}
            </a>

            {/* Room for the chrome X in the bottom-right corner */}
            <div className="h-28 md:h-36 lg:hidden" />
            <ChromeX className="absolute -bottom-[7%] -right-[9%] aspect-square w-[68%] max-w-[340px] md:w-[46%] lg:-bottom-[9%] lg:w-[52%]" />
          </div>
        </Reveal>

        {/* The ask */}
        <div className="px-2 md:px-4 lg:col-span-7 lg:px-0 lg:pl-4">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-ink/60 md:text-[11px]">
              {letsBuild.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[clamp(3rem,14vw,4.25rem)] font-black leading-[0.95] tracking-[-0.05em] md:text-[clamp(3.6rem,6vw,5.25rem)]">
              {letsBuild.title[0]}
              <br />
              {letsBuild.title[1]}{" "}
              <span className="relative inline-block">
                {letsBuild.title[2]}
                <span
                  aria-hidden
                  className="absolute -bottom-[0.02em] left-0 right-[0.06em] h-[0.09em] rounded-full bg-lime"
                />
              </span>
            </h2>
            <p className="mt-6 text-[clamp(1.2rem,5.2vw,1.45rem)] font-medium leading-snug text-ink/75">
              {letsBuild.lead[0]}
              <br />
              {letsBuild.lead[1]}
            </p>
            <p className="mt-2 text-[16px] text-ink/55 md:text-[17px]">{letsBuild.sub}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 md:mt-10">
            <VoiceNote source={source} />
          </Reveal>

          <p className="mt-7 px-1 text-[15px] text-ink/65">{letsBuild.note}</p>

          <div className="mt-6 flex items-center justify-between border-t border-line px-1 pt-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-ink/60">
              {letsBuild.signoff}
            </p>
            <TexhcoX className="h-6 w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
