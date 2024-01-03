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

db.exec(`
  CREATE TABLE IF NOT EXISTS levels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  memory_qty INTEGER,
  test_qty INTEGER,
  time INTEGER
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

/* ----- Create Levels in database ----- */ 
// Can change location of this code later if decided

const maxLevels = 10;
const numItems = furnitureArray.length;

//populate levels list with increasing number of items



/* ----- Memory Lists ----- */ 

db.prepare(`INSERT INTO memory (item_id) VALUES (?)`).run("1");

/* ----- Test Lists ----- */

db.prepare(`INSERT INTO test (item_id) VALUES (?)`).run("1");

/* Count Number of items -- BOILER PLATE CODE [counting rows in list] 
let count = db.prepare(`
  SELECT COUNT(*) FROM items
`).all();

console.log(count); */
