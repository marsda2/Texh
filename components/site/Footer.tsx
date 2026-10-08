import Link from "next/link";
import { TexhcoLogo } from "@/components/brand/TexhcoLogo";
import { nav, services, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1440px] px-7 pb-10 pt-16 md:px-10 lg:px-[4.5rem]">
      <div className="grid gap-10 border-b border-line pb-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <TexhcoLogo className="h-8 w-auto" />
          <p className="mt-5 max-w-[320px] text-[15px] leading-relaxed text-muted">
            Websites, software and automation for local businesses. Built to
            grow your business.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/45">
            Studio
          </p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-lime-deep">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contact" className="hover:text-lime-deep">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/45">
            Services
          </p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-lime-deep"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/45">
            Say hi
          </p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-4 inline-block text-[15px]"
          >
            {site.email}
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 text-[12px] text-ink/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
          <p className="uppercase tracking-[0.45em]">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
