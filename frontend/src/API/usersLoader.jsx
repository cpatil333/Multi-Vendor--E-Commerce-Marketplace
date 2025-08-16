import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../apollo/Query";

export const usersLoader = () => {
  const { data, loading, error } = useQuery(GET_USERS, {
    fetchPolicy: "network-only",
  });
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log("Error, ", error.message);
  }
  try {
    console.log(data);
    const usersData = data;
    return usersData;
  } catch (error) {
    console.log("Error ", error.message);
    console.error("Errot in the Fething data");
  }
};
