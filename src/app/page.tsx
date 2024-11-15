// app/page.tsx
import Card from "@/components/DataCard";
import GraphCard from "@/components/GraphCard";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 bg-[var(--bg-z0)] text-[var(--h2)]">
      <h1 className="text-primary">Sebastians Dashbaord</h1>
      {/* Row of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          label="Total Balance"
          value="$12,345.67"
          color="text-primary-200"
        />
        <Card
          label="Income"
          value="$4,567.89"
          color="text-green-200 dark:text-green-100"
        />
        <Card label="Expenses" value="$1,234.56" color="text-red-500" />
        <Card label="Savings" value="$6,789.01" color="text-blue-500" />
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GraphCard title="Monthly Spending">
          {/* Replace this div with actual chart component */}
          <div className="h-full bg-gray-200 dark:bg-gray-700 rounded-lg">
            Line Chart Placeholder
          </div>
        </GraphCard>
        <GraphCard title="Expense Distribution">
          {/* Replace this div with actual chart component */}
          <div className="h-full bg-gray-200 dark:bg-gray-700 rounded-lg">
            Pie Chart Placeholder
          </div>
        </GraphCard>
      </div>
    </div>
  );
}
