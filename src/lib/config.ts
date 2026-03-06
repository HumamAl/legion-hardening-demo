// App configuration — single source of truth for all identity/attribution text.
// Layout Builder populates these values from the Creative Brief.

export type AestheticProfile =
  | "linear"
  | "bold-editorial"
  | "warm-organic"
  | "corporate-enterprise"
  | "dark-premium"
  | "neobrutalism"
  | "nature-wellness"
  | "data-dense"
  | "saas-modern"
  | "e-commerce";

export type DemoFormat =
  | "dashboard-app"
  | "mobile-app-preview"
  | "landing-page"
  | "multi-screen-walkthrough"
  | "split-panel-demo"
  | "admin-console";

export type DeviceModel =
  | "iphone-15-pro"
  | "pixel-8"
  | "ipad-pro"
  | "generic-phone"
  | "chrome-browser"
  | "safari-browser";

export const APP_CONFIG = {
  appName: "Legion Integrity",
  projectName: "VILL-50 Legion",
  clientName: null as string | null,
  domain: "ai-testing",
  aesthetic: "dark-premium" as AestheticProfile,
  demoFormat: "dashboard-app" as DemoFormat,
  deviceModel: undefined as DeviceModel | undefined,
  screenCount: undefined as number | undefined,
} as const;
