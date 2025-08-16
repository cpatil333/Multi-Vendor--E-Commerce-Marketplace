import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    if (!token && path !== "/login" && path !== "/register") {
      navigate("/login");
    }
  }, [token, path, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar">
        <ul>
          {token ? (
            <>
              <li>
                <Link to="/home" className="Link">
                  Users
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout} className="Link">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="Link">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="Link">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
