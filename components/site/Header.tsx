"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { TexhcoLogo } from "@/components/brand/TexhcoLogo";
import { nav, site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="relative z-40 mx-auto flex w-full max-w-[1440px] items-center justify-between px-7 pt-4 md:px-10 md:pt-[clamp(0.75rem,2vh,1.5rem)] lg:px-[4.5rem]">
      <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
        <TexhcoLogo className="h-[26px] w-auto lg:h-[28px]" />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-11 lg:flex">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[14px] font-medium text-ink/85 transition-colors hover:text-ink"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink pl-5 pr-4 text-[14px] font-semibold text-white transition-colors hover:bg-ink-2"
        >
          Let&rsquo;s talk
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      </nav>

      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 transition-colors hover:border-ink lg:hidden"
      >
        <span className="flex w-[18px] flex-col gap-[5px]">
          <span className="h-[1.5px] w-full rounded bg-ink" />
          <span className="h-[1.5px] w-full rounded bg-ink" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-ink px-7 pb-10 pt-6 text-cream md:px-10"
            initial={{ clipPath: "circle(0% at calc(100% - 50px) 50px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 50px) 50px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 50px) 50px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <TexhcoLogo ink="var(--cream)" className="h-[26px] w-auto" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-auto flex flex-col gap-2">
              {[...nav, { label: "Contact", href: "/#contact" }].map(
                (item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-[clamp(2.75rem,13vw,4.5rem)] font-black leading-[1.02] tracking-[-0.04em] hover:text-lime"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>

            <div className="mt-10 flex items-end justify-between text-sm text-cream/60">
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
              <span className="text-[10px] uppercase tracking-[0.35em]">
                NJ / NY
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
