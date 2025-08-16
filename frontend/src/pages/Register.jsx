import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../apollo/Mutation";

export const registerData = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);
  } catch (error) {
    console.log(error.message);
  }
};

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "select",
  });
  const navigate = useNavigate();
  const [signin] = useMutation(USER_REGISTER, {
    onCompleted() {
      navigate("/login");
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
      if (formData.role === "select") {
        alert("Please select role");
        return;
      }
      const { data } = await signin({
        variables: {
          register: formData,
        },
      });
      if (data?.signin) {
        alert("Register has been successfully!");
        navigate("/login");
      } else {
        console.log("Register Error ", error.message);
        alert("Register failed, please enter proper data");
      }
    } catch (error) {
      console.error("Error in the Register ", error.message);
      throw Error;
    }
  };

  return (
    <div className="container">
      <h2>User Register</h2>
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
          <select name="role" onChange={handleChange}>
            <option value="select">Select</option>
            <option value="CUSTOMER">Customer</option>
            <option value="VENDOR">Vendor</option>
          </select>
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
