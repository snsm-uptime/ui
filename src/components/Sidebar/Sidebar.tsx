import SidebarButtonGroup from "./SidebarButtonGroup/SidebarButtonGroup";
import SidebarSection from "./SidebarSection/SidebarSection";

export default function Sidebar() {
  return (
    <aside className="w-64 p-4 flex flex-col bg-secondary-500 dark:bg-black-500">
      <nav className="space-y-6">
        <SidebarSection
          title="Dashboard"
          links={[{ name: "Dashboard Overview", href: "/dashboard" }]}
        />
        <SidebarSection
          title="Transactions"
          links={[
            { name: "View Transactions", href: "/transactions" },
            {
              name: "Transaction Reports",
              href: "/transactions/reports",
            },
          ]}
        />
      </nav>
      <SidebarButtonGroup />
    </aside>
  );
}
