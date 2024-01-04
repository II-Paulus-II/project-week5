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
  const data = [levelInfo[0], itemData];
  return data;
};

function checkAnswer(answer) {
  
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
  //console.log(level);
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
  console.log(level);
  console.log(answer);
  const answerData = checkAnswer(answer);
  response.json("success");
});

/* ----- Server ----- */

app.listen(8080, () => {
  console.log("Server is Running");
  console.log("Press Ctrl + \"C\" to end");
});
