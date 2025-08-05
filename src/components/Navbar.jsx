import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 py-3 px-6 shadow flex justify-between items-center">
      <div className="text-xl font-bold text-blue-700">
        <Link to="/">TaskManager</Link>
      </div>

      <div className="flex gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>

        {!token && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/signup" className="text-gray-700 hover:text-blue-600">
              Signup
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
