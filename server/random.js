const scaling = ['a', 'b', 'c'];
let removedElement;
function getRandomElement(scaling) {
    console.log("something")
  let randomIndex = Math.floor(Math.random() * scaling.length);
  return scaling[randomIndex];
  
}


function difficultyscalingdecider() {
    console.log("something")
const randomElement = getRandomElement(scaling);



if (randomElement == "a"){
scaling.push(removedElement);
const indexvariable = scaling.indexOf("a")
scaling.splice(indexvariable, 1);
removedElement = "a";
return removedElement

//append arrayamount ++  / 
 
//level++
}
else if (randomElement == "b"){
  scaling.push(removedElement);
  const indexvariable = scaling.indexOf("b")
scaling.splice(indexvariable, 1);
  
  removedElement = "b";
  return removedElement 
  
//time - 5
//level++
}
else if (randomElement == "c") {
scaling.push(removedElement);
const indexvariable = scaling.indexOf("c")
scaling.splice(indexvariable, 1);

removedElement = "c";
return removedElement

//level++
}
}

let level = 1;
let arrayamount = 9;



const try1 =difficultyscalingdecider()

const try2 =difficultyscalingdecider()

const try3 =difficultyscalingdecider()
 
console.log(try1)


const nextLevelValue = [];


function generateArray () {
    for (let i=1; i <21; i++) {
        const x = difficultyscalingdecider()
        nextLevelValue.push(x);
    }
}

generateArray ()
console.log(nextLevelValue);




function countElements(array) {
    let testquestions = 3;
    let time = 6000;
    let numberOfSelections = 10;

    for (let i = 0; i < array.length; i++) {
        if (array[i] === 'a') {
            testquestions++;
            appendTestQuestions(testquestions)
        } else if (array[i] === 'b') {
            time= time - 1000;
            appendTime(time)

        } else if (array[i] === 'c') {
            numberOfSelections= numberOfSelections + 2 ;
            appendNumberOfSelections(numberOfSelections)
        }

        if ((i + 1) % 5 === 0) {
            time += 2000;
        }
    }

   
}

let testquestionsArray = [];
let timeArray = [];
let numberOfSelectionsArray = [];

function appendTestQuestions(testquestions) {
    testquestionsArray.push(testquestions);
}

function appendTime(time) {
    timeArray.push(time);
}

function appendNumberOfSelections(numberOfSelections) {
    numberOfSelectionsArray.push(numberOfSelections);
}






let array = ['a', 'b', 'a', 'c', 'b', 'a', 'c', 'b', 'a', 'c', 'b', 'a', 'c', 'b', 'a', 'c', 'b', 'a', 'c', 'b'];
countElements(array);

console.log(`Test questions array: ${testquestionsArray}`);
console.log(`Time array: ${timeArray}`);
console.log(`Number of selections array: ${numberOfSelectionsArray}`);