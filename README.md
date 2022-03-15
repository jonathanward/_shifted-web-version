<div align="center">
  <h1>:pizza: _shifted (web version)</h1>
</div>
<br>

## What is _shifted (web version)?

_shifted (web version) is a browser-based game that challenges the user to place four dishes at a round table based on clues, as well as trial and error. 

## How does it work?

### Gameplay

_shifted is a one-player game. 

The player is given an unordered list of the names of four guests seated at a round table. The player is also given a menu with the six dishes the restaurant is serving that night. Finally, the player is given several clues related to where the guests are sitting and what dishes they are eating.

The player can assume each guest chose one unique dish from the menu. Consequently, two of the six menu items are not present at the table.

On each turn, the player guesses the order of dishes (starting at place 1). The player has eight guesses.

### Clues

The clues given at the beginning of each game tell the user information about the dishes and guests. Below are example clues for guests Beau (place 1, pasta), Anna (place 2, burrito), Trey (place 3, soup) and Pasha (place 4, burger):

- Beau is sitting at seat 1.
- Pasha is not sitting next to Anna.
- Trey ordered soup.
- One person ordered a burger.
- Pasha does not like burritos or pasta.

### Guessing

The player will click or tap the order of dishes starting in place 1. If they guess correctly, they win the game! If the guess is not correct, they will be told how many dishes, if any, are in the correct place.

Once the player adds the dish to the table, they can remove the dish by clicking or tapping the dish name.

The player will not know if the dish belongs on the table unless it is in the correct place.

### Scoring

The player's score will be based on the number of turns it takes the player to correctly guess the placement of dishes.

### Design Considerations

I mocked up the page design in Adobe Illustrator with the exact fonts, layout and colors. I then tried to replicate my Illustrator design as closely as possible using HTML and CSS.

To create similar experiences for mobile and desktop users, I relied on responsive design (which meant using vh, em and % instead of px as much as possible) and media queries.

I chose colors with high contrast to achieve a good accessibility rating for the game's text. The white on dark purple text has a contrast rating of 16.27.

## Additional Notes

### Terminal Version

I created _shifted originally in Python as a terminal game for the Codecademy Computer Science career path. Check out <a href="https://github.com/jonathanward/_shifted">the terminal-based version</a> to see my initial concept.

### Inspirations

While seeking to strengthen my problem-solving and analytical skills, I’ve been on the hunt for fun logic puzzles, which can play an important role in exercising our critical thinking skills. I was inspired to develop this game based on my experiences with the following:

- Einstein’s Logic Puzzle
- Logical Journey of the Zoombinis (Pizza Pass level)
- Mastermind