export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Uptime Dashboard",
  description: "Review your financial stuff from one place",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Transactions",
      href: "/transactions",
    },
    {
      label: "Reports",
      href: "/reports",
    },
    {
      label: "Budgets",
      href: "/budgets",
    },
    {
      label: "Notifications",
      href: "/notifications",
    },
  ],
};
