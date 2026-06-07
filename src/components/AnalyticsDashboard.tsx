import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, } from "recharts";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function AnalyticsDashboard() {
  const clicks =
  useQuery(
    api.clicks.getAllClicks
  ) || [];

  const clickData = [
    { day: "Mon", clicks: 10 },
    { day: "Tue", clicks: 20 },
    { day: "Wed", clicks: 15 },
    { day: "Thu", clicks: 40 },
    { day: "Fri", clicks: 25 },
  ];

  const deviceData =
    Object.entries(
      clicks.reduce(
        (acc: any, click: any) => {
          const device =
            click.device ||
            "unknown";

          acc[device] =
            (acc[device] || 0) + 1;

          return acc;
        },
        {}
      )
    ).map(([name, value]) => ({
      name,
      value,
    }));

  const referrerData = [
    { source: "Google", visits: 40 },
    { source: "Facebook", visits: 25 },
    { source: "Direct", visits: 15 },
  ];

  return (
    <div className="space-y-8">

      <div className="border p-4 rounded">
        
        <h2 className="font-bold mb-4">
          Clicks Over Time
        </h2>

        <p>Total Click Records:
          {clicks.length}
        </p>

        <LineChart
          width={600}
          height={300}
          data={clickData}
        >
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line dataKey="clicks" />
        </LineChart>
      </div>

      <div className="border p-4 rounded">
        <h2 className="font-bold mb-4">
          Device Breakdown
        </h2>

        <PieChart width={400} height={300}>
          <Pie
            data={deviceData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {deviceData.map((_, index) => (
              <Cell key={index} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="border p-4 rounded">
        <h2 className="font-bold mb-4">
          Top Referrers
        </h2>

        <BarChart
          width={600}
          height={300}
          data={referrerData}
        >
          <XAxis dataKey="source" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="visits" />
        </BarChart>
      </div>
    </div>
  );
}