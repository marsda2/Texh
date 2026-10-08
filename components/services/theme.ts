// Shared by the client deck and the server-rendered service pages, so it must
// not live in a "use client" module.
import {
  AppWindow,
  ChartNoAxesColumn,
  Settings,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { CardTheme, ServiceId } from "@/content/site";

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  web: AppWindow,
  software: Settings,
  automation: Zap,
  growth: ChartNoAxesColumn,
};

export const themes: Record<
  CardTheme,
  {
    card: string;
    num: string;
    label: string;
    blurb: string;
    button: string;
    peek: string;
  }
> = {
  ink: {
    card: "bg-ink text-cream",
    num: "text-lime",
    label: "text-cream/85",
    blurb: "text-cream/65",
    button: "bg-lime text-ink hover:bg-white",
    peek: "bg-ink text-cream",
  },
  lime: {
    card: "bg-lime text-ink",
    num: "text-ink",
    label: "text-ink/80",
    blurb: "text-ink/70",
    button: "bg-ink text-lime hover:bg-ink-2",
    peek: "bg-lime text-ink",
  },
  paper: {
    card: "bg-[#fbfaf5] text-ink ring-1 ring-black/[0.06]",
    num: "text-ink",
    label: "text-ink/70",
    blurb: "text-ink/65",
    button: "bg-ink text-lime hover:bg-ink-2",
    peek: "bg-[#f1eee4] text-ink",
  },
  graphite: {
    card: "bg-[radial-gradient(120%_80%_at_80%_0%,#2b2f1f_0%,#181916_55%)] text-cream",
    num: "text-lime",
    label: "text-cream/85",
    blurb: "text-cream/65",
    button: "bg-lime text-ink hover:bg-white",
    peek: "bg-[#22241f] text-cream",
  },
};
