var model = {
	boardSize: 3,
	rounds: 0,
	scoreHuman: 0,
	scoreComputer: 0,
	draws: 0,
	winner: "Computer",
	turnCount: 0,
	difficulty: "Easy",
	//TODO: Use board size to make table length = BS^2?
	grid: [
		//Horizontal
		{ squares: ["00", "01", "02"], marks: ["", "", ""] },
		{ squares: ["10", "11", "12"], marks: ["", "", ""] },
		{ squares: ["20", "21", "22"], marks: ["", "", ""] },
		//Vertical
		{ squares: ["00", "10", "20"], marks: ["", "", ""] },
		{ squares: ["01", "11", "21"], marks: ["", "", ""] },
		{ squares: ["02", "12", "22"], marks: ["", "", ""] },
		//Diagonal
		{ squares: ["00", "11", "22"], marks: ["", "", ""] },
		{ squares: ["02", "11", "20"], marks: ["", "", ""] }
	],

	placeMark: function(guess, turn) {
		//place the player's mark on the grid
		console.log(turn);
		for (var i = 0; i < 8; i++) {
			//Get the current value in the grid's index
			var row = this.grid[i];
			var squares = row.squares;
			var index = squares.indexOf(guess);
			
			//make sure guess isn't ouside of the possible dimensions
			//if guess's value (A0) isn't in this squares, returns -1
			if (index >= 0) {
				if (row.marks[index] === "x" || row.marks[index] === "o") {
					view.displayMessage("That square is already claimed. Try again.");
					return false;
				}
				else {
					//X is Human, O is Computer
					row.marks[index] = turn;
					if (turn === "x") {
						view.displayX(guess);
					}
					else {
						view.displayO(guess);
					}

					//Check for victory
					if (this.victory(row.marks)) {
						console.log("Victory!");
						//Move and make visible the winning line
						view.displayLine(i);
						if ( turn === "x" ) {
							view.displayMessage("Game Over, Player Wins!");
							this.winner = "human";
							this.scoreHuman++;

						}
						else {
							view.displayMessage("Game Over, Computer Wins!");
							this.winner = "computer";
							this.scoreComputer++;
						}
						//End the game, display score
						//TODO: make Play Again visible now
						view.displayScore("Score: " + this.scoreHuman +
						" - " + this.scoreComputer + " - " + this.draws);
						return "Game Over";
					}
					else {
						view.displayMessage("Next turn.");
					}

				//return true;              
				}
			}

		}
		model.turnCount++;
		return true;
	},
	
	changeDifficulty: function() {
		//Change the difficulty if the Player goes first and board is clear
		//TODO: Work if game is over?
		var text = document.getElementById("difficultyButton").innerText;
		console.log("Text is "+text);
		if (this.turnCount === 0) {
			if (text === "Difficulty: Easy" && this.turnCount === 0) {
				document.getElementById("difficultyButton").innerText = "Difficulty: Hard"; 
				model.difficulty = "Hard";
			}
			if (text === "Difficulty: Hard" && this.turnCount === 0) {
				document.getElementById("difficultyButton").innerText = "Difficulty: Easy";
				model.difficulty = "Easy";
			}
		}
	},
	
	clear: function() {
		//Clear the grid after the game ends and user wants to replay
		//this.grid.splice(0, this.grid.length);
		for (var i = 0; i < 8; i++) {
			var row = this.grid[i];
			row.marks = ["", "", ""];

		}
		for (var i = 0; i < 9; i++) {
			id = i.toString(3);
			if (i < 3) {
				id = "0" + id;
			}
			var element = document.getElementById(id);
			element.classList.remove("x","o");
		}
		
		//Reset Turn count
		this.turnCount = 0;
		
		//Clear the message
		view.displayMessage("New Game");
		
		//TODO: make this better
		document.getElementById("hor").style.display = "none";
		document.getElementById("vert").style.display = "none";
		document.getElementById("diag1").style.display = "none";
		document.getElementById("diag2").style.display = "none";
		
		//decide who goes first
		if (this.winner === "Player") {
			controller.markPlayer = true;
		}
	},

	victory: function(marks) {
		//Checks if there's a victory condition, returns True
		sum = 0;
		for (var i = 0; i < this.boardSize; i++) {
			if (marks[i] === "x") {
				sum++;
			}
			else if (marks[i] === "o") {
				sum--;
			}
		}

		return (Math.abs(sum) === 3);
	},
	
	twoPoints: function(marks, i) {
		//if i == 'x', computer is blocking. i == 'o', computer is trying to win.
		//TODO: Combine this, TPB, and victory into checkPoints (marks, condition)
		console.log(marks);
		if (marks[0] === i && marks[1] === i && marks[2] === "") { 
			return 2; }
		if (marks[0] === i && marks[1] === "" && marks[2] === i) { 
			return 1; }
		if (marks[0] === "" && marks[1] === i && marks[2] === i) { 
			return 0; }
		//If no wins or crucial blocks are found, return null
		else { 
			return null; }
		
		//TODO: Implement this instead
		//var elementPos = array.map(function(x) {return x.id; }).indexOf(idYourAreLookingFor);
		//var objectFound = array[elementPos];
	},
	
	checkCenter: function() {
		//TODO: see if this can be easily expanded to check any square, 
		//for optimizedPlay()
		var row = this.grid[1];
		var marks = row.marks;
		return marks[1];
	}
}

