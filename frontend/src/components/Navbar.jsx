import { useNavigate } from "react-router-dom";
import { clearAuth } from "../store/authStore";

function Navbar({ email }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="rounded-[24px] bg-white px-5 py-4 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-900">FluxOS</p>
          <p className="text-sm text-slate-500">API Billing Platform</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
            {email}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
