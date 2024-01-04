
let foo = [];
let N = 20
for (var i = 1; i <= N; i++) {
   foo.push(i);
};

console.log(foo);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let shuffledMaster = shuffleArray(foo);
console.log(shuffledMaster);  
let testArray = [];
let memoryArray = [];

function splitArray(shuffledMaster, testqty, memoryqty) {
  testArray = shuffledMaster.slice(0, testqty);
  memoryArray = shuffledMaster.slice(0, memoryqty);
};
  
splitArray(shuffledMaster, 10 , 5);

console.log(testArray);
console.log(memoryArray);
  
