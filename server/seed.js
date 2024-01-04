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
  item1 INTEGER,
  item2 INTEGER,
  item3 INTEGER
  )
`);

//Test Table
db.exec(`
  CREATE TABLE IF NOT EXISTS test (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item1 INTEGER,
  item2 INTEGER,
  item3 INTEGER
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

db.prepare(`INSERT INTO levels (memory_qty, test_qty, time) VALUES (?,?,?)`).run("2", "4", "1000");
db.prepare(`INSERT INTO levels (memory_qty, test_qty, time) VALUES (?,?,?)`).run("3", "5", "1000");
db.prepare(`INSERT INTO levels (memory_qty, test_qty, time) VALUES (?,?,?)`).run("3", "6", "1000");

/* ----- Memory Lists ----- */ 

db.prepare(`INSERT INTO memory (item1, item2) VALUES (?,?)`).run("1", "2");
db.prepare(`INSERT INTO memory (item1, item2) VALUES (?, ?)`).run("2", "4");
db.prepare(`INSERT INTO memory (item1, item2, item3) VALUES (?,?,?)`).run("3","4","6");

/* ----- Test Lists ----- */

db.prepare(`INSERT INTO test (item1, item2) VALUES (?,?)`).run("3", "5");
db.prepare(`INSERT INTO test (item1, item2) VALUES (?, ?)`).run("7", "8");
db.prepare(`INSERT INTO test (item1, item2, item3) VALUES (?,?,?)`).run("4","5","7");

/* Count Number of items -- BOILER PLATE CODE [counting rows in list] 
let count = db.prepare(`
  SELECT COUNT(*) FROM items
`).all();

console.log(count); */

/*

get num items 
testqty ----> 
memory ---->
masterArray --->

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
shuffledMaster = shuffleArray(masterarray)

function splitArray(shuffledMaster, testqty, memoryqty) {
  let testArray = shuffledMaster.slice(0, testQty);
   let memoryArray = shuffledMaster.slice(0, memoryQty);
}

splitArray(shuffledMaster, testqty, memoryqty)




get top (testquestions num)
get memory form testquestions num 


*/
const scaling = ['a', 'b', 'c'];
let removedElement;
function getRandomElement(scaling) {
  let randomIndex = Math.floor(Math.random() * scaling.length);
  return scaling[randomIndex];
  
}




function difficultyscalingdecider() {
const randomElement = getRandomElement(scaling);



if (randomElement == "a"){
scaling.push(removedElement);
scaling.splice("a");
removedElement = "a";
console.log(scaling)
//append arrayamount ++  / 
 
//level++
}
else if (randomElement == "b"){
  scaling.push(removedElement);
  scaling.splice("b");
  removedElement = "b";
  console.log(scaling)
//time - 5
//level++
}
else if (randomElement == "c") {
scaling.push(removedElement);
scaling.splice("c");
removedElement = "c";
console.log(scaling)
//level++
}
}

