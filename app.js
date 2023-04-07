const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Chatbot API listening at http://localhost:${port}`);
});

const fs = require("fs");
const path = require("path");

app.get("/api/chatbot/responses", (req, res) => {
  const dataPath = path.join(__dirname, "data", "responses.json");

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error reading JSON data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});
