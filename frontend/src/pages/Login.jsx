import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../services/api";
import { getToken, saveAuth } from "../store/authStore";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = getToken();

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = { email, password };

      const data = isSignup ? await signupUser(payload) : await loginUser(payload);

      if (isSignup) {
        setSuccess("Signup successful. You can login now.");
        setIsSignup(false);
        setPassword("");
        return;
      }

      saveAuth(data, email);
      navigate("/dashboard");
    } catch (fetchError) {
      if (fetchError.message === "Failed to fetch") {
        setError(
          "Unable to reach the backend. Make sure Spring Boot is running on port 8080."
        );
      } else {
        setError(fetchError.message || "Request failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-0 overflow-hidden rounded-[30px] bg-white shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden bg-[linear-gradient(160deg,#081225_0%,#0b2342_54%,#0f8cff_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="mb-6 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm">
              FluxOS - API Billing Platform
            </p>
            <h1 className="max-w-md text-4xl font-bold leading-tight">
              Track usage, plans, keys, and gateway activity from one dashboard.
            </h1>
            <p className="mt-5 max-w-md text-sm text-slate-200">
              A clean React frontend for your Spring Boot billing platform with
              login, analytics, billing, logs, and API playground.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-slate-200">Plans</p>
                <p className="mt-2 text-2xl font-semibold">FREE / PRO</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-slate-200">Auth</p>
                <p className="mt-2 text-2xl font-semibold">JWT Ready</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-slate-200">Gateway</p>
                <p className="mt-2 text-2xl font-semibold">Live Data</p>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-200">
                Project flow
              </p>
              <p className="mt-3 text-base leading-7 text-slate-100">
                Login with JWT, generate API keys, track usage, test gateway
                data, and upgrade from FREE to PRO.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
              FluxOS
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {isSignup ? "Create account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {isSignup
                ? "Sign up with your email and password."
                : "Login to open your billing dashboard."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                  required
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-brand-500 px-4 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-70"
              >
                {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              {isSignup ? "Already have an account?" : "Need an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                  setSuccess("");
                }}
                className="font-semibold text-brand-600"
              >
                {isSignup ? "Login here" : "Create one"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
