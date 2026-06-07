import LinkTable from "../components/LinkTable";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <AnalyticsDashboard />

      <LinkTable search="" />
    </div>
  );
}