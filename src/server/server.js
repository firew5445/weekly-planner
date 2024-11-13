
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const util = require("util");
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
  user: "root",
  password: "",
  database: "weekly_plan_muke",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});
connection.query = util.promisify(connection.query);

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

// Create the Plans table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS Plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plan_name VARCHAR(255) NOT NULL,
  days_of_week VARCHAR(255) NOT NULL,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
`;
connection.query(createTableQuery, (err, result) => {
  if (err) throw err;
  console.log("Plans table ready");
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  let token;
  try {
    token = authHeader.replace("Bearer ", "");
  } catch (error) {
    return res.status(400).json({ error: "Malformed token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user info to the request
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// POST new plans
app.post("/api/plans", authenticateJWT, (req, res) => {
  const { plans } = req.body;
  const userId = req.user.id; // Assuming the user ID is in the JWT payload

  console.log(userId);

  const values = plans.map((plan) => [
    plan.plan_name,
    JSON.stringify(plan.days_of_week), // Convert days_of_week to JSON string
    userId,
  ]);


const query = `
    INSERT INTO Plans (plan_name, days_of_week, user_id)
    VALUES ?
  `;

  connection.query(query, [values], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Error adding plans" });
    }

    // Fetch the user's name for notification
    const sqlGetUserName = `
      SELECT username FROM users WHERE id = ?
    `;

    connection.query(sqlGetUserName, [userId], (error, results) => {
      if (error) {
        console.error("Error fetching user name:", error.message, error);
        return res.status(500).json({ error: "Failed to fetch user name" });
      }

      const userName = results[0]?.username || "User";
      const message = `${userName} submitted new plans`;

      // Insert the notification
      const sqlInsertNotification = `
        INSERT INTO notifications (user_id, message)
        VALUES (?, ?)
      `;

      connection.query(sqlInsertNotification, [userId, message], (error) => {
        if (error) {
          console.error("Error creating notification:", error.message, error);
          return res
            .status(500)
            .json({ error: "Failed to create notification" });
        }

        res
          .status(201)
          .json({ message: "Plans and notification created successfully" });
      });
    });
  });
});

// Route to get received plans with user information
app.get("/api/received_plans", authenticateJWT, (req, res) => {
  // Update SQL query to join with the users table and fetch the username for all plans
  const sqlSelect = `
    SELECT plans.id, 
           plans.plan_name, 
           plans.days_of_week, 
           plans.feedback, 
           plans.created_at, 
           users.username 
    FROM plans
    JOIN users ON plans.user_id = users.id`;

  connection.query(sqlSelect, (error, results) => {
    if (error) {
      console.error("Error fetching plans:", error.message, error);
      return res
        .status(500)
        .json({ error: "Failed to fetch plans", details: error.message });
    }
    console.log("Fetched plans:", results);
    res.status(200).json(results);
  });
});

// Approve plan
app.post("/api/approve_plan", (req, res) => {
  const { planId } = req.body;

  if (!planId) {
    return res.status(400).json({ error: "Plan ID is required" });
  }

  try {
    const sqlUpdate = "UPDATE plans SET feedback = ? WHERE id = ?";
    const values = ["approved", planId];
    connection.query(sqlUpdate, values, (error, results) => {
      if (error) {
        console.error("Error updating plan:", error);
        return res.status(500).json({ error: "Failed to update plan" });
      }
      console.log("Plan updated successfully");
      res.status(200).json({ message: "Plan updated successfully" });
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ error: "Failed to update plan" });
  }
});

// Route to get plans for a specific user
app.get("/api/user_plans", authenticateJWT, (req, res) => {
  const userId = req.user.id; // Get the user ID from the JWT payload

  const query = `
    SELECT plan_name, days_of_week, feedback
    FROM Plans
    WHERE user_id = ?;
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Error fetching user plans" });
    }
    res.json(results);
  });
});

// POST new reports
app.post("/api/reports", authenticateJWT, (req, res) => {
  const { reports } = req.body;
  const userId = req.user.id;

  console.log("Received data:", { reports, userId });

  // First, insert the reports
  const sqlInsert = `
    INSERT INTO reports (report_no, name, status, reason, user_id)
    VALUES ?`;

  const values = reports.map((report) => [
    report.reportNo,
    report.name,
    report.status,
    report.reason,
    userId,
  ]);


connection.query(sqlInsert, [values], (error, results) => {
    if (error) {
      console.error("Error creating reports:", error.message, error);
      return res
        .status(500)
        .json({ error: "Failed to create reports", details: error.message });
    }

    // Fetch the user's name
    const sqlFetchUserName = `
      SELECT username
      FROM users
      WHERE id = ?
    `;

    connection.query(sqlFetchUserName, [userId], (error, userResults) => {
      if (error) {
        console.error("Error fetching user name:", error.message, error);
        return res.status(500).json({ error: "Failed to fetch user name" });
      }

      const userName = userResults[0]?.username;
      if (!userName) {
        return res.status(500).json({ error: "User not found" });
      }

      // Insert notification with user's name
      const sqlInsertNotification = `
        INSERT INTO notifications (user_id, message)
        VALUES (?, ?)
      `;
      const message = `${userName} has submitted new reports`;

      connection.query(sqlInsertNotification, [userId, message], (error) => {
        if (error) {
          console.error("Error creating notification:", error.message, error);
          return res
            .status(500)
            .json({ error: "Failed to create notification" });
        }

        res.status(201).json({
          message: "Reports and notification created successfully",
          reportIds: results.insertId,
        });
      });
    });
  });
});

