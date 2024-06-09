function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    
    // use random to generate a number between min and max
    return random;
}

function changePlayers():void{
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player    https://www.w3schools.com/js/js_comparisons.asp
    
    if (currentPlayerName === player1Name) {
        (<HTMLElement>document.getElementById("current")).innerText = player2Name;
    } else {
        (<HTMLElement>document.getElementById("current")).innerText = player1Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;

    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
}

function createNewGame(){
    //set player 1 and player 2 scores to 0
    (<HTMLInputElement>document.getElementById("score1")).value = "0";
    (<HTMLInputElement>document.getElementById("score2")).value = "0";

    //verify each player has a name
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //if both players don't have a name display error
    if (!player1Name || !player2Name) {
        alert("Both players must have a name to start!")
        return;
    }

    //if both players do have a name start the game!
    (<HTMLElement>document.getElementById("turn")).classList.add("open");
    (<HTMLInputElement>document.getElementById("total")).value = "0";

    //lock in player names and then change players
    (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
    (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");
    changePlayers();
}

function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let rollValue = generateRandomValue(1, 6);

    //set the die roll to value player rolled
    (<HTMLInputElement>document.getElementById("die")).value = rollValue.toString();

    //if the roll is 1
    //  change players
    //  set current total to 0

    if(rollValue === 1) {
        changePlayers();
        currTotal = 0;
    }
    
    //if the roll is greater than 1
    //  add roll value to current total
    else {
        currTotal += rollValue;
    }

    //display current total on form
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
}

function holdDie():void {
    //get the current turn total
    let currentTurnTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    //determine who the current player is  // use different variable name?
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;

    //add the current turn total to the player's total score
    if (currentPlayerName === (<HTMLInputElement>document.getElementById("player1")).value) {
        let player1Score = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
        player1Score += currentTurnTotal;
        (<HTMLInputElement>document.getElementById("score1")).value = player1Score.toString();
    } else {
        let player2Score = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
        player2Score += currentTurnTotal;
        (<HTMLInputElement>document.getElementById("score1")).value = player2Score.toString();
    }


    //reset the turn total to 0
    (<HTMLInputElement>document.getElementById("total")).value = "0";
    //change players
    changePlayers();
}