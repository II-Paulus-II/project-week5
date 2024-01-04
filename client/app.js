/* ----- Get Server Location ----- */

let serverLocation = "http://localhost:8080"
console.log("Script Loaded");

/* ----- Backup data for testing ----- */
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

/* ----- DOM Objects ----- */ 

const gameScreen = document.getElementById('gameScreen');
let startButton = document.getElementById('startButton');
let startButton1 = document.getElementById('startButton1');

/* ----- Global Game Variables ----- */

let gameRunning = false;
let gameState = 1; 
let gameLevel = { level: 1 };

/* ----- Game Logic Functions ----- */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/* ----- Create HTML ----- */

function createHtmlObject(member) {
  let myObject = document.createElement("div");
  myObject.classList.add("itemContainer");
  const img = document.createElement('img');
  img.alt = member.name;
  img.classList.add("itemImage");
  myObject.appendChild(img);
  if(gameState == 1) {
    const itemName = document.createElement("p");
    itemName.classList.add("itemName");
    itemName.textContent = member.name;
    myObject.appendChild(itemName);
  }
  if(gameState == 2) {
    const itemCheckbox = document.createElement("input");
    itemCheckbox.id = member.name;
    myObject.appendChild(itemCheckbox);
    itemCheckbox.type= "checkbox";
  }
  return myObject;
};

/* ----- Render Functions ----- */

function renderM(memList){
  gameScreen.innerHTML = '';
  const memlist = shuffleArray(memList)
  
  memlist.forEach(function(item) {
    let htmlObject= createHtmlObject(item)
    gameScreen.appendChild(htmlObject)
  });
};


function renderT(memList){
  const tForm = document.createElement('form')
  gameScreen.innerHTML = '';
  const memlist = shuffleArray(memList)
  
  memlist.forEach(function(item) {
    const htmlObject= createHtmlObject(item)
    tForm.appendChild(htmlObject)
  });
  gameScreen.appendChild(tForm);
};

/* ----- Main Game Function ----- */

async function Game() {
  switch(gameState) {
    case 1:
      console.log("game is running at stage 1");
      const responseM = await fetch(`${serverLocation}/beginlevel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameLevel),
      });
      const memList = await responseM.json();
      //console.log(memList[1]);
      renderM(memList[1]);
      break;
    case 2:
      console.log("game is running at stage 2");
      const responseT = await fetch(`${serverLocation}/begintest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameLevel),
      });
      const testList = await responseT.json();
      //console.log(testList);
      renderT(testList[1]);

      break;
    case 3:
      break;
  }
};

/* ----- Main Event Listener ----- */

startButton.addEventListener('click', async function(event) {
  gameRunning = true;
  //make button display none 
  Game();

});

startButton1.addEventListener('click', function() { 
  gameRunning = true;
  gameState = 2;
  Game();

});

