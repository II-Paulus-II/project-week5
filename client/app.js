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

const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");

/* ----- Global Game Variables ----- */

let gameRunning = false;
let gameState = 1; 
let gameLevel = { level: 1 };
let maxLevel = 1;
let answer = [];

/* ----- Game Logic Functions ----- */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function saveAnswer(event) {
    let checked = document.querySelectorAll('[name="checkbox"]:checked');
    answer = [];
    checked.forEach(function (datapoint) {
      answer.push(datapoint.value);
    });
    gameState = 3;
    Game();
};

function startTest() {
  gameState = 2;
  Game();
};

function endGame() {
  gameState = 4;
  Game();
};

/* ----- Create HTML & Form Objects ----- */

function createHtmlObject(member) {
  let myObject = document.createElement("div");
  myObject.classList.add("itemContainer");
  const img = document.createElement("img");
  img.alt = member.name;
  img.src = member.src;
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
    itemCheckbox.classList.add("checkboxClass");
    itemCheckbox.id = member.name;
  itemCheckbox.value = member.name;
    itemCheckbox.name = "checkbox";
    myObject.appendChild(itemCheckbox);
    itemCheckbox.type= "checkbox";
  }
  return myObject;
};

function createForm(list) {
  const testForm = document.createElement("form");
  testForm.classList.add("formClass");
  list.forEach(function(item) {
    const htmlObject= createHtmlObject(item)
    testForm.appendChild(htmlObject);
  });
  const submitBtn = document.createElement("button");
  submitBtn.classList.add("submitBtn");
  submitBtn.textContent = "Press";
  testForm.appendChild(submitBtn);
  testForm.addEventListener("submit", function(event) {
    event.preventDefault();
    saveAnswer(event);

  });
  return testForm;
};

function createLevelResult(data) {
  const resultDisplay = document.createElement("div");
  resultDisplay.classList.add("resultsContainer");
  const resultText = document.createElement("p");
  resultText.classList.add("resultsText");
  resultText.textContent = `You got ${data[0]} out of ${data[1]} right`;
  if (data[2] != 0) {
    resultText.textContent += ` and ${data[2]} wrong!`;
  }
  const nextLevelBtn = document.createElement("button");
  nextLevelBtn.textContent = "next level";
  nextLevelBtn.classList.add = "nextLevelBtn";
  nextLevelBtn.addEventListener("click", function() {
    gameState = 1;
    gameLevel.level ++;
    Game();
  });
  resultDisplay.appendChild(resultText);
  resultDisplay.appendChild(nextLevelBtn);
  return resultDisplay;
}

/* ----- Render Functions ----- */

function renderM(memList) {
  gameScreen.innerHTML = "";
  const memlist = shuffleArray(memList)
  memlist.forEach(function(item) {
    const htmlObject= createHtmlObject(item)
    gameScreen.appendChild(htmlObject)
  });
};


function renderT(items) {
  gameScreen.innerHTML = "";
  const itemlist = shuffleArray(items);
  const tForm = createForm(itemlist);
  gameScreen.appendChild(tForm);
};

function renderR(resultData) {
  gameScreen.innerHTML = "";
  const resultsRender = createLevelResult(resultData);
  gameScreen.appendChild(resultsRender);
};

function renderEnd() {
  gameScreen.innerHTML = "end game";
  gameRunning = false;
  renderButton();
}

function renderButton(){
  if(gameRunning == true) {
    console.log("i should be adding class to button");
    startButton.classList.add("displayNone");
  }
  if(gameState == 4 ) {
    startButton.classList.remove("displayNone");
  }
}
/* ----- Main Game Function ----- */

async function Game() {
  switch(gameState) {
    case 1:
      console.log("game is running at stage 1");
      if (gameLevel.level > maxLevel) {
        endGame();
      }
      else {
        const responseM = await fetch(`${serverLocation}/beginlevel`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameLevel),
        });
        const memData = await responseM.json();
        maxLevel = Object.values(memData[2]);
        renderM(memData[1]);
        setTimeout(function () {
          startTest();
        }, memData[0].time);
      }
      renderButton();
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
      const testData = await responseT.json();
      renderT(testData[1]);
      break;
    case 3:
      console.log("we are now in stage 3");
      console.log(answer);
      let data = [];
      data.push(gameLevel);
      data.push(answer);
      console.log(data);
      const responseA = await fetch(`${serverLocation}/submitanswer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const answerData = await responseA.json();
      renderR(answerData);
      
      break;
    case 4:
      console.log("you have reached stage 4");
      renderEnd();
      break;
  }
};

/* ----- Main Event Listener ----- */

startButton.addEventListener("click", async function(event) {
  gameRunning = true;
  //make button display none 
  Game();

});


