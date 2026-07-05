import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardCard from "../components/DashboardCard";
import AnalyticsCharts from "../components/AnalyticsCharts";

function Dashboard() {

  const [stats, setStats] = useState({
    totalUsers: 1200,
    totalRequests: 250000,
    responseTime: "120ms",
    revenue: "$4500",
  });

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/analytics/stats")
      .then((res) => {

        console.log(res.data);

        setStats(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);

  return (

    <DashboardLayout>

      <div className="p-6 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
          />

          <DashboardCard
            title="API Requests"
            value={stats.totalRequests}
          />

          <DashboardCard
            title="Response Time"
            value={stats.responseTime}
          />

          <DashboardCard
            title="Revenue"
            value={stats.revenue}
          />

        </div>

        <AnalyticsCharts />

      </div>

    </DashboardLayout>

  );
}

export default Dashboard;