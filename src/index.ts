import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import schema from "./data/schema";
import resolvers from "./data/resolvers";

dotenv.config();
const app = express();

app.use(
  "/",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const startServer = async () => {
  try {
    const dbUrl = process.env.DB_URL;
    const port = process.env.PORT;

    if (!dbUrl) {
      throw new Error("DB_URL is not defined in the environment variables");
    }
    if (!port) {
      throw new Error("PORT is not defined in the environment variables");
    }

    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
