import crypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import isAuth from "../utils/isAuth.js";

export const Mutation = {
  signin: async (parent, { register }, context) => {
    const { db } = context;

    const user = await db.user.findFirst({
      where: { email: register.email },
    });

    if (user) {
      throw new Error("Email is already exist!");
    }

    const hassedPassword = await crypt.hash(register.password, 10);

    const savedUser = await db.user.create({
      data: {
        ...register,
        password: hassedPassword,
      },
    });

    return savedUser;
  },

  signup: async (parent, { login }, context) => {
    const { db } = context;

    const user = await db.user.findFirst({
      where: { email: login.email },
    });

    if (!user) {
      throw new Error("Email does not exist!");
    }

    const matchedPassword = await bcrypt.compare(login.password, user.password);

    if (!matchedPassword) {
      throw new Error("Email and Password does not matched!");
    }

    const token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY
    );
    return { user, token };
  },

  profile: async (parent, { updateProfile }, context) => {
    const { db, user } = context;
    isAuth(user);

    const userId = await db.profile.findFirst({
      where: { userId: updateProfile.userId },
    });
    
    let updateData = "";
    if (!userId) {
      updateData = await db.profile.create({
        data: {
          name: updateProfile.name,
          address: updateProfile.address,
          phone: updateProfile.phone,
          imageUrl: updateProfile.imageUrl,
          userId: updateProfile.userId,
        },
      });
    } else {
      updateData = await db.profile.update({
        where: { userId: updateProfile.userId },
        data: {
          name: updateProfile.name,
          address: updateProfile.address,
          phone: updateProfile.phone,
          imageUrl: updateProfile.imageUrl,
        },
      });
    }

    return updateData;
  },

  editUser: async (parent, { userUpdate }, context) => {
    const { db, user } = context;
    isAuth(user);
    const userData = await db.user.findUnique({
      where: { id: userUpdate.id },
    });

    if (!userData) {
      throw new Error("User does not exist!");
    }

    const hassedPassword = await crypt.hash(userUpdate.password, 10);

    const saveData = await db.user.update({
      where: { id: userData.id },
      data: {
        email: userUpdate.email,
        password: hassedPassword,
        role: userUpdate.role,
      },
    });
    return saveData;
  },
};
