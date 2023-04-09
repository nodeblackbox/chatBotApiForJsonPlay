const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

const apiKey = process.env.API_KEY;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

function isLoggedIn(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ message: "Please log in to access this resource" });
  }
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Serve static files from the "public" directory
app.use(express.static("public"));

// Define a route that serves an HTML page with a p5.js sketch
app.get("/sketch", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sketch.html"));
});

// app.get("/", (req, res) => { 
//   res.sendFile(path.join(__dirname, "index.html"));
// });

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const apiKey = uuid.v4();

  db.query(
    "INSERT INTO users (username, email, password, api_key) VALUES (?, ?, ?, ?)",
    [username, email, hashedPassword, apiKey],
    (error) => {
      if (error) {
        res.status(500).json({ message: "Error registering user" });
      } else {
        res.status(201).json({ message: "User registered successfully" });
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error) {
        res.status(500).json({ message: "Error logging in" });
      } else if (
        results.length === 0 ||
        !(await bcrypt.compare(password, results[0].password))
      ) {
        res.status(401).json({ message: "Incorrect username or password" });
      } else {
        req.session.loggedIn = true;
        req.session.user = results[0];
        res.status(200).json({
          message: "Logged in successfully",
          apiKey: results[0].api_key,
        });
      }
    }
  );
});

function apiKeyMiddleware(req, res, next) {
  const requestApiKey = req.get("x-api-key");

  db.query(
    "SELECT * FROM users WHERE api_key = ?",
    [requestApiKey],
    (error, results) => {
      if (error || results.length === 0) {
        res.status(401).json({ message: "Invalid API key" });
      } else {
        next();
      }
    }
  );
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/chatbot/responses", apiKeyMiddleware, isLoggedIn, (req, res) => {
  const dataPath = path.join(__dirname, "data", "responses.json");

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error reading JSON data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

function updateJsonFile(filePath, updateFunction, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err);
    } else {
      let jsonData = JSON.parse(data);
      jsonData = updateFunction(jsonData);
      fs.writeFile(
        filePath,
        JSON.stringify(jsonData, null, 2),
        "utf8",
        (err) => {
          callback(err);
        }
      );
    }
  });
}

app.post("/api/chatbot/responses", apiKeyMiddleware, (req, res) => {
  const dataPath = path.join(__dirname, "data", "responses.json");
  const { category, response } = req.body;

  if (!category || !response) {
    res
      .status(400)
      .json({ message: "Please provide a category and a response" });
    return;
  }

  updateJsonFile(
    dataPath,
    (jsonData) => {
      if (!jsonData[category]) {
        jsonData[category] = [];
      }
      jsonData[category].push(response);
      return jsonData;
    },
    (err) => {
      if (err) {
        res.status(500).json({ message: "Error updating JSON data" });
      } else {
        res.status(201).json({ message: "Response added successfully" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Chatbot API listening at http://localhost:${port}`);
});
