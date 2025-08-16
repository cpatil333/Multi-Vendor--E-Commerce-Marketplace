import { useQuery } from "@apollo/client";
import { GET_USER } from "../apollo/Query";

export const getUserById = async ({ params }) => {
  const userId = params.id;
  const { data } = useQuery(GET_USER, {
    variables: {
      userById: userId,
    },
  });
  try {
    const user = data;
    return user;
  } catch (error) {
    console.log("Error ", error.message);
  }
};
