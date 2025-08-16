import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const db = {
  user: prisma.user,
  profile: prisma.profile,
  vendorStore: prisma.vendorStore,
  product: prisma.product,
  productImage: prisma.productImage,
  order: prisma.order,
  orderItem: prisma.orderItem,
  cart: prisma.cart,
  cartItem: prisma.cartItem,
  review: prisma.review,
  notification: prisma.notification,
  message: prisma.message,
};