// app.put("/api/reports/:id", authenticateJWT, (req, res) => {
//   const { id } = req.params;
//   const { name, status, reason } = req.body;

//   const sqlUpdate =
//     "UPDATE reports SET name = ?, status = ?, reason = ? WHERE id = ?";
//   const values = [name, status, reason, id];

//   connection.query(sqlUpdate, values, (error, results) => {
//     if (error) {
//       console.error("Error updating report:", error.message, error);
//       return res
//         .status(500)
//         .json({ error: "Failed to update report", details: error.message });
//     }
//     res.status(200).json({ message: "Report updated successfully" });
//   });
// });

app.get("/api/received_reports", authenticateJWT, (req, res) => {
  const sqlSelect = `
    SELECT reports.id, 
           reports.name, 
           reports.status, 
           reports.reason, 
           reports.created_at, 
           users.username 
    FROM reports
    JOIN users ON reports.user_id = users.id`;

  connection.query(sqlSelect, (error, results) => {
    if (error) {
      console.error("Error fetching reports:", error.message, error);
      return res
        .status(500)
        .json({ error: "Failed to fetch reports", details: error.message });
    }
    res.status(200).json(results);
    console.log(results);
  });
});

app.post("/api/approve_report", authenticateJWT, (req, res) => {
  const { reportId } = req.body;
  const userId = req.user.id; // Assuming the user ID is available in the JWT

  const sqlUpdate =
    "UPDATE reports SET feedback = 'approved' WHERE id = ? AND user_id = ?";
  const values = [reportId, userId];

  connection.query(sqlUpdate, values, (error, results) => {
    if (error) {
      console.error("Error updating report:", error.message, error);
      return res
        .status(500)
        .json({ error: "Failed to update report", details: error.message });
    }
    res.status(200).json({ message: "Report updated successfully" });
  });
});

app.get("/api/my_reports", authenticateJWT, (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in JWT

  const sqlSelect = `
    SELECT reports.id, 
           reports.report_no, 
           reports.name, 
           reports.status, 
           reports.reason, 
           reports.created_at, 
           reports.feedback, 
           users.username 
           
    FROM reports
    JOIN users ON reports.user_id = users.id
    WHERE reports.user_id = ?`;


connection.query(sqlSelect, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching reports:", error.message, error);
      return res
        .status(500)
        .json({ error: "Failed to fetch reports", details: error.message });
    }
    res.status(200).json(results);
  });
});

// Backend: server.js or routes.js
app.get("/api/users", authenticateJWT, (req, res) => {
  const sqlSelect = "SELECT id, username, email, created_at FROM users";

  connection.query(sqlSelect, (error, results) => {
    if (error) {
      console.error("Error fetching users:", error.message, error);
      return res
        .status(500)
        .json({ error: "Failed to fetch users", details: error.message });
    }
    res.status(200).json(results);
  });
});

app.get("/api/notifications", authenticateJWT, (req, res) => {
  const userId = req.user.id;
  const sqlSelect =
    "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC";

  connection.query(sqlSelect, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching notifications:", error.message, error);
      return res.status(500).json({ error: "Failed to fetch notifications" });
    }
    res.status(200).json(results);
  });
});

// Assuming you have a connection to your MySQL database
app.get("/api/user-count", (req, res) => {
  const query = "SELECT COUNT(*) AS userCount FROM users";

  connection.execute(query, (err, results) => {
    if (err) {
      console.error("Error fetching user count:", err);
      return res.status(500).send({ message: "Error fetching user count" });
    }

    const userCount = results[0].userCount;
    res.status(200).json({ userCount });
  });
});

// Assuming you have a connection to your MySQL database
app.get("/api/approver-plans-count", (req, res) => {
  const query =
    "SELECT COUNT(*) AS approverPlanCount FROM plans WHERE feedback IS NOT NULL";

  connection.execute(query, (err, results) => {
    if (err) {
      console.error("Error fetching approver plans count:", err);
      return res
        .status(500)
        .send({ message: "Error fetching approver plans count" });
    }

    const approverPlanCount = results[0].approverPlanCount;
    res.status(200).json({ approverPlanCount });
  });
});

// Assuming you have a connection to your MySQL database
app.get("/api/approved-reports-count", (req, res) => {
  const query =
    "SELECT COUNT(*) AS approvedReportCount FROM reports WHERE feedback = 'approved'";

  connection.execute(query, (err, results) => {
    if (err) {
      console.error("Error fetching approved reports count:", err);
      return res
        .status(500)
        .send({ message: "Error fetching approved reports count" });
    }

    const approvedReportCount = results[0].approvedReportCount;
    res.status(200).json({ approvedReportCount });
  });
});

app.get("/api/plans-by-date", (req, res) => {
  const query = `
    SELECT DATE(created_at) AS date, COUNT(*) AS count
    FROM plans
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
  `;

  connection.execute(query, (err, results) => {
    if (err) {
      console.error("Error fetching plans by date:", err);
      return res.status(500).send({ message: "Error fetching plans by date" });
    }

    res.status(200).json(results);
  });
});

app.get("/api/approved-reports", (req, res) => {
  const query = `
    SELECT DATE(created_at) as creationDate, COUNT(*) as approvedCount
    FROM reports
    WHERE feedback = 'approved'
    GROUP BY creationDate
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching approved reports:", err);
      res.status(500).json({ error: "Error fetching approved reports" });
      return;
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});