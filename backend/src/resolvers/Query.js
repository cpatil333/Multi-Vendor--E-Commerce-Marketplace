import { db } from "../db.js";
import isAuth from "../utils/isAuth.js";

export const Query = {
  users: async (parent, arg, context) => {
    const { db, user } = context;
    isAuth(user);
    return await db.user.findMany();
  },
};
