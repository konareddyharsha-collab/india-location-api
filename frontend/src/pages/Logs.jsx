import DashboardLayout from "../layouts/DashboardLayout";

function Logs() {

  const logs = [
    {
      endpoint: "/search",
      status: 200,
      response: "120ms",
    },
    {
      endpoint: "/autocomplete",
      status: 200,
      response: "90ms",
    },
  ];

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        API Logs
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">

          <tr>
            <th className="p-3 text-left">Endpoint</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Response Time</th>
          </tr>

        </thead>

        <tbody>

          {logs.map((log, index) => (

            <tr key={index} className="border-t">

              <td className="p-3">{log.endpoint}</td>
              <td className="p-3">{log.status}</td>
              <td className="p-3">{log.response}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </DashboardLayout>
  );
}

export default Logs;