# Tic Tac Toe

## Overview

Project for the JavaScript section of The Odin Project (https://www.theodinproject.com/lessons/javascript-tic-tac-toe) to create the game of tic tac toe played through the browser using JavaScript and HTML.

Live version available on Github: https://ayrt-n.github.io/tic-tac-toe-js/

The application allows users to play games of Tic Tac Toe versus their friends or themselves. On loading the web page, users are able prompted to input their usernames and can then start and play games of Tic Tac Toe.

The project helped to cement lessons on the Factory and Module pattern. Through the project, I used both patterns to construct objects which were used throughout the game.

The current iteration of the game makes use of the Factory pattern to create a Player Factory, which makes it easy to create new player Objects when users start a new game or want to change their username.

The module pattern was used to create a number of modules used in keeping track of, controlling, and displaying the state of the game (e.g., gameController which keeps track of game flow and handles player inputs, displayController which mutates the state of the DOM to display game related information, and gameBoard, which keeps track of the state of the tic tac toe game board itself).

The webpage was lightly styled with the help of Bulma CSS. Styling was not the focus of the project so while it has been lightly styled and is mobile responsive, there could definitely be some improvements made on the design side.
