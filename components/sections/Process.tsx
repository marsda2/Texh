import { Reveal } from "@/components/site/Reveal";
import { process } from "@/content/site";
import { SystemFlow } from "./SystemFlow";

export function Process() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-7 py-14 md:px-10 md:py-32 lg:px-[4.5rem]">
      <Reveal>
        <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-ink/60">
          {process.eyebrow}
        </p>
        <h2 className="mt-4 max-w-[900px] font-display text-[clamp(2.4rem,9vw,3rem)] font-black leading-[0.98] tracking-[-0.045em] md:text-[clamp(3.2rem,5vw,4.75rem)]">
          {process.title}
        </h2>
      </Reveal>

      <ol className="mt-7 grid gap-3 md:mt-16 md:grid-cols-3 md:gap-5">
        {process.steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.n}
            delay={i * 0.08}
            className="relative flex gap-4 rounded-[20px] border border-line bg-paper p-5 md:block md:rounded-[24px] md:p-8"
          >
            <span className="w-[2.2ch] shrink-0 font-display text-[32px] font-black leading-none tracking-[-0.06em] text-ink md:w-auto md:text-[80px]">
              {step.n}
            </span>
            <span className="absolute right-5 top-6 size-2.5 rounded-full bg-lime shadow-[0_0_14px_rgba(200,255,0,0.9)] md:right-8 md:top-9 md:size-3" />
            <div>
              <h3 className="font-display text-[19px] font-extrabold leading-tight tracking-[-0.03em] md:mt-8 md:text-[24px]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-snug text-muted md:mt-3 md:text-[15px] md:leading-relaxed">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      {/* One lead travelling through the connected system */}
      <Reveal delay={0.1} className="mt-5">
        <SystemFlow />
      </Reveal>
    </section>
  );
}
