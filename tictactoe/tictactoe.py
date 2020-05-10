#TicTacToe

#Matrix of values 3x3?

#Display function

#Input from user

#Hard vs Easy

#Logic for Hard

#Start with tables?
from random import randrange
import sys

import numpy
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

class Human:

	def __init__ ( self, score, first ):
		self.score = score
		self.first = first

	def placeMark(self):
		print ("Enter location. User is X, enter x and y coordinates, with 0,0 being top left. ")
		unique = False
		while not unique:
			x = input ("X coordinate: ")
			y = input ("Y coordinate: ")
			unique = updateGrid ( x, y, 'X' )

class AI:

	def __init__ ( self, score, first, difficulty ):
		self.score = score
		self.first = first
		self.difficulty = difficulty

	def placeMark(self, difficulty):
		print ("Computer's turn")
		unique = False
		while not unique:
			if difficulty == 0:
				#Easy mode will randomly select modes
				unique = updateGrid ( randrange(0,3), randrange(0,3), 'O' )


def displayGrid():
	#comment
	print (table[0][0]+"|"+table[0][1]+"|"+table[0][2])
	print ("-----")
	print (table[1][0]+"|"+table[1][1]+"|"+table[1][2])
	print ("-----")
	print (table[2][0]+"|"+table[2][1]+"|"+table[2][2])	

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
	print x
	print y
	if table[x][y] == " ":
		table[x][y] = value
		return True

	else: 
		print ("Square is already used. Select a different location")
		time.sleep(0.25)
		return False

def checkPoints(value):
	x = 0
	print table

	for i in table:
		y = 0
		for j in i:
			if j == 'X':
				scoreHor[x] += 1
				scoreVert[y] += 1
			else:
				scoreHor[x] -= 1
				scoreVert[y] -= 1
			if x == y:
				if j == 'X':
					scoreDiag[0] += 1
					if x == 1:
						scoreDiag[1] += value
				if abs(x-y) == 2:
					scoreDiag[1] += value
			y += 1
		x += 1
	print scoreHor
	print scoreVert
	print scoreDiag


def checkVictory():
	for i in scoreHor:
		if abs(i) == 3:
			return True
	for i in scoreVert:
		if abs(i) == 3:
			return True
	for i in scoreDiag:
		if abs(i) == 3:
			return True
	else:
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

player = Human(0,True)
ai = AI(0,False,0)

print ("Human player will go first, and will always use X.")
p = True
while not victory:
	if p:
		player.placeMark()
		checkPoints('X')
		victory = checkVictory()
		if victory:
			print ("Player wins!")
		p = False
		print p
	
	elif not p and not victory:
		ai.placeMark(difficulty = 0)
		checkPoints('O')
		victory = checkVictory()
		if victory:
			print ("Computer wins!")
		p = True

	displayGrid()
	

