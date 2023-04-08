-- PS C:\Users\nasan\Downloads\chatBotApiForJsonPlay\chatBotApiForJsonPlay> & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -h localhost --execute="source setup.sql"
-- & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -h localhost --execute="source setup.sql"
DROP USER IF EXISTS 'restricted_user2'@'localhost';
CREATE USER 'restricted_user2'@'localhost' IDENTIFIED BY 'sunshine123';
GRANT SELECT, INSERT, UPDATE, DELETE ON chatbot_db.* TO 'restricted_user2'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS chatbot_db;
USE chatbot_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  api_key VARCHAR(255) NOT NULL UNIQUE
);