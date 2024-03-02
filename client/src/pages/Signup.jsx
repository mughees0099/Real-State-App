import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="  mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold m-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="p-3 rounded-lg border border-gray-300"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 border rounded-lg border-gray-300 "
          required
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 border rounded-lg border-gray-300"
          required
          onChange={handleChange}
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div>
        <p className="text-center mt-7">
          Already have an account?{" "}
          <Link to={"/signin"}>
            <span className="text-blue-700">Sign In</span>
          </Link>
        </p>
      </div>
      {error && <p className="text-red-500 text-center mt-5">{error}</p>}
    </div>
  );
}
