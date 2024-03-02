import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="  mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold m-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div>
        <p className="text-center mt-7">
          Dont have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </p>
      </div>
      {error && <p className="text-red-500 text-center mt-5">{error}</p>}
    </div>
  );
}
