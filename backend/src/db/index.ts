import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const schemaPath = path.resolve("./src/db/schema.sql");
const db = new Database("data.db");
const schema = fs.readFileSync(schemaPath, "utf-8");
db.exec(schema);

export default db;
