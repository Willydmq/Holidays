const mysql = require("mysql2/promise");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const dbConfig = {
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
};

async function run(query, params) {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows, fields] = await connection.execute(query, params);
    return {
      status: true,
      lastID: rows.insertId,
      changes: rows.changedRows,
    };
  } catch (error) {
    console.log("Error en la consulta:", error);
    throw error;
  } finally {
    connection.end();
  }
}

async function get(query, params) {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows, fields] = await connection.execute(query, params);
    return rows;
  } catch (error) {
    console.log("Error en la consulta:", error);
    throw error;
  } finally {
    connection.end();
  }
}

async function initDB() {
  try {
    console.log("Connected to database.");

    await run(`CREATE TABLE IF NOT EXISTS todos (
      id VARCHAR(36) PRIMARY KEY,
      title TEXT,
      description TEXT,
      isDone INTEGER DEFAULT 0,
      showDescription INTEGER DEFAULT 0,
      url TEXT,
      data_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      data_time_edit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await run(`ALTER TABLE todos MODIFY id VARCHAR(36)`);
    await run(
      `ALTER TABLE todos MODIFY id VARCHAR(36) NOT NULL DEFAULT '${uuidv4()}'`
    );
  } catch (error) {
    console.log("Error connecting to database:", error);
    throw error;
  }
}

module.exports = { initDB, run, get };
