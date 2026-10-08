"use client";

import Link from "next/link";
import type { Ref } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/site";
import { GlassDevice, screens } from "./Illustrations";
import { serviceIcons, themes } from "./theme";

/**
 * One card of the services deck. `content` and `peek` refs let the deck
 * cross-fade between the full card and the edge that peeks out from behind.
 */
export function ServiceCard({
  service,
  index,
  total,
  active,
  cardRef,
  contentRef,
  peekRef,
}: {
  service: Service;
  index: number;
  total: number;
  active: boolean;
  cardRef?: Ref<HTMLElement>;
  contentRef?: Ref<HTMLDivElement>;
  peekRef?: Ref<HTMLDivElement>;
}) {
  const t = themes[service.theme];
  const Screen = screens[service.id];
  const Icon = serviceIcons[service.id];
  const n = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={cardRef}
      aria-label={`${n}. ${service.label}`}
      inert={!active}
      className={`absolute inset-x-0 top-0 h-[var(--card-h)] origin-bottom overflow-hidden rounded-[28px] shadow-[0_30px_60px_-28px_rgba(17,17,17,0.55)] will-change-transform md:rounded-[34px] ${t.card}`}
      style={{ zIndex: total - index }}
    >
      <div
        ref={contentRef}
        className="flex h-full flex-col px-6 pb-6 pt-6 md:grid md:grid-cols-[1.15fr_1fr] md:grid-rows-[auto_minmax(0,1fr)_auto] md:gap-x-10 md:px-10 md:pb-9 md:pt-8"
      >
        <div className="flex items-center justify-between md:col-span-2">
          <p className="font-display text-[26px] font-extrabold tracking-[-0.02em] md:text-[30px]">
            <span className={t.num}>{n}</span>
            <span className="ml-2 text-[0.62em] font-semibold opacity-60">
              / {String(total).padStart(2, "0")}
            </span>
          </p>
          <p
            className={`text-[10px] font-semibold uppercase tracking-[0.38em] md:text-[11px] ${t.label}`}
          >
            {service.label}
          </p>
        </div>

        {/* Illustration: the part that shrinks on short screens */}
        <div className="relative my-3 min-h-0 flex-1 [container-type:size] md:col-span-2 md:my-4">
          <div className="absolute left-1/2 top-1/2 w-[min(92cqw,calc(100cqh*1.25))] -translate-x-1/2 -translate-y-1/2">
            <GlassDevice theme={service.theme} active={active}>
              <Screen theme={service.theme} active={active} />
            </GlassDevice>
          </div>
        </div>

        <h3 className="font-display text-[clamp(1.85rem,8.4vw,2.6rem)] font-black leading-[1.02] tracking-[-0.045em] md:self-end md:text-[clamp(1.9rem,2.5vw,2.6rem)]">
          {service.card.title[0]}
          <br />
          {service.card.title[1]}
        </h3>

        <div className="flex flex-col items-start md:self-end">
          <p
            className={`mt-3 max-w-[340px] text-[16px] leading-snug md:mt-0 md:text-[16px] ${t.blurb}`}
          >
            {service.card.blurb}
          </p>
          <Link
            href={`/services/${service.slug}`}
            className={`group mt-5 inline-flex h-12 items-center gap-2 rounded-full pl-6 pr-5 text-[16px] font-semibold transition-colors md:mt-4 ${t.button}`}
          >
            Learn more
            <ArrowUpRight
              className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </Link>
        </div>
      </div>

      {/* The edge that shows while the card waits behind the active one */}
      <div
        ref={peekRef}
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 flex h-[var(--peek)] items-center gap-5 px-6 opacity-0 md:px-10 ${t.peek}`}
      >
        <span className="font-display text-[17px] font-extrabold">{n}</span>
        <span className="flex-1 text-[10px] font-semibold uppercase tracking-[0.38em]">
          {service.label}
        </span>
        <Icon className="size-5" strokeWidth={1.7} />
      </div>
    </article>
  );
}
