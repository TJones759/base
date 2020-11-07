# Write your code here :-)
from tkinter import *
from tkinter import messagebox
 
# initialise main window
def init(win):
	win.title("TicTacToe")
	win.minsize(500, 500)
	btnTopLeft.pack()
	btnTopCenter.pack()
	btnTopRight.pack()
	btnMidLeft.pack()
	btnMidCenter.pack()
	btnMidRight.pack()
	btnBottomLeft.pack()
	btnBottomCenter.pack()
	btnBottomRight.pack()

	
 
# button callback
def hello():
	messagebox.showinfo("Hello", "Pleased to meet you!")
 
# create top-level window
win = Tk()
 
# Gets the requested values of the height and widht.
windowWidth = win.winfo_reqwidth()
windowHeight = win.winfo_reqheight()
 
# Gets both half the screen width/height and window width/height
positionRight = int(win.winfo_screenwidth()/2 - windowWidth/2)
positionDown = int(win.winfo_screenheight()/2 - windowHeight/2)
 
# Positions the window in the center of the page.
win.geometry("+{}+{}".format(positionRight, positionDown))
 
# create 9 buttons for squares
btnTopLeft = Button(win, text="X", command=hello)
btnTopCenter = Button(win, text="X", command=hello)
btnTopRight = Button(win, text="X", command=hello)
btnMidLeft = Button(win, text="X", command=hello)
btnMidCenter = Button(win, text="X", command=hello)
btnMidRight = Button(win, text="X", command=hello)
btnBottomLeft = Button(win, text="X", command=hello)
btnBottomCenter = Button(win, text="X", command=hello)
btnBottomRight = Button(win, text="X", command=hello)

 
# initialise and start main loop
init(win)
mainloop()
