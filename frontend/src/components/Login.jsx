import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../apollo/Mutation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

export const loginData = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);
  } catch (error) {
    console.log(error.message);
  }
};

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [signup] = useMutation(USER_LOGIN, {
    onCompleted() {
      navigate("/");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({
        variables: {
          login: formData,
        },
      });
      if (data.signup) {
        dispatch(
          setCredentials({
            user: {
              userId: data.signup.user.id,
              email: data.signup.user.email,
              role: data.signup.user.role,
            },
            token: data.signup.token,
          })
        );
        navigate("/");
      } else {
        console.log("Invalid Login credential!");
      }
    } catch (error) {
      console.error("Error Login ", error.message);
      alert("Login failed, Please try again!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
