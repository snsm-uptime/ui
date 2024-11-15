interface CardProps {
  label: string;
  value: string;
  color?: string; // Optional color for the value text
}

export default function Card({ label, value, color }: CardProps) {
  return (
    <div className="dark:bg-[var(--bg-z1)] rounded-lg p-4 transition-shadow shadow-elevation-1 dark:shadow-sm">
      <h3 className="text-lg font-semibold text-[var(--h1)]">{label}</h3>
      <p className={`text-2xl font-bold ${color || "text-[var(--h1)]"}`}>
        {value}
      </p>
    </div>
  );
}
