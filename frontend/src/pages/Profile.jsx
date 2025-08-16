import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { USER_PROFILE } from "../apollo/Mutation";

export const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const [profile] = useMutation(USER_PROFILE, {
    onCompleted() {
      navigate("/home");
    },
  });
  const params = useParams();
  const userId = params.id;

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
            const text = await response.text();
            throw new Error("Server returned non-JSON" + text);
          }
          const result = await response.json();
          uploadFileName = result.fileName;
        } catch (error) {
          console.log("uploaded filed ", error.message);
          return;
        }
      }

      const { data } = await profile({
        newProfile: {
          ...formData,
          userId: params.id,
          imageUrl: uploadFileName,
        },
      });

      if (data?.profile) {
        alert("User Profiel udpate successfully!");
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
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            type="text"
            name="address"
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
