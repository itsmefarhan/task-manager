import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const Header = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const router = useRouter();
  let token =
    Cookie.get("tmToken") !== undefined && Cookie.get("tmToken");

  const handleLogout = () => {
    Cookie.remove("tmToken");
    Cookie.remove("tmUser");
    router.replace("/auth/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark bg-gradient navbar-dark mb-5">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Task Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token && hasMounted ? (
              <>
                {/* <li className="nav-item">
                  <Link className="nav-link" href="/new_post">
                    Add Post
                  </Link>
                </li> */}
                <li className="nav-item mt-1">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
