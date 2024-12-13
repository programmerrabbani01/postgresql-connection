import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import pkg from "pg";

// Destructure Pool

const { Pool } = pkg;

//  config dotenv

dotenv.config();

// Load environment variables from.env file

const PORT = process.env.PORT || 6060;

// app initialization
const app = express();

// middleware to parse JSON request bodies

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect postgresql server

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  port: parseInt(process.env.DB_PORT),
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error(err.message);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to PostgreSQL database".bgGreen.bold);
  });
});

// app listeners

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.yellow.bold);
});
