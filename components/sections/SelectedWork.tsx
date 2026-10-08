import Image from "next/image";
import { ArrowLeftRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { burgerCover, inHouse, washCover, work } from "@/content/site";

// Asymmetric 12-col rhythm on desktop: wide/narrow, then narrow/wide.
const spans = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-[1440px] scroll-mt-8 px-7 pb-24 pt-14 md:px-10 md:pb-32 md:pt-28 lg:px-[4.5rem]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 className="font-display text-[clamp(2.4rem,10vw,3rem)] font-black leading-none tracking-[-0.045em] md:text-[clamp(3.2rem,5vw,4.75rem)]">
            Selected work
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="max-w-[380px]">
          <p className="text-[15px] leading-relaxed text-muted md:text-right">
            Real sites and platforms we&rsquo;ve built end to end, plus a
            product of our own.
          </p>
        </Reveal>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-12 md:gap-6">
        {work.map((project, i) => (
          <Reveal
            as="li"
            key={project.name}
            delay={(i % 2) * 0.08}
            className={spans[i % spans.length]}
          >
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name}, open site`}
              className="group relative block overflow-hidden rounded-[22px] bg-ink-2 md:rounded-[28px]"
            >
              <div className="relative aspect-[4/3.3] md:aspect-auto md:h-[clamp(340px,38vw,560px)]">
                {project.cover === "wash" ? (
                  <WashCover />
                ) : project.cover === "burgers" ? (
                  <BurgerCover />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 58vw"
                    style={{ objectPosition: project.focus }}
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_16%,rgba(0,0,0,0.72)_46%,rgba(0,0,0,0.94)_100%)]" />
              </div>

              <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white backdrop-blur-md md:left-5 md:top-5">
                {project.domain}
              </span>

              <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-ink shadow-md transition-colors duration-300 group-hover:bg-lime md:right-5 md:top-5 md:size-12">
                <ArrowUpRight
                  className="size-5 transition-transform duration-300 group-hover:rotate-45"
                  strokeWidth={2}
                />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">
                  {project.kind} · {project.place}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.6rem,6vw,2.25rem)] font-extrabold leading-none tracking-[-0.03em] md:text-[clamp(1.75rem,2.4vw,2.5rem)]">
                  {project.name}
                </h3>
                <p className="mt-3 hidden max-w-[460px] text-[14px] leading-relaxed text-white/80 md:block">
                  {project.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[12px] font-medium backdrop-blur-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-5 md:mt-6">
        <article className="grid overflow-hidden rounded-[22px] border border-line bg-[#f7f6f0] md:grid-cols-[1fr_1.05fr] md:rounded-[28px]">
          <div className="flex flex-col justify-center gap-5 p-6 md:p-10 lg:p-14">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white">
              <span className="size-1.5 rounded-full bg-lime" />
              {inHouse.eyebrow}
            </p>
            <div>
              <h3 className="font-display text-[clamp(2.2rem,8vw,3rem)] font-black leading-none tracking-[-0.04em] md:text-[clamp(2.4rem,3.6vw,3.6rem)]">
                {inHouse.name}
              </h3>
              <p className="mt-3 font-display text-[clamp(1.1rem,4vw,1.35rem)] font-semibold leading-snug tracking-[-0.01em] text-ink/80">
                {inHouse.tagline}
              </p>
            </div>
            <p className="max-w-[480px] text-[15px] leading-relaxed text-muted">
              {inHouse.body}
            </p>
            <ul className="flex flex-wrap gap-2">
              {inHouse.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-ink/15 bg-white/60 px-3 py-1 text-[12px] font-medium text-ink/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <a
              href={inHouse.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {inHouse.cta}
              <ArrowUpRight
                className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          </div>

          <PassFan />
        </article>
      </Reveal>
    </section>
  );
}

/** WashAcoholic: its own before/after, with a divider that sweeps back and forth. */
function WashCover() {
  return (
    <div className="wash-cover absolute inset-0 overflow-hidden transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
      <Image
        src={washCover.after}
        alt="A black Camaro after a WashAcoholic detail"
        fill
        sizes="(max-width: 767px) 100vw, 42vw"
        className="object-cover object-[50%_40%]"
      />
      {/* The "after" tag sits under the before layer, so the sweep hides it naturally */}
      <span className="absolute right-4 top-[22%] rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink md:right-5">
        After
      </span>
      <div className="wash-before absolute inset-0">
        <Image
          src={washCover.before}
          alt="The same car before the detail"
          fill
          sizes="(max-width: 767px) 100vw, 42vw"
          className="object-cover object-[50%_40%]"
        />
        <span className="absolute left-4 top-[22%] rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md md:left-5">
          Before
        </span>
      </div>
      {/* Divider + handle */}
      <span className="wash-line absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]">
        <span className="absolute left-1/2 top-[30%] grid size-9 -translate-x-1/2 place-items-center rounded-full bg-white text-ink shadow-lg">
          <ArrowLeftRight className="size-4" strokeWidth={2.4} />
        </span>
      </span>
    </div>
  );
}

/** Centralburg: three signature burgers over the brand's yellow, sinking into the card's dark gradient. */
function BurgerCover() {
  // [left %, width cqw, top cqw, rotation deg, z] for each burger.
  const spots: [number, number, number, number, number][] = [
    [-4, 36, 14, -9, 0],
    [29, 43, 5, 2, 2],
    [64, 36, 14, 9, 1],
  ];
  return (
    <div className="@container absolute inset-0 bg-[#292821] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
      {/* The brand's yellow, as a disc behind the hero burger */}
      <span className="absolute left-1/2 top-[0cqw] size-[54cqw] -translate-x-1/2 rounded-full bg-[#f2d85b]" />
      {burgerCover.map((b, i) => {
        const [left, w, top, rot, z] = spots[i];
        return (
          <Image
            key={b.src}
            src={b.src}
            alt={b.alt}
            width={1080}
            height={1080}
            sizes="(max-width: 767px) 40vw, 20vw"
            className="absolute drop-shadow-[0_1.5cqw_2cqw_rgba(0,0,0,0.45)]"
            style={{
              left: `${left}%`,
              top: `${top}cqw`,
              width: `${w}cqw`,
              zIndex: z,
              transform: `rotate(${rot}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

// Fan of sample passes: [translateX in cqw, rotation in deg, lift in cqw].
const FAN: [number, number, number][] = [
  [-26, -15, 6],
  [-13, -7, 2],
  [0, 0, -2],
  [13, 7, 2],
  [26, 15, 6],
];

/** BackSoon's own sample loyalty cards, fanned out on the panel. */
function PassFan() {
  return (
    <div className="@container relative aspect-[1.3] md:aspect-auto md:min-h-[420px]">
      <div className="absolute inset-0 md:scale-[1.15]">
        {inHouse.passes.map((pass, i) => {
          const [x, r, y] = FAN[i];
          const mid = i === 2;
          return (
            <Image
              key={pass.src}
              src={pass.src}
              alt={pass.alt}
              width={600}
              height={900}
              sizes="(max-width: 767px) 30vw, 14vw"
              className="absolute left-1/2 top-1/2 w-[30cqw] drop-shadow-[0_2cqw_3cqw_rgba(40,38,30,0.28)]"
              style={{
                transform: `translate(-50%, -50%) translate(${x}cqw, ${y}cqw) rotate(${r}deg)`,
                zIndex: mid ? 2 : i === 1 || i === 3 ? 1 : 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
