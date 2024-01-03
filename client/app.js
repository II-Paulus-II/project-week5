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

let gameScreen = document.getElementById('gameScreen');
let startButton = document.getElementById('startButton');
let startButton1 = document.getElementById('startButton1');

/* ----- Global Game Variables ----- */ 

let gameRunning = false;
let gameState = 1; 

/* ----- Game Function ----- */ 

async function Game() {
  switch(gameState) {
    case 1:
      console.log("game is running at stage 1");
      const responseM = await fetch(`${serverLocation}/getmemory`);
      const memList = await responseM.json();
      console.log(memList);
      //renderM(memList);
      break;
    case 2:
      console.log("game is running at stage 2");
      const responseT = await fetch(`${serverLocation}/getmemory`);
      const testList = await responseT.json();
      console.log(testList);
      //renderTest(testList);
      break;
    case 3:
      break;
  }

}


/* ----- Main Event Listener ----- */ 

startButton.addEventListener('click', async function(event) {
  gameRunning = true;
  //make button display none 
  Game();

  /* OLD EVENT LISTENER DONT DELETE TILL NEW IS WORKING
  // Insert furniture names into the div
  const response = await fetch(`${serverLocation}/getmemory`);
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

startButton1.addEventListener('click', function() { 
  gameRunning = true;
  gameState = 2;
  Game();

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
};
