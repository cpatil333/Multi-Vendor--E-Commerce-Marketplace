import { db } from "../db.js";
import isAuth from "../utils/isAuth.js";

export const Query = {
  users: async (parent, args, context) => {
    const { db, user } = context;
    isAuth(user);
    return await db.user.findMany();
  },

  profiles: async (parent, args, context) => {
    const { db, user } = context;
    isAuth(user);
    return await db.profile.findMany();
  },

  userById: async (parent, { id }, context) => {
    const { db, user } = context;
    isAuth(user);

    const userId = id;
    const userIdData = await db.user.findUnique({
      where: { id: userId },
    });

    return userIdData;
  },
};
