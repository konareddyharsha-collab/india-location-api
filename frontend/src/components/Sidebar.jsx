import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-64 min-h-screen bg-blue-900 text-white p-5">

      <h1 className="text-3xl font-bold mb-10">
        Village API
      </h1>

      <div className="flex flex-col gap-5 text-xl">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/users">
          Users
        </Link>

        <Link to="/api-keys">
          API Keys
        </Link>

        <Link to="/logs">
          Logs
        </Link>

        <Link to="/settings">
          Settings
        </Link>

      </div>

    </div>

  );
}

export default Sidebar;