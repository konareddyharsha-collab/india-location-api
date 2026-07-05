import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Topbar;