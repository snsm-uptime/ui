import Link from "next/link";

interface SidebarSectionProps {
  title: string;
  links: { name: string; href: string }[];
}

export default function SidebarSection({ title, links }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4 text-secondary-200 dark:text-white-600">
        {title}
      </h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-secondary-300 hover:text-secondary-100 dark:text-white-500"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
