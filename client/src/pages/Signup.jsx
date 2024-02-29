import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div className="  mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold m-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="p-3 rounded-lg border border-gray-300"
          required
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 border rounded-lg border-gray-300 "
          required
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 border rounded-lg border-gray-300"
          required
        />

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80"
        >
          Signup
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
    </div>
  );
}
