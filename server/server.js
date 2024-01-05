/* ----- Imports ----- */

import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

/* ----- Global Variables ----- */

const db = new Database("database.db");
const app = express();
app.use(express.json());
app.use(cors());

/* ----- Testing Objects ----- */ 

const dataOne = { name: "beginlevel"};
const dataTwo = { name: "begintest"};

/* ----- Get Data Logic - Needs Preparing ----- */

function getList(level, table) {
  const maxLevel = db.prepare(`SELECT max(rowid) FROM levels`).all();
  const levelInfo = db.prepare(`SELECT * FROM levels WHERE id=${level}`).all();
  const levelData = db.prepare(`SELECT * FROM ${table} WHERE id=${level}`).all();
  let itemId = [];
  for ( const [key,value] of Object.entries( levelData[0] ) ) {
    if(key == "id") {
      //do nothing
    }
    else {
      if(!value) {
        //do nothing
      } 
      else {
        itemId.push(value);
      }
    }
  }
  let itemData = [];
  itemId.forEach(function (id) {
    const item = db.prepare(`SELECT * FROM items WHERE id=${id}`).all();
    itemData.push(item[0]);
  });
  const data = [levelInfo[0], itemData, maxLevel[0]];
  return data;

};

function getMemoryList(level) {
  let data = getList(level, "memory");
  const itemObjects = data[1];
  let itemNames = [];
  itemObjects.forEach(function (item) {
    itemNames.push(item.name);
  });
  return itemNames;
}

//Result is just going to be how many they got right
function countCommonItems(array1, array2) {
    let commonItems = array1.filter(item => array2.includes(item));
    return commonItems.length;
};

function checkAnswer(level, answer) {
  let itemNames = getMemoryList(level);
  let memListLength = itemNames.length;
  let commonItemsLength = countCommonItems(answer, itemNames);
  let wrongAnswers = answer.length - commonItemsLength;
  let checkedAnswer = [ commonItemsLength, memListLength, wrongAnswers ];
  return checkedAnswer;
}

/* ----- Endpoints ----- */ 

//Basic setup endpoint
app.get("/message", function (request, response) {
  response.json({ message: "newmessage" });
});

//Return array of all items just to be getting on with 
app.get("/getmemory", function (request, response) {
  const memory = db.prepare(`SELECT * FROM items`).all();
  response.json(memory);
});

//First post request to actually start a new level by requesting list of items to memorise
app.post("/beginlevel", function (request, response) {
  const level = request.body.level;
  const responseData = getList(level, "memory");
  response.json(responseData);
});

//Now Need the larger list of items for the test
app.post("/begintest", function (request, response) {
  const level = request.body.level;
  const responseData = getList(level, "test");
  response.json(responseData);
});

app.post("/submitanswer", function (request, response) {
  const level = request.body[0].level;
  const answer = request.body[1];
  const answerData = checkAnswer(level, answer);
  response.json(answerData);
});

/* ----- Server ----- */

app.listen(8080, () => {
  console.log("Server is Running");
  console.log("Press Ctrl + \"C\" to end");
});
