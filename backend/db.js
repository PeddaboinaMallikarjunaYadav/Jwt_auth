require("dotenv").config;
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Malliyadav@1805",
  host: "localhost",
  port: 5432,
  database: "jwt_auth",
});

module.exports = pool;
