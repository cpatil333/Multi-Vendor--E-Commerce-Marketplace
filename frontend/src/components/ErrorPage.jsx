import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  if (error.status === 404) {
    return (
      <div className="container">
        <h2>404 Error Page</h2>
        <p>Back to Home Page</p>
        <button onClick={() => navigate(-1)} className="btn">
          Go Back
        </button>
      </div>
    );
  }
};
