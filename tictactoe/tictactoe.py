#TicTacToe

#Matrix of values 3x3?

#Display function

#Input from user

#Hard vs Easy

#Logic for Hard

#Start with tables?
from random import randrange
import sys

#import numpy
import time


scoreHuman = 0
scoreBot = 0
humanFirst = True
victory = False
player = True

table = ([" ", " ", " "],
		[" ", " ", " "],
		[" ", " ", " "])

scoreHor = [0, 0, 0]
scoreVert = [0, 0, 0]
scoreDiag = [0, 0]

turnCount = 0

lastMove = 0

class Human:

	def __init__ ( self, score, first ):
		self.score = score
		self.first = first

	def placeMark(self):
		print ("Enter location. User is X, enter x and y coordinates, with 0,0 being top left. ")
		x = int(input ("X coordinate: "))
		y = int(input ("Y coordinate: "))
		updateGrid ( x, y, 'X' )
		lastMove = 3*(x-1) + 3*y

class AI:

	def __init__ ( self, score, first, difficulty ):
		self.score = score
		self.first = first
		self.difficulty = difficulty

	def placeMark(self):
		print ("Computer's turn")
		unique = False
		print (turn)
		print (unique)
		
		if self.difficulty == 'Easy':
			
			#Easy mode will randomly select modes
			#unique = updateGrid ( randrange(0,3), randrange(0,3), 'O' )
			self.randomMove()

		elif self.difficulty == 'Hard':
			#Hard will be based on turn
			if turn == 0:
				# Improve, it needs to pick a random corner
				x = 0
				y = 0
				updateGrid (x,y,'O')

			elif turn == 1:
				if checkSquare(5) == 'X':
					# Improve, pick a random corner
					x = 0
					y = 0
				else:
					x = 1
					y = 1
				updateGrid (x,y,'O')	

			elif turn == 2:
				if checkSquare(5) == ' ':
					x = 1
					y = 1
				else:
					# Improve, pick a random corner
					x = 2
					y = 2
				updateGrid (x,y,'O')

			else:
				if checkPoints ( -2 ):
					self.twoPoints ( 'win' )
				elif checkPoints ( 2 ):
					self.twoPoints ( 'block' )
				else:
					self.optimalPlay()
			
			#unique = updateGrid (x,y,'O')

	def twoPoints ( self, action ):
		scoreHor, scoreVert, scoreDiag = updatePoints()

		value = 0
		if action == 'block':
			value = 2
		elif action == 'win':
			value = -2

		a = 0
		count_i = 0
		count_j = 0

		# Check Horizontal points
		for i in scoreHor:
			if i == value:
				print ("Horizontal +/- 2 Found")
				for j in table[count_i]:
					if j == " ":
						updateAiSquare (count_i*3+count_j+1)
						break
					count_j += 1
				count_i += 1

		# Check Veritcal points
		for i in scoreVert:
			print (i)
			if i == value:
				for j in table:
					if j[count_i] == " ":
						updateAiSquare (count_j*3+count_i+1)
						break
					count_j += 1
			count_i += 1

		# Check Diagonal points
		if scoreDiag[0] == value:
			print ("Diagonal top-L to bottom-R found")
			i = 0
			for i in range(3):
				if table[i][i] == " ":
					table[i][i] = ""
					break

		if scoreDiag[1] == value:
			print ("Diagonal top-R to bottom-L found")
			i = 0
			for i in range(3):
				if table[i][2-i] == " ":
					table[i][2-i] = "O"
					break

	def randomMove(self):
		print ("Random")
		updateGrid ( randrange(0,3), randrange(0,3), 'O' )

	def optimalPlay(self):
		# Figure out way to get two points twice

		# Figure out way to get two points once

		# Random?
		 updateGrid ( randrange(0,3), randrange(0,3), 'O' )

