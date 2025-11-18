import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// db

// routes

// connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}...😥`);
});
