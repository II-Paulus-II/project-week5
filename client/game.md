# Game function plan

## Variables 

let gameRunning = false;

### Start Game button event listener 

start game button - function inside event listener does two things -
changes gameRunning to true
change game button style to display:none
and then calls Game() function 

### Game function 

#### Part 1
while (true) - do something 

gameStage = 1 2 or 3 ##GLOBAL##
where 1 is memory list 
2 is the form
and 3 is the results 

if game stage = 1 
    const mlist = await getmemorylist 
    renderM(mlist)

IF game stage = 2 
    const testlist = await getthe test
    renderT(testlist)

#### Part 2
if (false) - make start game button display: block

### renderM function 
clear inner html of gamescreen
shuffleArray(mlist)

mlist.forEach(function (member) {
    let htmlObject = createhtmlObject()
    setContent(arraymember, htmlObject)
    gamescreen.appendchild(htmlObject)
});

### renderT function

b4 foreach append gamescreen with form 
