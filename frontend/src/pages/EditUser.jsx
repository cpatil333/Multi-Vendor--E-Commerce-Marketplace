import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_UPDATE } from "../apollo/Mutation";

export const editUserData = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);
  } catch (error) {
    console.log(error.message);
  }
};

export const EditUser = () => {
  const user = useLoaderData();
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    role: "select",
  });
  const navigate = useNavigate();
  const [editUser] = useMutation(USER_UPDATE, {
    onCompleted() {
      navigate("/home");
    },
  });

  useEffect(() => {
    if (user.userById) {
      setFormData({
        id: user.userById.id,
        email: user.userById.email,
        password: user.userById.password,
        role: user.userById.role,
      });
    }
  }, [user]);

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

      const { data } = await editUser({
        variables: {
          userUpdate: {
            id: formData.id,
            ...formData,
          },
        },
      });

      if (data?.editUser) {
        alert("User updated successfully!");
        navigate("/Home");
      } else {
        console.log("User update Error ", error.message);
        alert("User Update failed, please enter proper data");
      }
    } catch (error) {
      console.error("Error in the User Update ", error.message);
      throw Error;
    }
  };

  return (
    <div className="container">
      <h2>User Update</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="select">Select</option>
            <option value="CUSTOMER">Customer</option>
            <option value="VENDOR">Vendor</option>
          </select>
        </div>
        <div>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
