const express = require("express");
const pool = require("./db.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users(username, password_hashed) VALUES($1, $2)`,
      [username, hashedPassword],
    );

    res.status(201).json({ message: "User Successfully Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  console.log("The password is: ", password);
  console.log("The username is: ", username);
  try {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    const user = result.rows[0];
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bcrypt = require("bcrypt");
    const isMatched = await bcrypt.compare(password, user.password_hashed);

    if (!isMatched) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "The server is running" });
});

app.listen(5000, () => {
  console.log("The server is running on http://localhost:5000");
});
