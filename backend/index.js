import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../backend/src/schema/Schema.js";
import { Mutation } from "../backend/src/resolvers/Mutation.js";
import { Query } from "../backend/src/resolvers/Query.js";
import { db } from "../backend/src/db.js";
import { expressMiddleware } from "@apollo/server/express4";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation,
    Query,
  },
  context: () => {
    db;
  },
});
await server.start();

app.use((req, res, next) => {
  if (!req.body && process.env.NODE_ENG !== "production") {
    req.body = {};
  }
  next();
});

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: ({ req }) => {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;
      let user = null;

      if (token) {
        try {
          user = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
          console.log("JWT error ", error.message);
        }
      }
      return { user, db };
    },
  })
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
