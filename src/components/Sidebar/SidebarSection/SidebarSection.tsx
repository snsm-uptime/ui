import Link from "next/link";

interface SidebarSectionProps {
  title: string;
  links: { name: string; href: string }[];
}

export default function SidebarSection({ title, links }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <h1 className="font-semibold mb-4 on-z1">{title}</h1>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <div className="hov-box on-z1">
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
