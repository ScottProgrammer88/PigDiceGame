function generateRandomValue(minValue, maxValue) {
    var random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return random;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (currentPlayerName === player1Name) {
        document.getElementById("current").innerText = player2Name;
    }
    else {
        document.getElementById("current").innerText = player1Name;
    }
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (!player1Name || !player2Name) {
        alert("Both players must have a name to start!");
        return;
    }
    document.getElementById("turn").classList.add("open");
    document.getElementById("total").value = "0";
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
    changePlayers();
}
function rollDie() {
    let currTotal = parseInt(document.getElementById("total").value);
    let rollValue = generateRandomValue(1, 6);
    document.getElementById("die").value = rollValue.toString();
    if (rollValue === 1) {
        currTotal = 0;
        document.getElementById("total").value = currTotal.toString();
        changePlayers();
    }
    else {
        currTotal += rollValue;
        document.getElementById("total").value = currTotal.toString();
    }
}
function holdDie() {
    let currentTurnTotal = parseInt(document.getElementById("total").value);
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Score = parseInt(document.getElementById("score1").value);
    let player2Score = parseInt(document.getElementById("score2").value);
    if (currentPlayerName === document.getElementById("player1").value) {
        player1Score += currentTurnTotal;
        document.getElementById("score1").value = player1Score.toString();
    }
    else {
        player2Score += currentTurnTotal;
        document.getElementById("score2").value = player2Score.toString();
    }
    if (player1Score >= 100 || player2Score >= 100) {
        let winner = player1Score >= 100
            ? document.getElementById("player1").value
            : document.getElementById("player2").value;
        alert(`${winner} Wins!`);
        return;
    }
    document.getElementById("total").value = "0";
    changePlayers();
}
