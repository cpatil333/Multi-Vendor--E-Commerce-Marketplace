import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../apollo/Query.jsx";

export const profileLoader = () => {
  const { data, loading, error } = useQuery(GET_PROFILE, {
    fetchPolicy: "network-only",
  });
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log("Error, ", error.message);
  }
  try {
    console.log(data);
    const profileData = data;
    return profileData;
  } catch (error) {
    console.log("Error ", error.message);
    console.error("Errot in the Fething data");
  }
};
