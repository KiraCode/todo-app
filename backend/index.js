import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./utils/db.js";

const app = express();
const port = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// db
db();

// routes

// connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}...😥`);
});
