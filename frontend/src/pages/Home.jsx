import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const userList = useLoaderData();
  //console.log(userList);

  return (
    <div className="container">
      <h2>User List</h2>
      <div>
        <button className="btn" onClick={() => navigate(`/register`)}>
          Add User
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.users.map((user) => (
            <tr>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="editbtn"
                  onClick={() => navigate(`/edit-user/` + user.id)}
                >
                  Edit
                </button>
                <button className="deletebtn">Delete</button>
                <button
                  className="profilebtn"
                  onClick={() => navigate(`/profile/` + user.id)}
                >
                  Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
