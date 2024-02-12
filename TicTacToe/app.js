let board = "---------"
let turn = "X"
async function callAPI() {
    const url = 'https://tic-tac-toe-api-psu.onrender.com/api/v1/'+board+'/O' //https:stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/'+board+'/O';
    try {
        const response = await fetch(url);
        const result = await response.text();
        console.log(result);
        console.log(indexToCell(JSON.parse (result).recommendation))
        clicker(indexToCell(JSON.parse (result).recommendation))

    } catch (error) {
        console.error(error);
    }
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6]  // Right-to-left diagonal
];
function winCheck() {
    let boardArray = Array.from(board)
    let roundWin = false
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]&&boardArray[a]!=='-') {
            roundWin = true;
            break;
        }
    }

    if (roundWin) {
        alert(turn + " Wins!")
        return true;
    }

    let roundDraw = !boardArray.includes('-');
    if (roundDraw) {
        alert("Round Draw")
        return true;
    }
    return false;
}
function clicker(cell) {
    let cellIndex = cellToIndex(cell)
    if (board[cellIndex]==='-') {
        board = board.replaceAt(cellIndex, turn)
        let cellDoc = document.getElementById(cell)
        cellDoc.value=turn
        console.log(board)
        let win = winCheck()
        turnSwitch()
        if (turn === 'O'&&win===false){
            callAPI()
        }
    }
}
function turnSwitch() {
    if (turn === 'O') {
        turn = 'X'
    }
    else {
        turn = 'O'
    }
}
function cellToIndex(cell) {
    switch (cell) {
        case 'a1':
            return 0;
        case 'a2':
            return 1
        case 'a3':
            return 2
        case 'b1':
            return 3
        case 'b2':
            return 4
        case 'b3':
            return 5
        case 'c1':
            return 6
        case 'c2':
            return 7
        case 'c3':
            return 8
    }
}
function indexToCell(index) {
    switch (index) {
        case 0:
            return 'a1';
        case 1:
            return 'a2'
        case 2:
            return 'a3'
        case 3:
            return 'b1'
        case 4:
            return 'b2'
        case 5:
            return 'b3'
        case 6:
            return 'c1'
        case 7:
            return 'c2'
        case 8:
            return 'c3'
    }
}
