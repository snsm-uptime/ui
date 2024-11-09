import Link from "next/link";

interface SidebarSectionProps {
  title: string;
  links: { name: string; href: string }[];
}

export default function SidebarSection({ title, links }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4 text-[var(--h1)]">{title}</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <div className="rounded-lg hover:bg-[var(--bg-z0)] text-[var(--h2)] dark:hover:text-[var(--h1)] hover:text-[var(--bg-z1)] p-2 transition-colors">
              <Link href={link.href} className="block">
                {link.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
