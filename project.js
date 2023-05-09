const prompt = require("prompt-sync")();

const _ROWS = 3;
const _COLUMNS = 3;

const SYMBOL_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = { //MULTIPLIER PER SYMBOL
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}



const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter a deposit amount: "); //returns a string value
        const numberDepositAmount = parseFloat(depositAmount);
    
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try again");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter lines to bet on (1-3): "); //returns a string value
        const numberOfLines = parseFloat(lines);
    
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid line number, try again");
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter total bet per line: "); //returns a string value
        const numberOfBet = parseFloat(bet);
    
        if (isNaN(numberOfBet) || numberOfBet <= 0 || numberOfBet > balance / lines){
            console.log("Invalid bet, try again");
        } else {
            return numberOfBet;
        }
    }
};

const spinWheel = () =>{
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)){
        for (let i = 0; i < count; i ++){
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for (let i = 0; i < _COLUMNS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j <_ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i=0; i< _ROWS; i++){
        rows.push([]);
        for (let j=0; j< _COLUMNS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of rows.entries()){
            rowString += symbol;
            if (i != rows.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};


let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spinWheel();
const rows = transpose(reels);
printRows(rows);
