var model = {
	count: 0,
	gameOver: false,
	num: true,
	math: false,
	
	values: ["", "", "", "", "", "", "", "", ""],
	buttonUsed: [],
	
	addValue: function(location, value) {
		console.log("Location is: "+location +", value is "+value);
		view.displayValue(location, value);
		this.values[location] = value;
		console.log(this.values);
		return true;
	},
	
	calcResult: function() {
		if (this.count === 1) {
			this.values[8] = this.values[0];
			console.log("Calculating Result");
			view.displayValue(8, this.values[8]);
		}
		if (this.count === 3) {
			this.values[8] = eval (this.values[8] + this.values[1] + this.values[2]);
			console.log("Calculating Result");
			view.displayValue(8, this.values[8]);
		}
		if (this.count === 5) {
			this.values[8] = eval (this.values[8] + this.values[3] + this.values[4]);
			console.log("Calculating Result");
			view.displayValue(8, this.values[8]);
		}
		if (this.count === 7) {
			this.values[8] = eval (this.values[8] + this.values[5] + this.values[6]);
			console.log("Calculating Result");
			view.displayValue(8, this.values[8]);
			this.gameOver = true;
			console.log(this.gameOver + ": Checking for victory");
			this.checkWin(this.values[8]);
		}
	},
	
	createNums: function() {
		var result = 24;
		var numArray = [1,2,3,4,5,6,7,8,9];
		var newNumArray = [];
		var mathArray = ['+','-','*','/'];
		var math1 = 0;
		var fourNums = [0,0,0,0]
		
		for (var i = 0; i < 3; i++) {
			//Random Math
			math1 = mathArray[Math.floor((Math.random() * mathArray.length))];
			console.log(math1);
			//Eliminate bad numbers
			var fullLength = numArray.length;
			if (math1 === '+') {
				for (var j = 0; j < fullLength; j++) {
					check = result + numArray[j]; 
					if (check < 50) {
						newNumArray.push(numArray[j]);
					}
				}
			}
			if (math1 === '-') {
				for (var j = 0; j < fullLength; j++) {
					check = result - numArray[j]; 
					if (check >= 0) {
						newNumArray.push(numArray[j]);
					}
				}
			}
			if (math1 === '*') {
				for (var j = 0; j < fullLength; j++) {
					check = result * numArray[j]; 
					if (check <= 36) {
						newNumArray.push(numArray[j]);
					}
				}
			}
			if (math1 === '/') {
				for (var j = 0; j < fullLength; j++) {
					check = result % numArray[j]; 
					if (check === 0) {
						newNumArray.push(numArray[j]);
					}
				}
			}
			console.log(numArray);			
			
			fourNums[i] = newNumArray[Math.floor((Math.random() * newNumArray.length))];
			result = eval (result + math1 + fourNums[i]);
			console.log("Result = " + result);
			console.log(fourNums); 
			
			//Clear newNumArray
			newNumArray = [];
		}	
		fourNums[3] = result;
		fourNums = this.randomizeNums(fourNums);
		 
		document.getElementById('buttonNumTop').innerText = fourNums[0];
		document.getElementById('buttonNumLeft').innerText = fourNums[1];
		document.getElementById('buttonNumRight').innerText = fourNums[2];
		document.getElementById('buttonNumBottom').innerText = fourNums[3];
		
		//If the last number is single-digit, return true, otherwise
		//return false, reset and try again.
		if (result < 10) { 
			return true; 
		}
		else {
			result = 24; 
			return false; 
		}
	},
	
	randomizeNums: function(array) {
		//Fisher-Yates Algorithm to shuffle the four numbers
		for(let i = array.length - 1; i < 0; i--){
			const j = Math.floor(Math.random() * i)
			const temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
		return array;
	},
	
	buttonToggle: function() {
		//Turn all the math on and the nums off, or vice versa
		var boolNum = this.num;
		var boolMath = this.math;

		//Swap the number buttons on/off, leave off if already used once
		//TODO: Better logic, this is way too much. Maybe make an array of names
		//["buttonTop", "buttonLeft", ...] and use that to save lines? for loop?
		if (boolNum === false) {
			if (this.buttonUsed.includes("buttonNumTop") === false ) {
				document.getElementById("buttonNumTop").disabled = boolNum;
			}
			if (this.buttonUsed.includes("buttonNumLeft") === false ) {
				document.getElementById("buttonNumLeft").disabled = boolNum;
			}
			if (this.buttonUsed.includes("buttonNumRight") === false ) {
				document.getElementById("buttonNumRight").disabled = boolNum;
			}
			if (this.buttonUsed.includes("buttonNumBottom") === false ) {
				document.getElementById("buttonNumBottom").disabled = boolNum;
			}
		}
		else {
			document.getElementById("buttonNumTop").disabled = boolNum;
			document.getElementById("buttonNumLeft").disabled = boolNum;
			document.getElementById("buttonNumRight").disabled = boolNum;
			document.getElementById("buttonNumBottom").disabled = boolNum;
		}

		//Swap the math buttons on/off
		document.getElementById("buttonMathPlus").disabled = boolMath;
		document.getElementById("buttonMathMinus").disabled = boolMath;
		document.getElementById("buttonMathMult").disabled = boolMath;
		document.getElementById("buttonMathDiv").disabled = boolMath;

		//Swap the bools. 
		[this.num, this.math] = [this.math, this.num];
	},	
	
	checkWin: function(finalResult) {
		//Simple check after last number is entered if it equals 24
		if (finalResult === 24) {
			view.displayMessage("Correct! Nicely done!");
		}
		else {
			view.displayMessage("Sorry, that does not equal 24. Try again?");
		}	
	},
	
	clear: function() {
		//Clear all the values selected by the user
		//TODO: Better way to 'reset' these?
		this.count = 0;
		this.values = ["", "", "", "", "", "", "", "", ""];
		this.gameOver = false;
		this.num = true;
		this.math = false;
		this.buttonUsed = [],
		
		this.num = false;
		this.math = true;
		buttonToggle();
		
		for (var i = 0; i < this.values.length; i++) {
			if (i != 7) {
				view.displayValue(i, "");
			}
		}
		view.displayMessage("");
	},
	
	newGame: function() {
		//Clear function as well as new numbers
		var single = false;
		while (single === false) { single = this.createNums();}
		this.result = 24;
		this.clear();
	}
}

//View object
var view = {
	displayNums: function(result) {
		document.getElementById('buttonNumTop').innerText = result[1];
		document.getElementById('buttonNumLeft').innerText = result[2];
		document.getElementById('buttonNumRight').innerText = result[3];
		document.getElementById('buttonNumBottom').innerText = result[4];
	},	
	
	displayValue: function(location, value) {
		//Update the left-most uoccupied square with what was pressed
		document.getElementById(location).innerText = value; 
	},
	
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
}

//Controller object
var controller = {

	processGuess: function(value) {
		if (model.gameOver === false) {
			model.addValue(model.count, value);
			model.count++;
			model.calcResult();
			model.buttonToggle();
		}
	}
}

function handleNumButton(eventObj) {
	console.log("Handling "+eventObj.target);
	var button = eventObj.target;
	var name = button.id;
	var value = document.getElementById(name).innerText;
	controller.processGuess(value);
	//Keep the number from being used twice
	model.buttonUsed.push(name);
}

function handleMathButton(eventObj) {
	var button = eventObj.target;
	var name = button.id;
	var value = document.getElementById(name).innerText;
	controller.processGuess(value);
}

function handleClearButton() {
	console.log("Clearing the math so far");
	model.clear();
}
function handleNewButton() {
	model.newGame();
}

function init() {
	view.displayMessage("Good luck!");
	var buttons = document.getElementsByTagName("button");
	//Handle math and num buttons
	for (var i = 0; i < buttons.length; i++) {
		var name = buttons[i].id;
		if ( name.includes("buttonNum") === true ) {
			name.onclick = handleNumButton;
		}
		else if ( name.includes("buttonMath") === true ) {
			name.onclick = handleMathButton;
		}
	}
	//Handle the remaining buttons
	var buttonClear = document.getElementById("buttonClear");
	buttonClear.onclick = handleClearButton;
	var buttonNew = document.getElementById("buttonNew");
	buttonNew.onclick = handleNewButton;
	
	//Probably a better way, but keeps cycling until it generates 4 numbers
	//that are all single digits
	var single = false;
	while (single === false) { single = model.createNums();}

}

window.onload = init;
	
