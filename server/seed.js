/* ----- Imports ----- */

import Database from "better-sqlite3";
const db = new Database("database.db");

/* ----- Make Tables ----- */

/* ----- Basic Items Table ----- */

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);

/* ----- Level Tables ----- */ 

//Level Table
db.exec(`
  CREATE TABLE IF NOT EXISTS levels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  memory_id INTEGER,
  test_id INTEGER
  )
`);

//Memorise Table
db.exec(`
  CREATE TABLE IF NOT EXISTS memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER
  )
`);

//Test Table
db.exec(`
  CREATE TABLE IF NOT EXISTS test (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER
  )
`);

/* ----- Add Items to Basic Items Table ----- */

let furnitureArray = [
    {name: "Chair"},
    {name: "Table"},
    {name: "Sofa"},
    {name: "Bed"},
    {name: "Desk"},
    {name: "Cabinet"},
    {name: "Dresser"},
    {name: "Bookcase"},
    {name: "Recliner"},
    {name: "Ottoman"}
];

furnitureArray.forEach(function (item) {
  db.prepare(`INSERT INTO items (name) VALUES (?)`).run(`${item.name}`);
});

/* ----- Create Level ----- */ 

db.prepare(`INSERT INTO levels (memory_id, test_id) VALUES (?,?)`).run("1", "1");

// Count Number of levels -- BOILER PLATE CODE [counting rows] 
let count = db.prepare(`
  SELECT COUNT(*) FROM levels
`).all();

console.log(count);

/* ----- Memory Lists ----- */ 

db.prepare(`INSERT INTO memory (item_id) VALUES (?)`).run("1");

/* ----- Test Lists ----- */

db.prepare(`INSERT INTO test (item_id) VALUES (?)`).run("1");
