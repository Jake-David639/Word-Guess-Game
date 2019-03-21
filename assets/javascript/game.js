var victorySong = document.createElement("audio");

victorySong.setAttribute("src", "assets/Chemical_Calisthenics.m4a");

$(".pause-button").on("click", function() {
    victorySong.pause();
});

// game object with initial states alphabet array and word Bank array.
var metalGame = {

    alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

    metalBank: ['beryllium', 'sodium', 'magnesium', 'aluminium', 'potassium', 'calcium', 'scandium', 'titanium', 'vanadium', 'chromium',
        'manganese', 'iron', 'cobalt', 'copper', 'nickle', 'zinc', 'gallium', 'rubidium', 'strontium', 'yttrium', 'zirconium', 'niobium',
        'molybdenum', 'technetium', 'ruthenium', 'rhodium', 'palladium', 'silver', 'cadmium', 'indium', 'tin', 'cesium', 'barium', 'lanthanum',
        'cerium', 'praseodymium', 'neodymium', 'promethium', 'terbium', 'samarium', 'europium', 'gadolinium', 'dysprosium', 'holmium', 'erbium',
        'thulium', 'ytterbium', 'lutetium', 'hafnium', 'tantalum', 'tungsten', 'rhenium', 'osmium', 'iridium', 'platinum', 'gold', 'mercury', 'thallium',
        'lead', 'bismuth', 'polonium', 'francium', 'radium', 'actinium', 'thorium', 'protactinium', 'uranium', 'neptunium', 'plutonium', 'americium', 'curium',
        'berkelium', 'californium', 'einsteinium', 'fermium', 'mendelevium', 'nobelium', 'lawrencium', 'rutherfordium', 'dubnium', 'seaborgium', 'bohrium',
        'hassium', 'meitnerium', 'darmstadtium', 'roentgenium', 'copernicium', 'nihonium', 'flerovium', 'moscovium', 'livermorium'],

    gameRunning: false,
    wins: 0,
    losses: 0,
    wrongGuesses: [],
    remainingGuesses: 12,
    correctGuesses: 0,
    wordAsArray: [],
    wordObscured: [],

    newGame: function () {
        this.gameRunning = true;
        this.wrongGuesses = [];
        this.correctGuesses = [];
        this.remainingGuesses = 12;
        this.correctGuesses = 0;
        this.currentWord = this.metalBank[Math.floor(Math.random() * this.metalBank.length)];

        console.log(this.currentWord);

        this.wordAsArray = this.currentWord.split('');

        console.log(this.wordAsArray);

        this.wordObscured = this.wordToDashes(this.wordAsArray);

        document.getElementById("wrongGuesses").innerHTML = "--";

        document.getElementById("guessesRemaing").innerHTML = this.remainingGuesses;

        document.getElementById('currentWord').innerHTML = this.wordObscured.join(' ');

    },

    // generate an array of _ equal to word length
    wordToDashes: function (word) {

        var obscuredWord = [];
        for (i = 0; i < word.length; i++) {
            obscuredWord[i] = "_";
        }
        return obscuredWord;
    },

    // check for win condition
    checkWin: function () {

        if (this.wordObscured.indexOf("_") === -1) {

            alert("Winner! You're so metal you RUST! The metal is " + this.currentWord);
            this.wins++;
            document.getElementById("wins").innerHTML = this.wins;
            victorySong.play();
            this.newGame();

        }
    },

    // method to update the display with the letter if present
    showLetter: function (letter) {

        for (i = 0; i < this.currentWord.length; i++) {
            if (letter.toLowerCase() == this.currentWord.charAt(i)) {
                this.wordObscured[i] = letter;
                console.log(this.wordObscured);
                console.log(this.wordObscured.join(' '));
            }
        }

        document.getElementById("currentWord").innerHTML = this.wordObscured.join(' ');
        this.checkWin();
    },

    // function that handles keystroke input
    playGame: function (letter) {
        var letter = letter.toLowerCase();

        // check if key input is a letter
        if (this.alphabet.indexOf(letter) > -1) {

            if (this.wordAsArray.indexOf(letter) > -1) {

                this.correctGuesses++;
                this.showLetter(letter);

            } else if (this.wrongGuesses.indexOf(letter) > -1) {  // does not decrement remaining guesses if letter was previously entered

                return;

            } else {

                this.remainingGuesses--;
                document.getElementById("guessesRemaing").innerHTML = this.remainingGuesses;
                this.wrongGuesses.push(letter);
                document.getElementById("wrongGuesses").innerHTML = this.wrongGuesses.join(' ');

                if (this.remainingGuesses == 0) {

                    alert("Guess you're not metal enough... The correct metal is " + this.currentWord);
                    this.losses++;
                    document.getElementById("losses").innerHTML = this.losses;
                    this.newGame();
                }
            }
        }
    }


};


// Event listener looking for keystrokes to pass to the game object.
document.onkeyup = function (event) {

    if (metalGame.gameRunning == false) {

        metalGame.newGame();
        document.getElementById("startGame").innerHTML = "Round started!";
        document.getElementById("currentWord").innerHTML = metalGame.wordObscured.join(' ');
        console.log(metalGame.currentWord);
        console.log(metalGame.wordObscured);
        console.log(metalGame.wordObscured.join(' '));

    } else {

        metalGame.playGame(event.key);
    }
}