def displayGrid():
	#comment
	print (table[0][0]+"|"+table[0][1]+"|"+table[0][2])
	print ("-----")
	print (table[1][0]+"|"+table[1][1]+"|"+table[1][2])
	print ("-----")
	print (table[2][0]+"|"+table[2][1]+"|"+table[2][2])	

def checkSquare(numeric):
	row = int(numeric)/3
	col = int(numeric)%3-1
	return table[int(row)][int(col)]

def updateAiSquare(numeric):
	print ("Updating square" +str(numeric))
	row = int(numeric)/3
	col = int(numeric)%3-1
	print ("updating now")
	table[int(row)][int(col)] = "O"

def reset( winner ):
	table = ([" ", " ", " "],
			[" ", " ", " "],
			[" ", " ", " "])

	if winner == "Human":
		player.first = True
		ai.first = False

	else:
		player.first = False
		ai.first = True

def updateGrid ( x, y, value ):
	print ("x is " + str(x))
	print("y is " + str(y))
	number = x*3+y+1
	unique = False
	while unique == False:
		if table[x][y] == " ":
			table[x][y] = value
			unique = True
			return True

		else: 
			print ("Square "+ str(number) + " is already used. Select a different location")
			time.sleep(0.1)
			if value == "X":
				x = int(input ("X coordinate: "))
				y = int(input ("Y coordinate: "))
			elif value == "O":
				x = randrange(0,3)
				y = randrange(0,3)
			unique = False

def updatePoints():
	x = 0
	scoreHor = [0,0,0]
	scoreVert = [0,0,0]
	scoreDiag = [0,0]

	for i in table:
		y = 0
		for j in i:
			if j == 'X':
				scoreHor[x] += 1
				scoreVert[y] += 1
			
			elif j == 'O':
				scoreHor[x] -= 1
				scoreVert[y] -= 1
			
			if x == y:
				if j == 'X':
					scoreDiag[0] += 1
					if x == 1:
						scoreDiag[1] += 1
				if abs(x-y) == 2:
					scoreDiag[1] += 1

				if j == 'O':
					scoreDiag[0] -= 1
					if x == 1:
						scoreDiag[1] -= 1
			if abs(x-y) == 2:
				if j == 'X':
					scoreDiag[1] += 1
				elif j == 'O':
					scoreDiag[1] -= 1
			y += 1
		x += 1

	return scoreHor, scoreVert, scoreDiag

def checkPoints(value):

	print ("Checking Score: " + str(value))

	scoreHor, scoreVert, scoreDiag = updatePoints()

	for k in scoreHor:
		if k == value:
			return True
	for l in scoreVert:
		if l == value:
			return True
	for m in scoreDiag:
		if m == value:
			return True

	return False

#let player go first if there is no history
#whoever lost goes first next round
#if draw, then whoever went second goes first next

#score tallying

#Introduction, ask difficulty, tell player they go first

#Message after displaying grid

print ("Welcome to TicTacToe")

#clearGrid()
displayGrid()

difficulty = input ("Enter difficulty: Easy or Hard: ")

player = Human(0,True)
ai = AI(0,False,difficulty)

print ("Human player will go first, and will always use X.")
p = True
turn = 0
nextGame = True

while nextGame:

	while not victory:
		if p:
			player.placeMark()
			victory = checkPoints(3)
			if victory:
				print ("Player wins!")
				player.score += 1
				break
			p = False
			turn += 1
		
		elif turn == 8:
			print ("It's a draw.")
			victory = True
			break

		elif not p and not victory:
			ai.placeMark()
			victory = checkPoints(-3)
			if victory:
				print ("Computer wins!")
				ai.score += 1
				break
			p = True
			turn += 1

		elif turn == 8:
			print ("It's a draw.")
			victory = True
			break

		displayGrid()

	print ("The score is Player: " + str(player.score) + ", Computer: " + str(ai.score))

	keepGoing = input ("Keep playing? Y or N")	

	if keepGoing == 'Y':
		nextGame == True
	else:
		nextGame == False

