/* ----- Get Server Location ----- */

const SERVER_LOCATION = "http://localhost:8080";
console.log("Script Loaded");

/* ----- Backup data for testing ----- */
const FURNITURE_ARRAY = [
  { name: "Chair" },
  { name: "Table" },
  { name: "Sofa" },
  { name: "Bed" },
  { name: "Desk" },
  { name: "Cabinet" },
  { name: "Dresser" },
  { name: "Bookcase" },
  { name: "Recliner" },
  { name: "Ottoman" },
];

/* ----- DOM Objects ----- */

const gameScreen = document.getElementById("gameScreen");
let startButton = document.getElementById("startButton");
let startButton1 = document.getElementById("startButton1");

/* ----- Global Game Variables ----- */

let gameRunning = false;

const GameState = {
  Stage1: 1,
  Stage2: 2,
};
let currentGameState = GameState.Stage1;

async function get(path) {
  const res = await fetch(`${SERVER_LOCATION}/${path}`);
  if (!res.ok) {
    throw new Error(`Unable to retrieve data. ${res.error()}`);
  }
  return res.json();
}

/* ----- Game Function ----- */

async function playGame(nextGameState) {
  gameRunning = true;
  currentGameState = nextGameState;

  if (nextGameState === GameState.Stage3) {
    return;
  }

  const data = await get("/getmemory");

  switch (nextGameState) {
    case GameState.Stage1:
      console.log("game is running at stage 1");
      renderM(data);
      break;
    case GameState.Stage2:
      console.log("game is running at stage 2");
      renderT(data);
      break;
    case GameState.Stage3:
      // TODO: Implement
      break;
  }
}

/* ----- Create HTML ----- */

function createHtmlObject(member) {
  let myObject = document.createElement("div");
  myObject.classList.add("itemContainer");
  const img = document.createElement("img");
  img.alt = member.name;
  img.classList.add("itemImage");
  myObject.appendChild(img);

  switch (true) {
    case gameState === GameState.Stage1: {
      const itemName = document.createElement("p");
      itemName.classList.add("itemName");
      itemName.textContent = member.name;
      myObject.appendChild(itemName);
      break;
    }
    case gameState === GameState.Stage2: {
      const itemCheckbox = document.createElement("input");
      itemCheckbox.id = member.name;
      myObject.appendChild(itemCheckbox);
      break;
    }
  }

  return myObject;
}

/* ----- Main Event Listener ----- */

startButton.addEventListener("click", async function (event) {
  //make button display none
  playGame();

  /* OLD EVENT LISTENER DONT DELETE TILL NEW IS WORKING
  // Insert furniture names into the div
  const response = await fetch(`${SERVER_LOCATION}/getmemory`);
  const furtniture = await response.json();
  furtniture.forEach(function(item) {
    let furnitureDiv = document.createElement('div');
    furnitureDiv.textContent = item.name;
    console.log(item.name)

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = item.name;




    gameScreen.appendChild(checkbox);
    gameScreen.appendChild(furnitureDiv);
  });

  // Make the game screen visible
  gameScreen.style.opacity = 1;

  // Make the furniture names disappear after 15 seconds
  setTimeout(function() {
    while (gameScreen.firstChild) {
      gameScreen.removeChild(gameScreen.firstChild);
    }
    gameScreen.style.opacity = 1;
  }, 1500); */
});

startButton1.addEventListener("click", function () {
  playGame(GameState.Stage2);

  /*  let shuffledArray = shuffleArray(furnitureArray);

    for (let i = 0; i < 3; i++) {
        let furnitureDiv = document.createElement('div');
        furnitureDiv.textContent = shuffledArray[i].name;
        gameScreen.appendChild(furnitureDiv);
    } */
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderM(memList) {
  gameScreen.innerHTML = "";
  const memlist = shuffleArray(memList);

  memlist.forEach(function (item) {
    let htmlObject = createHtmlObject(item);
    gameScreen.appendChild(htmlObject);
  });
}

function renderT(memList) {
  const tForm = document.createElement("form");
  gameScreen.innerHTML = "";
  const memlist = shuffleArray(memList);

  memlist.forEach(function (item) {
    const htmlObject = createHtmlObject(item);
    tForm.appendChild(htmlObject);
  });
  gameScreen.appendChild(tForm);
}
