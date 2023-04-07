const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const fs = require("fs");
const path = require("path");

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.post("/api/chatbot/responses", (req, res) => {
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
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.listen(port, () => {
  console.log(`Chatbot API listening at http://localhost:${port}`);
});
