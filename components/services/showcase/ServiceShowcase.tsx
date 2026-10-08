"use client";

import type { Service } from "@/content/site";
import { AutomationShowcase } from "./AutomationShowcase";
import { GrowthShowcase } from "./GrowthShowcase";
import { SoftwareShowcase } from "./SoftwareShowcase";
import { WebShowcase } from "./WebShowcase";

/** The interactive demo for a service page. Each service has its own. */
export function ServiceShowcase({ service }: { service: Service }) {
  switch (service.id) {
    case "web":
      return <WebShowcase service={service} />;
    case "software":
      return <SoftwareShowcase service={service} />;
    case "automation":
      return <AutomationShowcase service={service} />;
    case "growth":
      return <GrowthShowcase service={service} />;
  }
}
