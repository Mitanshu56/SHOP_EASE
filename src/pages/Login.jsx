import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

import Button from "../components/Button";
import AuthContext from "../context/AuthContext";
import { login as loginUser } from "../services/auth";

export default function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const user = await loginUser(
        formData.email,
        formData.password
      );

      login(user);

      const redirectTo =
        location.state?.from || "/";

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">
        Log In
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6"
      >
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Email

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Password

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <Button
          type="submit"
          variant="primary"
          className="mt-2 w-full py-3"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}