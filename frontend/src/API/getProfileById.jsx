import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../apollo/Query";

export const getProfileById = ({ params }) => {
  const userId = params.id;
  try {
    const { data } = useQuery(GET_PROFILE, {
      variables: {
        userId: userId,
      },
    });
    const profileData = data;
    if (profileData) {
      return profileData;
    } else {
      return {
        userId: userId,
      };
    }
  } catch (error) {
    console.log(error.message);
  }
};
