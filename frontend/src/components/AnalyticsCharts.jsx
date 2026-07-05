import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const data = [
  { name: "Mon", requests: 400 },
  { name: "Tue", requests: 700 },
  { name: "Wed", requests: 500 },
  { name: "Thu", requests: 900 },
];

const pieData = [
  { name: "Free", value: 400 },
  { name: "Premium", value: 300 },
  { name: "Pro", value: 200 },
];

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
];

function AnalyticsCharts() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

      <div className="bg-white p-4 rounded shadow">

        <h2 className="text-xl font-bold mb-4">
          API Requests
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="requests"
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="bg-white p-4 rounded shadow">

        <h2 className="text-xl font-bold mb-4">
          User Plans
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >

              {pieData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="bg-white p-4 rounded shadow lg:col-span-2">

        <h2 className="text-xl font-bold mb-4">
          Response Time Trends
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="requests"
              stroke="#dc2626"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalyticsCharts;