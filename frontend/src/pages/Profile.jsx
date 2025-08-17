import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { USER_PROFILE } from "../apollo/Mutation";

export const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    imageUrl: "",
    userId: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const profileData = useLoaderData();
  //console.log(profileData);
  const [userProfile] = useMutation(USER_PROFILE, {
    onCompleted() {
      navigate("/home");
    },
  });

  useEffect(() => {
    if (profileData?.profileById) {
      setFormData({
        name: profileData.profileById.name,
        address: profileData.profileById.address,
        phone: profileData.profileById.phone,
        imageUrl: profileData.profileById.imageUrl,
        userId: profileData.profileById.userId,
      });
    } else {
      setFormData({
        name: "",
        address: "",
        phone: "",
        imageUrl: "",
        userId: profileData.userId,
      });
    }
  }, [profileData]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    try {
      let uploadFileName = "";
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("imageUrl", selectedFile);

        try {
          const response = await fetch("http://localhost:4000/uploads", {
            method: "POST",
            body: fileData,
          });

          const contentType = response.headers.get("content-type") || "";

          if (!contentType.includes("application/json")) {
            // only error if it’s *not* JSON
            const text = await response.text();
            throw new Error("Server returned non-JSON: " + text);
          }

          const result = await response.json();
          uploadFileName = result.fileName;
        } catch (error) {
          console.log("uploaded filed ", error.message);
          return;
        }
      }

      const { data } = await userProfile({
        variables: {
          updateProfile: {
            userId: formData.userId,
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            imageUrl: uploadFileName,
          },
        },
      });

      if (data?.profile) {
        alert("User Profile udpate successfully!");
      } else {
        alert("User Profile failed!");
      }
    } catch (error) {
      console.error("User Profile added error ", error.message);
      alert("User Profile failed, Please check data!");
    }
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            type="text"
            name="address"
            value={formData.address}
            placeholder="Address"
            onChange={handleChange}
            rows={5}
            cols={35}
          ></textarea>
        </div>
        <div>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="file"
            name="imageUrl"
            placeholder="Image"
            onChange={handleFileChange}
          />
          <br />
          <label>{formData.imageUrl}</label>
        </div>
        <br />
        <div>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
