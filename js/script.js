// ======= GAME SETUP =======

// Guest names (four will be chosen per game) 
let names = ["Aarin", "Anna", "Ari", "Beau", "Chris", "Damon", "Gabi", "Hannah", "Jamal", "Jill", "Javier", "Kai", "Kayla", "Kim", "Luke", "Malik", "Nina", "Pasha", "Talia", "Trey", "Wesley"];

// List of dishes (six will appear on the menu, and one unique dish will be assigned to each of the four guests)
let dishes = ["pizza", "burger", "salad", "pasta", "soup", "sandwich", "burrito", "fish"];

// Person class will be used for four guest objects
class Guest {
    constructor(name, dish, place) {
        this.name = name;
        this.dish = dish;
        this.place = place;
    }
    
    shareIdentity(dish, name, place) {
        return `${this.dish} (${this.name}, place ${this.place})`;
    }
}

// Select random item from an array, remove it from the array and return it
function selectItem(myArray) {
    const index = (Math.floor(Math.random() * myArray.length));
    const itemChosen = myArray[index];
    if (index !== -1) {
        myArray.splice(index, 1);
    }
    return itemChosen;
}

// Create four guests
let guestOne = new Guest(selectItem(names), selectItem(dishes), 1);
let guestTwo = new Guest(selectItem(names), selectItem(dishes), 2);
let guestThree = new Guest(selectItem(names), selectItem(dishes), 3);
let guestFour = new Guest(selectItem(names), selectItem(dishes), 4);

// Create list with four guests
let table = [guestOne, guestTwo, guestThree, guestFour];

// Create separate alphabetized list of four guests
let alphaTable = table.slice().sort((a, b) => a.name.localeCompare(b.name));

// Create menu with six dishes, including four that guests have chosen. Then alphabetize menu
let menu = [guestOne.dish, guestTwo.dish, guestThree.dish, guestFour.dish, selectItem(dishes), selectItem(dishes)];
menu.sort();

// Establish positional relationships with other guests
for (guest of table) {
    // Establish right neighbor
    if (guest.place === 1) {
        guest.rightNeighbor = table[3];
      } else {
          guest.rightNeighbor = table[guest.place - 2];
        }
    // Establish left neighbor
    if (guest.place < 4) {
        guest.leftNeighbor = table[guest.place];
    } else {
        guest.leftNeighbor = table[0];
    }
    // Establish opposite person
    if (guest.place === 0) {
        guest.opposite = table[2];
      } else if (guest.place === 1) {
        guest.opposite = table[3];
      } else if (guest.place === 2) {
        guest.opposite = table[0];
      } else {
        guest.opposite = table[1];
      }
    // Create array with all related people
    guest.tablemates = [guest.rightNeighbor, guest.opposite, guest.leftNeighbor];
    // Create array with all foods the guest did not order
    guest.doesNotLike = [];
    for (dish of menu) {
        if (dish !== guest.dish) {
            guest.doesNotLike.push(dish);
        }
    }
}

// Initialize Player class
class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.turnsLeft = 8;
        this.isPlaying = true;
    }

    shareStatus(name, score, turnsLeft, isPlaying) {
        return `name: ${this.name}, score: ${this.score}, turns left: ${this.turnsLeft}, is playing: ${this.isPlaying}`;
    }
}

// ======= GAME FUNCTIONS ======

// Create four clues to help--and sometimes distract--the player
let clueAPerson = selectItem(alphaTable.slice());
let clueBPerson = selectItem(clueAPerson.tablemates);
let clueCPerson = selectItem(clueBPerson.tablemates);
let clueDPerson = selectItem(clueCPerson.tablemates);

function createClueA() {
    return `${clueAPerson.name} is not sitting next to ${clueAPerson.opposite.name}.`;
}

function createClueB() {
    if (clueBPerson.dish === "soup" || clueBPerson.dish === "fish" || clueBPerson.dish === "pizza" || clueBPerson.dish === "pasta") {
        return `${clueBPerson.name} ordered ${clueBPerson.dish}.`;
    }
    else {
        return `${clueBPerson.name} ordered a ${clueBPerson.dish}.`;
    }
}

function checkFoodPlurality(food) {
    if (food === "burger" || food === "burrito") {
        return food + "s";
    }
    else if (food == "sandwich") {
        return food + "es";
    }
    else {
        return food;
    }
}

