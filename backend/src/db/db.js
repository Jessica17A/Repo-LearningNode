const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const path = require("path");

const file = path.join(__dirname, "app.json");
const adapter = new JSONFile(file);
const db = new Low(adapter, { users: [] });

async function initDB() {
  await db.read();
  db.data ||= { users: [] };
  await db.write();
}

module.exports = { db, initDB };
