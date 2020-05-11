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

lastMove = 0

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
			lastMove = 3*(x-1) + 3*y

class AI:

	def __init__ ( self, score, first, difficulty ):
		self.score = score
		self.first = first
		self.difficulty = difficulty

	def placeMark(self, difficulty):
		print ("Computer's turn")
		unique = False
		while not unique:
			if difficulty == 'Easy':
				#Easy mode will randomly select modes
				unique = updateGrid ( randrange(0,3), randrange(0,3), 'O' )
			if difficulty == 'Hard':
				if turn == 0:
					x = 0
					y = 0
				if turn == 1:
					if lastPlayer == 5:
						x = 0
						y = 0
					elif lastPlayer != 5:
						x = 1
						y = 1	

				if turn == 2:
					if table[1][1] == ' ':
						x = 1
						y = 1
					else:
						#improve
						x = 2
						y = 2	

				if turn == 3:
					for i in scoreHor:
						if i == 2:
							for j in table[0]:
								if j == " ":
									x = i
									y = j
					for i in scoreVert:
						if i == 2:
							for j in table:
								if j[i] == " ":
									x = j
									y = i
				if turn == 4:
					if checkScore('O'):
						x, y = self.twoPoints('win')
					elif checkScore('X'):
						x, y = self.twoPoints('block')

			unique = updateGrid (x,y,'O')

	def twoPoints(self, action):
		value = 0
		if action == 'block':
			value = -2
		elif action == 'win':
			value = 2

		for i in scoreHor:
			if i == value:
				for j in table[0]:
					if j == " ":
						return i, j
		
		for i in scoreVert:
			if i == value:
				for j in table:
					if j[i] == " ":
						return j, i

	def optimalPlay(self):
		

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

def updatePoints(value):
	x = 0
	print table

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
						scoreDiag[1] += 1
			if abs(x-y) == 2:
				if j == 'X':
					scoreDiag[1] += 1
				elif j == 'O':
					scoreDiag[1] -= 1
			y += 1
		x += 1

def checkVictory():

	print "Checking Victory"
	#print scoreHor
	#print scoreVert
	#print scoreDiag
	
	for k in scoreHor:
		if abs(k) == 3:
			print "Victory!"
			return True
	for l in scoreVert:
		if abs(l) == 3:
			print "Victory!"
			return True

	for m in scoreDiag:
		if abs(m) == 3:
			print "Victory!"
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

player = Human(0,True)
ai = AI(0,False,"Easy")

print ("Human player will go first, and will always use X.")
p = True
while not victory:
	if p:
		player.placeMark()
		victory = checkPoints('X')
		if victory:
			print ("Player wins!")
			break
		p = False
		print p
	
	elif not p and not victory:
		ai.placeMark(difficulty = 0)
		victory = checkPoints('O')
		if victory:
			print ("Computer wins!")
		p = True

	displayGrid()
	

