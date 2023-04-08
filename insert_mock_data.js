// use this comand to run and test this> node insert_mock_data.js;

const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

// Replace 'your_database_name', 'your_user', and 'your_password' with your MySQL credentials
const db = mysql.createConnection({
  host: "localhost",
  user: "restricted_user2",
  password: "sunshine123",
  database: "chatbot_db",
});

const users = [
  { username: "user1", email: "user1@example.com", password: "password1" },
  { username: "user2", email: "user2@example.com", password: "password2" },
  // Add more mock users if desired
];

(async () => {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const apiKey = uuid.v4();

    db.query(
      "INSERT INTO users (username, email, password, api_key) VALUES (?, ?, ?, ?)",
      [user.username, user.email, hashedPassword, apiKey],
      (error) => {
        if (error) {
          console.error("Error inserting user:", error);
        } else {
          console.log(`User ${user.username} inserted successfully`);
        }
      }
    );
  }
})();
