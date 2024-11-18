interface GraphCardProps {
  title: string;
  children: React.ReactNode;
}

export default function GraphCard({ title, children }: GraphCardProps) {
  return (
    <div className="bg-[var(--bg-z1)] rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-[var(--h1)] mb-4">{title}</h3>
      <div className="h-48 bg-[var(--bg-z0)] rounded-lg">{children}</div>
    </div>
  );
}
