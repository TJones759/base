/*var model = {
	boardSize: 3,
	//TODO: Use board size to make table length = BS^2
	grid: ["", "", "", "", "", "", "", "", ""],
	
	points: [
		{ locations: [A0, A1, A2], }
		{ locations: [B0, B1, B2], }
		{ locations: [C0, C1, C2], }
		{ locations: [A0, B1, C2], }
		{ locations: [C0, B1, A2] }
	],

	//guess = A0 to C2
	placeMark: function(guess) {
		//place the player's mark on the grid
		//loop from 0 to 8
		for (var i = 0; i < this.boardSize*this.boardSize; i++) {
			//Get the current value in that grid
			
			var square = this.grid[i];
			var index = ship.locations.indexOf(guess);

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			if (grid[index] === "x" || grid[index] === "o") {
				view.displayMessage("That square is already claimed. Try again.");
				return true;
				
			} else if (index >= 0) {
				grid[index] = "x";
				view.displayHit(guess);

				if (this.victory()) {
					view.displayMessage("You sank my battleship!");
				}
				return true;
			}
		}

		return false;
	},



	clear: function() {}
		//Clear the grid after the game ends and user wants to replay


	aiEasy: function() {
		//Will guess random squares
		updateGrid ( randrange(0,3), randrange(0,3), 'O' )
	}
	
	aiHard: function() {
		//Will use logic to make it impossible for player to window
	}
	
	aiMedium: function() {
		//Will find middle ground between random and logic
	}
	
	victory: function(points) {
		//Checks if there's a victory condition, returns True
		sum = 0;
		for (var i = 0; i < location.length; i++) {
			if (points[i] == "x") {
				sum++;
			else if (points[i] == "o") {
				sum--;
			}
			}

	
}
*/
var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayX: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "x");
	},

	displayO: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "o");
	}

}; 

view.displayX("00");
view.displayO("01");
view.displayX("02");
view.displayX("10");
view.displayX("11");
view.displayX("12");
view.displayX("20");
view.displayX("21");
view.displayX("22");


/*
var controller = {
	turnCount = 0;
	
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			
			var hit = model.placeMark(location);
			
			if (victory && playerTurn) {
				view.displayMessage("Congratulations, you've won!");
				//Add a display element for striking through the winning line
			else if (victory && not playerTurn) {
				view.displayMessage("The Computer wins!");
				//Add a display element for striking through the winning line
			}
			else if (turnCount == 8) {
				view.displayMessage("It's a draw");
			}
		}
		turnCount++;
	}
}


// helper function to parse a guess from the user

function parseGuess(guess) {
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
*/