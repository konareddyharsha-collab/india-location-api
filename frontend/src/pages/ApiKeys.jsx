import DashboardLayout from "../layouts/DashboardLayout";

function ApiKeys() {

  const apiKeys = [
    {
      name: "Production",
      key: "ak_xxxxxxxx",
      status: "Active",
    },
  ];

  return (
    <DashboardLayout>

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          API Keys
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate Key
        </button>

      </div>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">

          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">API Key</th>
            <th className="p-3 text-left">Status</th>
          </tr>

        </thead>

        <tbody>

          {apiKeys.map((item, index) => (

            <tr key={index} className="border-t">

              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.key}</td>
              <td className="p-3">{item.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </DashboardLayout>
  );
}

export default ApiKeys;