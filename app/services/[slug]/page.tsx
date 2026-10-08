import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { LetsBuild } from "@/components/contact/LetsBuild";
import { serviceIcons, themes } from "@/components/services/theme";
import {
  KeywordBand,
  ShiftList,
  Timeline,
} from "@/components/services/ServicePageParts";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import { ServiceShowcase } from "@/components/services/showcase/ServiceShowcase";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return {
    title: service.label,
    description: service.detail.intro,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.label} | Texh Co`,
      description: service.detail.intro,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const service = findService((await params).slug);
  if (!service) notFound();

  const index = services.indexOf(service);
  const n = String(index + 1).padStart(2, "0");
  const total = String(services.length).padStart(2, "0");
  const t = themes[service.theme];
  const others = services.filter((s) => s.id !== service.id);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-7 pb-20 pt-10 md:grid-cols-12 md:px-10 md:pb-28 md:pt-16 lg:px-[4.5rem]">
          {/* Above the fold: CSS entrance, so the headline paints without JS. */}
          <div className="hero-rise md:col-span-6" style={{ "--delay": "0.05s" } as React.CSSProperties}>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50"
            >
              <Link href="/#services" className="hover:text-ink">
                Services
              </Link>
              <span>/</span>
              <span className="text-ink">{service.label}</span>
            </nav>
            <p className="mt-8 font-display text-[22px] font-extrabold">
              {n}
              <span className="ml-1.5 text-[0.65em] font-semibold text-ink/40">
                / {total}
              </span>
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.6rem,11vw,3.4rem)] font-black leading-[0.98] tracking-[-0.045em] md:text-[clamp(3rem,4.3vw,4.75rem)]">
              {service.card.title[0]}
              <br />
              {service.card.title[1]}
            </h1>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-muted md:text-[18px]">
              {service.detail.intro}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link
                href="/#contact"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink pl-6 pr-5 text-[15px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get my free audit
                <ArrowUpRight
                  className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="/#services"
                className="link-underline inline-flex items-center gap-2 text-[15px] font-medium"
              >
                <ArrowLeft className="size-4" strokeWidth={2} />
                All services
              </Link>
            </div>
          </div>

          <div className="hero-rise md:col-span-6" style={{ "--delay": "0.15s" } as React.CSSProperties}>
            <div
              className={`rounded-[32px] px-8 pb-12 pt-10 md:rounded-[40px] md:px-12 md:pb-16 md:pt-14 ${t.card}`}
            >
              <ServiceVisual id={service.id} theme={service.theme} />
            </div>
          </div>
        </section>

        <KeywordBand words={service.detail.included.map((i) => i.title)} />

        {/* Interactive demo, different for every service */}
        <section className="mx-auto max-w-[1440px] px-4 pt-6 md:px-10 md:pt-10 lg:px-[4.5rem]">
          <Reveal>
            <ServiceShowcase service={service} />
          </Reveal>
        </section>

        {/* Before / after */}
        <section className="mx-auto max-w-[1440px] px-7 py-20 md:px-10 md:py-28 lg:px-[4.5rem]">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-ink/60">
              What changes
            </p>
            <h2 className="mt-4 max-w-[760px] font-display text-[clamp(2.2rem,9vw,3rem)] font-black leading-[0.98] tracking-[-0.045em] md:text-[clamp(3rem,4.6vw,4.25rem)]">
              Same business. A lot less friction.
            </h2>
          </Reveal>
          <ShiftList items={service.detail.shift} />
        </section>

        {/* What's included */}
        <section className="border-t border-line bg-paper">
          <div className="mx-auto max-w-[1440px] px-7 py-20 md:px-10 md:py-28 lg:px-[4.5rem]">
            <Reveal>
              <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-ink/60">
                What&rsquo;s included
              </p>
              <h2 className="mt-4 max-w-[760px] font-display text-[clamp(2.2rem,9vw,3rem)] font-black leading-[0.98] tracking-[-0.045em] md:text-[clamp(3rem,4.6vw,4.25rem)]">
                Everything it takes. Nothing you don&rsquo;t need.
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {service.detail.included.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={(i % 3) * 0.06}
                  className="rounded-[24px] border border-line bg-cream p-7 md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[15px] font-extrabold text-ink/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-8 place-items-center rounded-full bg-lime">
                      <Check className="size-4" strokeWidth={2.6} />
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-[22px] font-extrabold leading-tight tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* How it goes: this service's own timeline */}
        <section className="mx-auto max-w-[1440px] px-7 py-20 md:px-10 md:py-28 lg:px-[4.5rem]">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-ink/60">
              How it goes
            </p>
            <h2 className="mt-4 max-w-[760px] font-display text-[clamp(2.2rem,9vw,3rem)] font-black leading-[0.98] tracking-[-0.045em] md:text-[clamp(3rem,4.6vw,4.25rem)]">
              Live in about a week. Better every Monday.
            </h2>
          </Reveal>
          <Timeline steps={service.detail.timeline} />
        </section>

        {/* Who it's for */}
        <section className="relative overflow-hidden bg-ink text-cream">
          <div className="pointer-events-none absolute -right-[20%] -top-[40%] size-[60vw] rounded-full bg-lime/[0.07] blur-[90px] md:size-[32vw]" />
          <div className="relative mx-auto grid max-w-[1440px] items-end gap-10 px-7 py-20 md:grid-cols-12 md:px-10 md:py-28 lg:px-[4.5rem]">
            <Reveal className="md:col-span-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-lime">
                Built for
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,9vw,3rem)] font-black leading-[0.98] tracking-[-0.045em] md:text-[clamp(3rem,4.6vw,4.5rem)]">
                Local businesses that are done juggling apps.
              </h2>
            </Reveal>
            <ul className="flex flex-wrap gap-2.5 md:col-span-5 md:justify-end">
              {service.detail.forWho.map((who, i) => (
                <Reveal
                  as="li"
                  key={who}
                  delay={i * 0.06}
                  className="rounded-full border border-white/20 bg-white/[0.05] px-5 py-3 text-[15px] font-semibold transition-colors duration-300 hover:bg-lime hover:text-ink"
                >
                  {who}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line bg-paper">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-7 py-20 md:grid-cols-12 md:px-10 md:py-28 lg:px-[4.5rem]">
            <Reveal className="md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-ink/60">
                FAQ
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,8vw,2.6rem)] font-black leading-[1] tracking-[-0.045em] md:text-[clamp(2.4rem,3.4vw,3.25rem)]">
                Questions owners ask.
              </h2>
            </Reveal>
            <div className="md:col-span-7">
              {service.detail.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-line py-6 first:border-t"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 text-[20px] leading-none transition-transform duration-300 group-open:rotate-45 group-open:bg-lime">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[600px] text-[16px] leading-relaxed text-muted">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="mx-auto max-w-[1440px] px-7 py-20 md:px-10 md:py-24 lg:px-[4.5rem]">
          <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-ink/60">
            More from Texh Co
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5">
            {others.map((s) => {
              const Icon = serviceIcons[s.id];
              const st = themes[s.theme];
              return (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className={`group flex h-full flex-col justify-between gap-12 rounded-[24px] p-7 transition-transform duration-500 hover:-translate-y-1 md:p-8 ${st.card}`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="size-6" strokeWidth={1.6} />
                      <ArrowUpRight
                        className="size-5 transition-transform duration-300 group-hover:rotate-45"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${st.label}`}
                      >
                        {s.label}
                      </p>
                      <p className="mt-3 font-display text-[24px] font-extrabold leading-[1.05] tracking-[-0.03em]">
                        {s.card.title[0]} {s.card.title[1]}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <LetsBuild source={service.slug} />
      </main>
      <Footer />
    </>
  );
}