function createClueC() {
    const undesirableFoodOne = selectItem(clueCPerson.doesNotLike);
    const undesirableFoodTwo = selectItem(clueCPerson.doesNotLike);
    return `${clueCPerson.name} does not like ${checkFoodPlurality(undesirableFoodOne)} or ${checkFoodPlurality(undesirableFoodTwo)}.`;
}


function createClueD() {
    const undesirableFoodOne = selectItem(clueDPerson.doesNotLike);
    const undesirableFoodTwo = selectItem(clueDPerson.doesNotLike);
    return `One person next to ${clueDPerson.name} does not like ${checkFoodPlurality(undesirableFoodOne)} or ${checkFoodPlurality(undesirableFoodTwo)}.`;
}

// Shuffle clues so they don't always appear in the same order
let officialClues = [createClueA(), createClueB(), createClueC(), createClueD()];

function shuffle(array) {
    let m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

shuffle(officialClues);

// Check whether a word should be plural based on if a condition is true. If it is, add an "s" to the word. If not, return the word
function checkPlurality(word, condition) {
    if (condition) {
        return word + "s";
    }
    else {
        return word;
    }
}

// ======= CREATE VARIABLES FROM DOM ELEMENTS =======

// Intro message
const closeButton = document.getElementById("close");
const introMessage = document.getElementById("intro-message");
const introOverlay = document.getElementById("cover");

// Clues and guesses box
const cluesAndGuessesBox = document.getElementById("clues-and-guesses-box");
const cluesHeading = document.getElementById("clues-heading");
const guessesHeading = document.getElementById("guesses-heading");
const guestList = document.getElementById("guest-list");
const cluesContent = document.getElementById("clues");
const guessContent = document.getElementById("guess-content");

// Answer table places
const answerTable = document.getElementById("answer-table");
const placeOne = document.getElementById("place-one");
const placeTwo = document.getElementById("place-two");
const placeThree = document.getElementById("place-three");
const placeFour = document.getElementById("place-four");

// Dish buttons
const dishButtonTable = document.getElementById("dish-button-table");
const dishOne = document.getElementById("dish-1");
const dishTwo = document.getElementById("dish-2");
const dishThree = document.getElementById("dish-3");
const dishFour = document.getElementById("dish-4");
const dishFive = document.getElementById("dish-5");
const dishSix = document.getElementById("dish-6");

// Enter and play again buttons
const makeGuess = document.getElementById("enter");
const playAgain = document.getElementById("play-again");

// Turn counter table and cells
const turnCounter = document.getElementById("turn-counter");
const turnOneBox = document.getElementById("turn-1");
const turnTwoBox = document.getElementById("turn-2");
const turnThreeBox = document.getElementById("turn-3");
const turnFourBox = document.getElementById("turn-4");
const turnFiveBox = document.getElementById("turn-5");
const turnSixBox = document.getElementById("turn-6");
const turnSevenBox = document.getElementById("turn-7");
const turnEightBox = document.getElementById("turn-8");

// ======= WEB FUNCTIONS =======

// Initialize player object
playerOne = new Player("Player One");

// Activate close button to hide intro message
closeButton.addEventListener("click", function closeWindow(){
    introMessage.style.display = "none";
    introOverlay.style.display = "none";
})

// Add clues to clues and guesses box when game loads
guestList.innerHTML += `<p><span class="make-bold">GUESTS:</span> ${alphaTable[0].name}, ${alphaTable[1].name}, ${alphaTable[2].name}, ${alphaTable[3].name} (not listed in order)</p>`;
cluesContent.innerHTML = `<p>The guests are seated at a round table. You can assume each person ordered one unique item from the menu. ${guestOne.name} is sitting at seat 1. ${officialClues[0]} ${officialClues[1]} ${officialClues[2]} ${officialClues[3]}</p>`;

// Show player's guesses in clues and guesses box after first guess is made
function showGuesses() {
    guessContent.style.display = "block";
    cluesHeading.style.color = "rgba(255, 255, 255, .5)";
    guessesHeading.style.color = "rgba(255, 255, 255, 1)";
    cluesContent.style.display = "none";
    guessContent.style.display = "block";
    guestList.style.display = "none";
}
guessesHeading.addEventListener("click", showGuesses);

// Show clues when player clicks clues heading
function showClues() {
    guessContent.style.display = "none";
    guessesHeading.style.color = "rgba(255, 255, 255, .5)";
    cluesHeading.style.color = "rgba(255, 255, 255, 1)";
    guessContent.style.display = "none";
    cluesContent.style.display = "block";
    guestList.style.display = "block";
}
cluesHeading.addEventListener("click", showClues);

// Populate dish buttons
const dishButtons = [dishOne, dishTwo, dishThree, dishFour, dishFive, dishSix];
for (i = 0; i < dishButtons.length; i++) {
    dishButtons[i].innerHTML = menu[i];
}

// Fill a new turn boxe after player complete a turn
const turnBoxes = [turnOneBox, turnTwoBox, turnThreeBox, turnFourBox, turnFiveBox, turnSixBox, turnSevenBox, turnEightBox];
function updateTurnCounter(correctPlacements) {
    let i = 7 - playerOne.turnsLeft;
    if (i >= 0) {
        turnBoxes[i].style.backgroundColor = "#F200DB";
        turnBoxes[i].innerHTML = correctPlacements;
    }
}

// Check answer after each submission. If it is correct, end the game and give the score. If not, reduce the number of turns and tell the player how many dishes, if any, were placed in the correct spot
function checkAnswer() {
    let answerOne = document.getElementById("place-one");
    let answerTwo = document.getElementById("place-two");
    let answerThree = document.getElementById("place-three");
    let answerFour = document.getElementById("place-four");
    let answers = [answerOne.innerHTML, answerTwo.innerHTML, answerThree.innerHTML, answerFour.innerHTML];

    // Clear array of banned menu items
    bannedFromAdding = [];

    // Reset answer places
    placeOne.click();
    placeTwo.click();
    placeThree.click();
    placeFour.click();
    
    // Tally the number of correctly placed dishes. Even if a dish belongs at the table but is not placed correctly, it will not show up in the tally
    let answerCount = 0;
    for (i = 0; i < 4; i++) {
        if (answers[i] === table[i].dish) {
            answerCount += 1;
        }
    }

    showGuesses();

    // Create function to clear game content at the end of the game
    function clearGameContent() {
        dishButtonTable.style.display = "none";
        makeGuess.style.display = "none";
        answerTable.style.display = "none";
        cluesContent.style.display = "none";
        cluesAndGuessesBox.style.border = "none";
        cluesAndGuessesBox.style.overflowY = "visible";
        cluesAndGuessesBox.style.textAlign = "center";
        guestList.style.display = "none";
        cluesHeading.style.display = "none";
        guessesHeading.style.display = "none";
    }

    // If the player guesses the correct order, end the game and show the score
    if (answerCount === 4) {
        clearGameContent();
        playerOne.isPlaying = false;
        playerOne.turnsLeft -= 1;
        updateTurnCounter(answerCount);
        playerOne.score = playerOne.turnsLeft * 100 + 100;
        guessContent.innerHTML = `<h2>WOOHOO!</h2><p>You win! You solved the problem in ${(8 - playerOne.turnsLeft)} ${checkPlurality("turn", ((8 - playerOne.turnsLeft) != 1))}.</p><br><p><span class="make-bold">Score:</span> ${playerOne.score}</p>`;
        playAgain.style.display = "block";
    }
    // If the player does not guess the correct order, show them how many dishes were place in the correct score. If they're out of turns, call the gameOver function
    else {
        playerOne.turnsLeft -= 1
        updateTurnCounter(answerCount);
        if (playerOne.turnsLeft == 0) {
            gameOver(answerCount);
        }
        else {
            oldStatement = guessContent.innerHTML;
            statement = `<p><span class="make-bold">Guess ${8 - Math.abs(playerOne.turnsLeft)}:</span> ${answers[0]}, ${answers[1]}, ${answers[2]}, ${answers[3]}</p><p><em>${answerCount} ${checkPlurality("item", answerCount !== 1)} placed correctly.</em></p><br>`;
            guessContent.innerHTML = statement;
            guessContent.innerHTML += oldStatement;
        }
    }

    // End the game and print the correct answer
    function gameOver(answerCount) {
        clearGameContent();
        playerOne.isPlaying = false;
        statement = `<p>${answerCount} ${checkPlurality("item", answerCount !== 1)} placed correctly.</p>`;
        cluesAndGuessesBox.innerHTML = statement;
        cluesAndGuessesBox.innerHTML += `<p>The correct answer was:<br>1. ${guestOne.dish} (${guestOne.name})<br>2. ${guestTwo.dish} (${guestTwo.name})<br>3. ${guestThree.dish} (${guestThree.name})<br>4. ${guestFour.dish} (${guestFour.name})</p>`;
        cluesAndGuessesBox.innerHTML += `<h2>GAME OVER</h2>`;
        playAgain.style.display = "block";
        }
}

// Create event listener for enter
makeGuess.addEventListener("click", function checkAnswerIfReady() {
    // Only check answer if there are four unique answers from the menu array
    const answers = [placeOne.innerHTML, placeTwo.innerHTML, placeThree.innerHTML, placeFour.innerHTML];
    const doesArrayHaveDuplicates = answers.some(
        (val, i) => answers.indexOf(val) !== i
    );
    if ((menu.includes(placeOne.innerHTML) && menu.includes(placeTwo.innerHTML) && menu.includes(placeThree.innerHTML) && menu.includes(placeFour.innerHTML)) && (doesArrayHaveDuplicates === false)) {
        checkAnswer();
    } else {
        alert("Please select four unique menu items.");
    }
});

// Create ability to add and remove menu text at table according to places
let bannedFromAdding = [];
function populatePlace(dishButton, text) {
    if (placeOne.innerHTML === "" && !bannedFromAdding.includes(text)) {
        dishButton.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        placeOne.innerHTML = text;
        bannedFromAdding.push(text);
        // Add event listener for place one that clears text from it when clicked and resets the dish button that originally populated it. Then the event listener function deletes itself
        placeOne.addEventListener("click", function clearPlaceOne() {
            placeOne.innerHTML = "";
            dishButton.style.backgroundColor = "#F200DB";
            const returnBanned = (element) => element === dishButton.innerHTML;
            let isBannedItem = bannedFromAdding.findIndex(returnBanned);
            bannedFromAdding.splice(isBannedItem, 1);
            placeOne.removeEventListener("click", clearPlaceOne);
        });
    } else if (placeTwo.innerHTML === "" && !bannedFromAdding.includes(text)) {
        dishButton.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        placeTwo.innerHTML = text;
        bannedFromAdding.push(text);
        placeTwo.addEventListener("click", function clearPlaceTwo() {
            placeTwo.innerHTML = "";
            dishButton.style.backgroundColor = "#F200DB";
            const returnBanned = (element) => element === dishButton.innerHTML;
            let isBannedItem = bannedFromAdding.findIndex(returnBanned);
            bannedFromAdding.splice(isBannedItem, 1);
            placeTwo.removeEventListener("click", clearPlaceTwo);
        });
    } else if (placeThree.innerHTML === "" && !bannedFromAdding.includes(text)) {
        dishButton.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        placeThree.innerHTML = text;
        bannedFromAdding.push(text);
        placeThree.addEventListener("click", function clearPlaceThree() {
            placeThree.innerHTML = "";
            dishButton.style.backgroundColor = "#F200DB";
            const returnBanned = (element) => element === dishButton.innerHTML;
            let isBannedItem = bannedFromAdding.findIndex(returnBanned);
            bannedFromAdding.splice(isBannedItem, 1);
            placeThree.removeEventListener("click", clearPlaceThree);
        });
    } else if (placeFour.innerHTML === "" && !bannedFromAdding.includes(text)) {
        dishButton.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        placeFour.innerHTML = text;
        bannedFromAdding.push(text);
        placeFour.addEventListener("click", function clearPlaceFour() {
            placeFour.innerHTML = "";
            dishButton.style.backgroundColor = "#F200DB";
            const returnBanned = (element) => element === dishButton.innerHTML;
            let isBannedItem = bannedFromAdding.findIndex(returnBanned);
            bannedFromAdding.splice(isBannedItem, 1);
            placeFour.removeEventListener("click", clearPlaceFour);
        });
    }
}

dishOne.addEventListener("click", function addButtonOne() {
    populatePlace(dishOne, dishOne.innerHTML);
});
dishTwo.addEventListener("click", function addButtonTwo() {
    populatePlace(dishTwo, dishTwo.innerHTML);
});
dishThree.addEventListener("click", function addButtonThree() {
    populatePlace(dishThree, dishThree.innerHTML);
});
dishFour.addEventListener("click", function addButtonFour() {
    populatePlace(dishFour, dishFour.innerHTML);
});
dishFive.addEventListener("click", function addButtonFive() {
    populatePlace(dishFive, dishFive.innerHTML);
});
dishSix.addEventListener("click", function addButtonSix() {
    populatePlace(dishSix, dishSix.innerHTML);
});