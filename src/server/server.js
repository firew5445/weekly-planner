const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());

console.log(process.env.JWT_SECRET);

const connection = mysql.createConnection({
  host: "localhost",
  user: "kaleab",
  password: "kalolani",
  database: "weekly_plan",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.post("/api/register", (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    sex,
    role,
    department,
    level,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql =
    "INSERT INTO users (firstName, lastName, username, email, password, sex, role, department, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    firstName,
    lastName,
    username,
    email,
    hashedPassword,
    sex,
    role,
    department,
    level,
  ];

  connection.execute(sql, values, (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      res.status(500).json({ error: "An error occurred during registration." });
      return;
    }

    console.log("User registered successfully:", result);
    res.status(200).json({ message: "Registration successful!" });
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  connection.execute(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Error logging in" });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const user = results[0];

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).send({
      id: user.id,
      username: user.username,
      role: user.role,
      accessToken: token,
    });
  });
});

// API endpoint to insert plans
app.post("/api/plans", (req, res) => {
  const plans = req.body;
  const values = plans.map((plan) => [
    plan.planNo,
    plan.name,
    plan.weeks.join(","),
    plan.feedback,
  ]);
  const sql =
    "INSERT INTO Plans (plan_no, plan_name, days_of_week, feedback) VALUES ?";
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    res.send({ message: "Plans created successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
