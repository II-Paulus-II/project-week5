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

/* ----- Server Side Data Logic ----- */

function newLevel(level) {
  
};

function getMemoriseList(level) {
  
  const data = dataOne;
  return data;
};

function getTestList(level) {

  const data = dataTwo;
  return data;
};

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

//First get request to actually start a new level by requesting list of items to memorise
app.get("/beginlevel", function (request, response) {
  const level = request.body.level;
  //Do we need a new level ??
  newLevel(level);
  const responseData = getMemoriseList(level);
  response.json(responseData);
});

//Now Need the larger list of items for the test
app.get("/begintest", function (request, response) {
  const level = request.body.level;
  const responseData = getTestList(level);
  response.json(responseData);
});


/* ----- Server ----- */
app.listen(8080, () => {
  console.log("Server is Running");
  console.log("Press Ctrl + \"C\" to end");
});
