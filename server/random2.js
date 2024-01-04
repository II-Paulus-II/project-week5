



function shuffleArray(masterarray) {
    for (let i = 1; i < 30; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  shuffledMaster = shuffleArray(masterarray)
  
  function splitArray(shuffledMaster, testqty, memoryqty) {
    let testArray = shuffledMaster.slice(0, testQty);
     let memoryArray = shuffledMaster.slice(0, memoryQty);
  }
  
  splitArray(shuffledMaster, testqty, memoryqty)

  console.log(testArray)
  console.log(memoryArray)
  