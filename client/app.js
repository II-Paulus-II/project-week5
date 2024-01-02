let serverLocation = "http://localhost:8080"
console.log("Script Loaded");


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


let gameScreen = document.getElementById('gameScreen');
let startButton = document.getElementById('startButton');

startButton.addEventListener('click', async function(event) {
  // Insert furniture names into the div
  const response = await fetch(`${serverLocation}/getmemory`);
  const furtniture = await response.json(); 
  furtniture.forEach(function(item) {
    let furnitureDiv = document.createElement('div');
    furnitureDiv.textContent = item.name;
    console.log(item.name)
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
  }, 1500); 

});
