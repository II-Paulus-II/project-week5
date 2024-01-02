/* ----- Imports ----- */

import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

/* ----- Global Variables ----- */

const db = new Database("database.db");
const app = express();
app.use(express.json());
app.use(cors());

/* ----- Endpoints ----- */ 

app.get("/message", function (request, response) {
  response.json({ message: "newmessage" });
});

app.get("/getmemory", function (request, response) {
  const memory = db.prepare(`SELECT * FROM items`).all();
  response.json(memory);
});

app.listen(8080, () => {
  console.log("Server is Running");
});
