// game object with initial states alphabet array and word Bank array.
var metalGame = {

    alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

    metalBank: [beryllium, sodium, magnesium, aluminium, potassium, calcium, scandium, titanium, vanadium, chromium,
        manganese, iron, cobalt, copper, nickle, zinc, gallium, rubidium, strontium, yttrium, zirconium, niobium,
        molybdenum, technetium, ruthenium, rhodium, palladium, silver, cadmium, indium, tin, cesium, barium, lanthanum,
        cerium, praseodymium, neodymium, promethium, terbium, samarium, europium, gadolinium, dysprosium, holmium, Erbium,
        Thulium, Ytterbium, Lutetium, Hafnium, Tantalum, Tungsten, Rhenium, Osmium, Iridium, Platinum, Gold, Mercury, Thallium,
        Lead, Bismuth, Polonium, Francium, Radium, Actinium, Thorium, Protactinium, Uranium, Neptunium, Plutonium, Americium, Curium,
        Berkelium, californium, Einsteinium, Fermium, Mendelevium, Nobelium, Lawrencium, Rutherfordium, Dubnium, Seaborgium, Bohrium,
        Hassium, Meitnerium, Darmstadtium, Roentgenium, Copernicium, Nihonium, Flerovium, Moscovium, Livermorium],

    gameRunning: false,
    wins: 0,
    losses: 0,
    wrongGuesses: [],
    remainingGuesses: ,
    correctGuesses: ,
    wordIndex: ,
    wordAsArray: [],
    wordObscured: '',


    newGame: function () {
        this.gameRunning = true;
        this.wrongGuesses = [];
        this.correctGuesses = [];
        this.remainingGuesses = 12;
        this.correctGuesses = 0;
        this.currentWord = this.metalBank[Math.floor(Math.random() * this.metalBank.length)].toLowerCase();

        console.log(this.currentWord);

        this.wordAsArray = this.currentWord.split();

        console.log(this.wordAsArray);

        this.wordObscured = this.wordToDashes(this.wordAsArray);

        $("#wrongGuesses").text = "....";

        $("#guessesRemaing").innerHTML = this.remaingGuesses;

        $('#currentWord').innerHTML = this.wordObscured;

    },

    // generate a string of _ equal to word length to display
    wordToDashes: function (word) {

        var obscuredWord = "";
        for (i = 0; i < this.word.length; i++) {
            obscuredWord += "_ ";
        }
        return obscuredWord;
    },
    // check for win condition
    checkWin: function () {

        if (this.wordObscured.indexOf("_") === -1) {

            alert("Winner! You're so metal you RUST! The metal is " + this.currentWord);
            this.wins++;
            $("#wins").innerHTML = this.wins;
            this.startGame();

        }
    },
    // method to update the display with the letter if present
    showLetter: function (letter) {

        for (i = 0; i < this.currentWord.length; i++) {
            if (letter.toLowerCase() == this.currentWord.charAt(i)) {
                this.wordObscured[i * 2] = letter;
                console.log(this.wordObscured);
            }
        }

        $("#currentWord").innerHTML = this.wordObscured
        this.checkWin();
    },


    // function that handles keystrokes
    playGame: function (letter) {
        var letter = letter.toLowerCase();

        // check if key input is a letter
        if (this.alphabet.indexOf(letter) > -1) {
            if (this.wordAsArray.indexOf(letter) > -1) {
                this.correctGuesses++;
                this.showLetter(letter);
            }
            else if (this.wrongGuesses.indexOf(letter) > -1) {
                return;
            }
            else {
                this.guessesRemaing--;
                $("#guessesRemaing").innerHTML = this.guessesRemaing;
                this.wrongGuesses.push(letter);
                $("#wrongGuesses").innerHTML = this.wrongGuesses.join(' ');
                if (this.guessesRemaing == 0) {
                    alert("Guess you're not metal enough... The correct metal is " + this.currentWord);
                    this.newGame();
                    this.losses++;
                    $("#losses").innerHTML = this.losses;
                }
            }
        }
    }


};


// Event listener looking for keystrokes to pass to the game object.
document.onkeyup = function (event) {

    if (metalGame.gameRunning == false) {

        metalGame.newGame();
        $("#startGame").innerHTML = "Round started!";
        $("#currentWord").innerHTML = metalGame.wordObscured;
        console.log(metalGame.currentWord);
        console.log(metalGame.wordObscured);

    } else {

        metalGame.playGame(event.key);
    }
}