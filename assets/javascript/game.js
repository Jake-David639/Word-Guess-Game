var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var wordBank = [beryllium, sodium, magnesium, aluminium, potassium, calcium, scandium, titanium, vanadium, chromium, 
                manganese, iron, cobalt, copper, nickle, zinc, gallium, rubidium, strontium, yttrium, zirconium, niobium,
                 molybdenum, technetium, ruthenium, rhodium, palladium, silver, cadmium, indium, tin, cesium, barium, lanthanum,
                  cerium, praseodymium, neodymium, promethium, terbium, samarium, europium, gadolinium, dysprosium, holmium, Erbium,
                   Thulium, Ytterbium, Lutetium, Hafnium, Tantalum, Tungsten, Rhenium, Osmium, Iridium, Platinum, Gold, Mercury, Thallium,
                    Lead, Bismuth, Polonium, Francium, Radium, Actinium, Thorium, Protactinium, Uranium, Neptunium, Plutonium, Americium, Curium,
                     Berkelium, californium, Einsteinium, Fermium, Mendelevium, Nobelium, Lawrencium, Rutherfordium, Dubnium, Seaborgium, Bohrium,
                      Hassium, Meitnerium, Darmstadtium, Roentgenium, Copernicium, Nihonium, Flerovium, Moscovium, Livermorium];

var gameStarted = false;
var currentWord;
var wordAsDashes;
var guessesRemaing;
var lettersGuessed;
var correctGuesses;
var numWins = 0;
var numLosses = 0;
var getNewWord;
var wordPlace;
var wordCharArray = [];
var dashesArray = [];

function startGame() {
    gameStarted = true;
    lettersGuessed = [];
    correctGuesses = 0;
    wordPlace = Math.floor(Math.random() * wordBank.length);
    currentWord = wordBank[wordPlace];
    guessesRemaing = 15 - currentWord.length;
    wordAsDashes = wordToDashes(currentWord);
    wordCharArray = currentWord.split('');
    dashesArray = wordAsDashes.split('');
    document.getElementById("currentWord").innerHTML = wordAsDashes;
    document.getElementById("lettersGuessed").innerHTML = "--";
    document.getElementById("guessesRemaing").innerHTML = guessesRemaing;
}


// event listener for keystrokes
function playGame(letter) {
    var letter = letter.toLowerCase();

    // check if key input is a letter
    if (alphabet.indexOf(letter) > -1) {
        if (wordCharArray.indexOf(letter) > -1) {
            correctGuesses++;
            showLetter(letter);
        }
        else {
            if (lettersGuessed.indexOf(letter) > -1) {
                return;
            }
            else {
                guessesRemaing--;
                document.getElementById("guessesRemaing").innerHTML = guessesRemaing;
                lettersGuessed.push(letter);
                document.getElementById("wrongGuesses").innerHTML = lettersGuessed.join(' ');
                if (guessesRemaing == 0) {
                    alert("Guess you're not metal enough... The correct metal is " + currentWord);
                    startGame();
                    numLosses++;
                    document.getElementById("losses").innerHTML = numLosses;
                }
            }
        }
    }
}

// display number of _ equal to word length
function wordToDashes(word) {
    var dashes = "";
    for (i = 0; i < word.length - 1; i++) {
        dashes += "_ ";
    }
    dashes += "_";
    return dashes;
}

// shows letter in correct location if it's in current word
function showLetter(letter) {

    for (i = 0; i < currentWord.length; i++) {
        if (letter == wordCharArray[i]) {
            dashesArray[i * 2] = letter;
            console.log(dashesArray);
        }
    }

    document.getElementById("currentWord").innerHTML = dashesArray.join("");
    checkWin();
}

function checkWin() {

    if (dashesArray.indexOf("_") === -1) {

        alert("Winner! You're so metal you RUST! The metal is " + currentWord);
        winCount++;
        document.getElementById("wins").innerHTML = winCount;
        startGame();

    }
}

document.onkeyup = function (event) {

    if (!gameStarted) {

        document.getElementById("startGame").innerHTML = "";
        startGame();
        document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
        console.log(currentWord);
        gameStarted = true;

    } else {

        playGame(event.key);
    }
}