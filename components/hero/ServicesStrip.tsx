import { AppWindow, ChartNoAxesColumn, Settings, Zap } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { services, type ServiceId } from "@/content/site";

const icons: Record<ServiceId, typeof AppWindow> = {
  web: AppWindow,
  software: Settings,
  automation: Zap,
  growth: ChartNoAxesColumn,
};

export function ServicesStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative z-30 border-t border-line bg-paper/70 backdrop-blur-sm ${className}`}
    >
      <ul className="mx-auto flex max-w-[1440px] items-center px-6 lg:px-12">
        {services.map((s, i) => {
          const Icon = icons[s.id];
          return (
            <Fragment key={s.id}>
              {i > 0 && (
                <li aria-hidden className="h-9 w-px shrink-0 bg-line" />
              )}
              <li className="flex-1">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-center gap-3 py-[clamp(0.9rem,2.4svh,1.5rem)] text-[13px] font-medium text-ink lg:gap-4 lg:text-[14px]"
                >
                  <Icon
                    className="size-6 shrink-0 transition-colors group-hover:text-lime-deep lg:size-7"
                    strokeWidth={1.4}
                  />
                  {s.label}
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
