import { TexhcoX } from "@/components/brand/TexhcoLogo";
import { Reveal } from "@/components/site/Reveal";
import { ownership } from "@/content/site";
import { RentingTitle, SwapCard } from "./OwnershipParts";

export function Ownership() {
  // The band repeats its phrase so the marquee loops without a seam.
  const phrase = [...ownership.owned, ...ownership.owned];

  return (
    <section
      id="about"
      className="relative scroll-mt-8 overflow-x-clip bg-ink text-cream"
    >
      {/* Oversized x mark as a quiet texture */}
      <TexhcoX
        fill="rgba(200,255,0,0.04)"
        className="pointer-events-none absolute -right-[30%] -top-[2%] h-auto w-[110%] md:-right-[8%] md:w-[58%]"
      />
      {/* Lime glow behind the headline */}
      <div className="pointer-events-none absolute -left-[20%] top-[4%] size-[70vw] rounded-full bg-lime/[0.07] blur-[90px] md:-left-[8%] md:size-[34vw]" />

      <div className="relative mx-auto max-w-[1440px] px-7 pt-14 md:px-10 md:pt-24 lg:px-[4.5rem]">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-lime">
                {ownership.eyebrow}
              </p>
            </Reveal>
            <RentingTitle />
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-cream/70 md:mt-6 md:text-[17px]">
                {ownership.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-7">
            <SwapCard />
          </Reveal>
        </div>
      </div>

      {/* Tilted lime band: the three things that end up in your hands */}
      <div className="relative z-10 my-12 -rotate-[2deg] overflow-hidden bg-lime py-2.5 text-ink shadow-[0_0_80px_rgba(200,255,0,0.25)] md:my-16 md:py-4">
        <div className="marquee-x flex w-max items-center whitespace-nowrap">
          {[...phrase, ...phrase].map((item, i) => (
            <span
              key={i}
              className="flex items-center font-display text-[clamp(1.2rem,5vw,2.2rem)] font-black uppercase leading-none tracking-[-0.03em]"
            >
              {item.label}
              <span className="mx-5 text-[0.7em] md:mx-8">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