var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayScore: function(msg) {
		var messageArea = document.getElementById("scoreArea");
		messageArea.innerHTML = msg;
	},

	displayX: function(location) {
		console.log(location);
		var cell = document.getElementById(location);
		cell.setAttribute("class", "x");
	},

	displayO: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "o");
	},
	
	displayLine: function(index) {
		//Move the win bar to the right location, then make it visible
		console.log("Index: "+index);
		if (index >= 0 && index <= 2) {
			console.log("horizontal");
			winLocation(hor, "horizontal", index); 
			document.getElementById("hor").style.display = "block";
		}
		else if (index >= 3 && index <= 5) {
			console.log("vertical");
			winLocation(vert, "vertical", index-3);
			document.getElementById("vert").style.display = "block";
		}
		else if (index === 6) {
			console.log("diag1");
			document.getElementById("diag1").style.display = "block";
		}
		else if (index === 7) {
			console.log("diag2");
			document.getElementById("diag2").style.display = "block";
		}
	}

}; 

//Controller object
var controller = {
	compLocation: false,
	markComputer: false,
	markPlayer: false,
	
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.markPlayer = model.placeMark(location, "x");
			console.log("markPlayer = "+this.markPlayer);
			console.log("turnCount = " + model.turnCount);
			if (model.turnCount === 9) {
				view.displayMessage("It's a draw!");
				model.draws++;
				view.displayScore("Score: " + model.scoreHuman +
						" - " + model.scoreComputer + " - " + model.draws);
			}
			else if (this.markPlayer && this.markPlayer !== "Game Over" 
				&& model.turnCount !== 9 ) {
				while (!(this.markComputer)) {
					if (model.difficulty === "Easy") 
						{ this.compLocation = compGuessEasy(); }
					else
						{ this.compLocation = compGuessHard(); }
					console.log("Computer Guess: " + this.compLocation);
					this.markComputer = model.placeMark(this.compLocation, "o");
				}
				this.markComputer = false;
			}
		}
		//TODO: Stop accepting input if there's a draw. For now, just notify
		
		console.log("turnCount = " + model.turnCount);

	}
}

// helper function to parse a guess from the user
function parseGuess(guess) {
	//TODO: Replace with just two input values. Keep battleship format for now
	var alphabet = ["A", "B", "C"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board. A-C, 0-2.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}

function init() {
	var guessButton = document.getElementById("guessButton");
	guessButton.onclick = handleGuessButton;
	var playAgainButton = document.getElementById("playAgainButton");
	playAgainButton.onclick = handleReplayButton;
	var difficultyButton = document.getElementById("difficultyButton");
	difficultyButton.onclick = handleDifficultyButton;
}

function handleGuessButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
}

//Clear the board
function handleReplayButton() {
	model.clear();
}

//Change the difficulty if turn = 0
function handleDifficultyButton() {
	model.changeDifficulty();
}

//Computer logic
function compGuessEasy() {
	var row = Math.floor((Math.random() * 3)).toString();
	var col = Math.floor((Math.random() * 3)).toString();
	
	return (row + col);
}

function compGuessHard(turn) {
	//TODO: checkSquare function
	//TODO: optimalPlay function
	var row = '';
	var col = '';
	
	if (model.turnCount === 0) {
		//Pick a random corner
		row = 2*Math.floor((Math.random() * 2));
		col = 2*Math.floor((Math.random() * 2));
		row = row.toString();
		col = col.toString();
	}
	
	else if (model.turnCount  === 1) {
		var check = model.checkCenter();
		if (check === 'x') {
			console.log("Player took the center");
			row = 2*Math.floor((Math.random() * 2));
			col = 2*Math.floor((Math.random() * 2));
			row = row.toString();
			col = col.toString();
		}
		else {
			row = "1";
			col = "1";
		}
	}
	
	else if (model.turnCount  === 2) {
		var check = model.checkCenter();
		if (check === '') {
			row = "1";
			col = "1";
		}
		else {
			row = 2*Math.floor((Math.random() * 2));
			col = 2*Math.floor((Math.random() * 2));
			row = row.toString();
			col = col.toString();
		}
	}
	
	else {
		//Go for the win if it's there
		for (var i = 0; i < 8; i++) {
			//Get the current value in the grid's index
			line = model.grid[i];
			marks = line.marks;
			squares = line.squares;
			
			var win = model.twoPoints(marks, 'o');
			console.log("Win: "+win);
			if (win != null) {
				return squares[win].toString();
			}
		}
		for (var i = 0; i < 8; i++) {
			//Get the current value in the grid's index
			line = model.grid[i];
			marks = line.marks;
			squares = line.squares;
			//Go for the block if it's there
			var block = model.twoPoints(marks, 'x'); 
			if (block != null) {
				return squares[block].toString();
				}
			}	
		
		//TODO: Clean this up
		if (model.turnCount === 8) { return null; }
		
		//TODO: model.optimalPlay
		else { 
			row = Math.floor((Math.random() * 3)).toString();
			col = Math.floor((Math.random() * 3)).toString();
		}
	}
	
	return (row + col);
}

//Place the winning strike in the right position
function winLocation(element, direction, amount) {
	console.log("Calling strike element");
	if (element === hor) {
		document.getElementById("hor").style.top = amount*75 + 125 +"px";
	}
	if (element === vert) {
		console.log("Verticallll");
		document.getElementById("vert").style.left = amount*77 + 130 +"px";
	}
}

window.onload = init;
