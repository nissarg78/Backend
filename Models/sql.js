const pgp = require('pg-promise')();
const dotenv = require('dotenv');

// Load environment variables from a .env file (optional)
dotenv.config();

const PORT= 5432
const pass= "admin"
const dbConfig = {
  host: "localhost",
  port: PORT,
  database: "research_db",
  user: "postgres",
  password: pass,
};



// Create a database instance
const db = pgp(dbConfig);

module.exports = db;
