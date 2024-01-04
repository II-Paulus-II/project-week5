const scaling = ['a', 'b', 'c'];

let removedElement;

function getRandomElement(scaling) {
    //console.log("something")
  let randomIndex = Math.floor(Math.random() * scaling.length);
  return scaling[randomIndex];
}

function difficultyscalingdecider() {
    //console.log("something")
  const randomElement = getRandomElement(scaling);
    if (randomElement == "a") {
    if (removedElement) {
      scaling.push(removedElement);
    }
    const indexvariable = scaling.indexOf("a")
    scaling.splice(indexvariable, 1);
    removedElement = "a";
    return removedElement

  //append arrayamount ++  / 
   
  //level++
  }
  else if (randomElement == "b") {
    if (removedElement) {
      scaling.push(removedElement);
    }
    const indexvariable = scaling.indexOf("b")
    scaling.splice(indexvariable, 1);
    
    removedElement = "b";
    return removedElement 
    
  //time - 5
  //level++
  }
    else if (randomElement == "c") {
      if (removedElement) {
      scaling.push(removedElement);
    }
    const indexvariable = scaling.indexOf("c")
    scaling.splice(indexvariable, 1);

    removedElement = "c";
    return removedElement

  //level++
  }
}

const nextLevelValue = [];

function generateArray () {
    for (let i=1; i <21; i++) {
        const x = difficultyscalingdecider()
        nextLevelValue.push(x);
    }
}

generateArray ()
console.log(nextLevelValue);

let newArray = [];

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
      let leveldata = {
        testquestions,
        numberOfSelections,
        time,
      };
      console.log("i is: ", i, "leveldata is: ",leveldata);
      appendNewArray(leveldata);
      //newArray.push(leveldata);
    }
}

function appendNewArray(data) {
  newArray.push(data);
}

console.log(`newarray is: , ${newArray}`);

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

countElements(nextLevelValue);

console.log(`Test questions array: ${testquestionsArray}`);
console.log(`Time array: ${timeArray}`);
console.log(`Number of selections array: ${numberOfSelectionsArray}`);
