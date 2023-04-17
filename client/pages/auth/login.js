import React, { useState } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [val, setVal] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const { email, password } = val;

  const handleChange = (e) =>
    setVal({ ...val, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    if (!email || !password) {
      setErr("All fields are required");
      setLoading(false);
      return;
    }
    try {
      let fd = new FormData();
      fd.append("username", email);
      fd.append("password", password);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        body: fd,
      });
      const result = await res.json();
      if (res.ok) {
        Cookie.set("tmToken", result.access_token);
        Cookie.set("tmUser", JSON.stringify(result.uid));
        setErr(null);
        setVal({ email: "", password: "" });
        router.replace("/");
      } else {
        setErr(result.detail);
      }
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="mt-5" onSubmit={handleSubmit}>
        <h3 className="text-center mb-5">Log into your account</h3>
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
            Login
          </button>
        </div>
        <div className="mb-3 text-center">
          Not a user? <Link href="/auth/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
