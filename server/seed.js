/* ----- Imports ----- */

import Database from "better-sqlite3";
import fs from "fs";
const db = new Database("database.db");

/* ----- Read DataFile as a nice lovely string ----- */

const imageSrc = "/gameImg";
let furnitureArray = []
let imageArray = fs.readFileSync('data.txt').toString().split("\n");
imageArray.forEach(function (image) {
  //console.log(image);
  if (image != "") {
    const name = image.substr(0, image.indexOf("."));
    const src = `${imageSrc}/${image}`;
    let furnitureDataObject = {
      name,
      src,
    }
    furnitureArray.push(furnitureDataObject);
  }
});

/* ----- Logic Functions ----- */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/* ----- Make Tables ----- */

/* ----- Basic Items Table ----- */

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    src TEXT
  )
`);

furnitureArray.forEach(function (item) {
  db.prepare(`INSERT INTO items (name, src) VALUES (?, ?)`).run(item.name, item.src);
});

const numItems = furnitureArray.length;
const itemNumArray = [];

for (let i = 1; i <= numItems; i++) {
   itemNumArray.push(i);
};

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
let numLevels = 10;
//Choose one of three levels to increment
const scaling = ["a", "b", "c"];
//Needed to make sure that we dont increment same level twice
let removedElement = "";

function getRandomElement(scaling) {
  let randomIndex = Math.floor(Math.random() * scaling.length);
  return scaling[randomIndex];
}
// Decides between either a, b or c. 
function difficultyscalingdecider(num) {
  const randomElement = getRandomElement(scaling);
  //Now that we have our random element - put last one back in the scaling array
  if (removedElement != "") {
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
        const x = difficultyscalingdecider(i)
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
};
//
(function createLevels(array) {
    let memory_qty = 2;
    let test_qty = 4;
    let time = 6000;

    nextLevelDifficulty.forEach(function (entry, index) {
      if (entry === 'a') {
        memory_qty++;
        test_qty++
      } else if (entry === 'b') {
        time = time - 1000;
      } else if (entry === 'c') {
        test_qty = test_qty++ ;
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

/* ----- Insert Test and Memory Values into tables ----- */ 

for(let i = 1; i <= numLevels; i++) {
  const shuffledMaster = shuffleArray(itemNumArray); //Shuffling 1 to 10 
  const numMemoryItems = db.prepare(`SELECT memory_qty FROM levels WHERE id=${i}`).all();
  const numTestItems = db.prepare(`SELECT test_qty FROM levels WHERE id=${i}`).all();
  const memoryArray = shuffledMaster.slice(0, numMemoryItems[0].memory_qty);
  const testArray = shuffledMaster.slice(0, numTestItems[0].test_qty);
  let memCountArray = [];
  for (let j = 0; j < memoryArray.length; j++) {
     memCountArray.push(j);
  }; 
  let testCountArray = [];
  for (let k = 0; k < testArray.length; k++) {
    testCountArray.push(k);
  }
  memCountArray.forEach(function (num) {
    let numPlus = num + 1;
    let colName = `item${numPlus}`;
    if (num == 0) {
      db.prepare(`INSERT INTO memory (${colName}) VALUES (?)`).run(memoryArray[num]);
    }
    else {
      db.prepare(`UPDATE memory SET ${colName}=${memoryArray[num]} WHERE id=${i}`).run();
    }
  });
  testCountArray.forEach(function (num) {
    let numPlus = num + 1;
    let colName = `item${numPlus}`;
    if (num == 0) {
      db.prepare(`INSERT INTO test (${colName}) VALUES (?)`).run(testArray[num]);
    }
    else {
      db.prepare(`UPDATE test SET ${colName}=${testArray[num]} WHERE id=${i}`).run();
    }
  });
};
