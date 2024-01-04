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

/* ----- Level Table ----- */ 

//Create Table in Database
db.exec(`
  CREATE TABLE IF NOT EXISTS levels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  memory_qty INTEGER,
  test_qty INTEGER,
  time INTEGER
  )
`);

//Populate Table with random values 
let numLevels = 20;
//Choose one of three levels to increment
const scaling = ["a", "b", "c"];
//Needed to make sure that we dont increment same level twice
let removedElement;

function getRandomElement(scaling) {
  let randomIndex = Math.floor(Math.random() * scaling.length);
  return scaling[randomIndex];
}
// Decides between either a, b or c. 
function difficultyscalingdecider() {
  const randomElement = getRandomElement(scaling);
  //Now that we have our random element - put last one back in the scaling array
  if (removedElement) {
    scaling.push(removedElement);
  }
  const elementIndex = scaling.indexOf(randomElement);
  scaling.splice(elementIndex, 1);
  removedElement = randomElement;
  return randomElement;
}
//returns array of difficulty change choices. 
function generateDifficulty () {
  let difficulty = [];
    for (let i=1; i <= numLevels; i++) {
        const x = difficultyscalingdecider()
        difficulty.push(x);
    }
  return difficulty;
}
//array of difficulty change choices. 
const nextLevelDifficulty = generateDifficulty();

let difficultyData = [];
//Populate difficulty array
function appendDifficultyArray(data) {
  difficultyData.push(data);
}
//
(function createLevels(array) {
    let memory_qty = 3;
    let test_qty = 7
    let time = 6000;

    nextLevelDifficulty.forEach(function (entry, index) {
      if (entry === 'a') {
          memory_qty++;
      } else if (entry === 'b') {
          time = time - 1000;
      } else if (entry === 'c') {
          test_qty = test_qty + 2 ;
      }
      if (index % 5 === 0) {
          time += 1000;
      }
      let leveldata = {
        memory_qty,
        test_qty,
        time,
      };
      appendDifficultyArray(leveldata);
    });
})();

//Insert Difficulty Values into the table 
difficultyData.forEach(function (item) {
  db.prepare(`INSERT INTO levels (memory_qty, test_qty, time) VALUES (?, ?, ?)`).run(item.memory_qty, item.test_qty, item.time);
});

/* ----- Memorise Table ----- */

//Get Array of Numbers to alter memorise table with
let memoryCount = db.prepare(`
  SELECT memory_qty FROM levels WHERE id=${numLevels}
`).all();
let numArray = [];
for (let i = 1; i <= memoryCount[0].memory_qty; i++) {
   numArray.push(i);
};

//Create Base Table
db.exec(`
  CREATE TABLE IF NOT EXISTS memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT
  )
`);

//Add Columns depending on max number of items needed
numArray.forEach(function (num) {
  let colName = `item${num}`;
  db.prepare(`ALTER TABLE memory ADD COLUMN ${colName} INTEGER`).run();
}); 

/* ----- Test Table ----- */

//Get Table count and reset num array
let tableCount = db.prepare(`
  SELECT test_qty FROM levels WHERE id=${numLevels}
`).all();
numArray = [];
for (let i = 1; i <= tableCount[0].test_qty; i++) {
   numArray.push(i);
};

//Base Table
db.exec(`
  CREATE TABLE IF NOT EXISTS test (
  id INTEGER PRIMARY KEY AUTOINCREMENT
  )
`);

numArray.forEach(function (num) {
  let colName = `item${num}`;
  db.prepare(`ALTER TABLE test ADD COLUMN ${colName} INTEGER`).run();
}); 



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
*/
