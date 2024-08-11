const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./users.db";

function createTable(db) {
  db.exec(`
    CREATE TABLE users
    (
      username VARCHAR(50) PRIMARY KEY,
      password VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      name VARCHAR(50) NOT NULL
    );
  `, (error) => {
    if (error) {
      console.error("Error creating table:", error.message);
    } else {
      console.log("Users table created successfully.");
    }
  });
}

function createDbConnection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
}

module.exports = createDbConnection();
