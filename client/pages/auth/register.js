import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Register = () => {
  const [val, setVal] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const { username, email, password } = val;

  const handleChange = (e) =>
    setVal({ ...val, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    if (!username || !email || !password) {
      setErr("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message);
        setErr(null);
        setVal({ username: "", email: "", password: "" });
      }
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form className="mt-5" onSubmit={handleSubmit}>
        <h3 className="text-center mb-5">Create an account</h3>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {err && <p className="text-danger text-center">{err}</p>}
        <div className="mb-3 text-center">
          <button
            className="btn btn-dark bg-gradient btn-sm"
            disabled={loading}
          >
            Register
          </button>
        </div>
        <div className="mb-3 text-center">
          Already a user? <Link href="/auth/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
