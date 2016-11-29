var characterSize = 50;
var theKey = '!'; //non letter or numeral to start off with

function setup() {
  createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  textSize(characterSize);
  ellipseMode(RADIUS); //https://p5js.org/reference/#/p5/ellipseMode draw with a radius rather than a width
}

function draw() {
	background(255); //white background
	var keyToCanvasPosition = getCanvasPositionFromKey(theKey); //the relative position is returned as a pair of floats, both 0..1
	//draw a circle in the relative position
	var circleRadius = 50;
	var translatedX = keyToCanvasPosition.x * windowWidth;
	var translatedY = keyToCanvasPosition.y * windowHeight;
	stroke('red'); //draw circle in red
	fill('red'); //draw circle filled in red
	ellipse(translatedX, translatedY, circleRadius); // https://p5js.org/reference/#/p5/ellipse and https://p5js.org/reference/#/p5/ellipseMode
	//draw the character on top too, in blue
	stroke('blue');
	fill('blue');
	text(theKey, translatedX-(characterSize/4),translatedY+(characterSize/4)); //make sure the character is centred
}

function keyTyped(){
	theKey = key; //key is a system variable via https://p5js.org/reference/#/p5/key
	return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
}

function getCanvasPositionFromKey(aKey){
	var canvasPosition =  createVector(-1,-1); //off screen for now
	var numberOfRows = 4;
	var yNudge = (1/numberOfRows)/2;

	switch(aKey) {
		case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0':
			canvasPosition.y = 0+yNudge;
			canvasPosition.x = findXOnFirstRowKey(aKey);
			break;
		case 'q': case 'w': case 'e': case 'r': case 't': case 'y': case 'u': case 'i': case 'o': case 'p':
		case 'Q': case 'W': case 'E': case 'R': case 'T': case 'Y': case 'U': case 'I': case 'O': case 'P':
			canvasPosition.y = 0.25+yNudge;
			canvasPosition.x = findXOnSecondRowKey(aKey);
			break;
		case 'a': case 's': case 'd': case 'f': case 'g': case 'h': case 'j': case 'k': case 'l':
		case 'A': case 'S': case 'D': case 'F': case 'G': case 'H': case 'J': case 'K': case 'L':
			canvasPosition.y = 0.5+yNudge;
			canvasPosition.x = findXOnThirdRowKey(aKey);
			break;
		case 'z': case 'x': case 'c': case 'v': case 'b': case 'n': case 'm':
		case 'Z': case 'X': case 'C': case 'V': case 'B': case 'N': case 'M':
			canvasPosition.y = 0.75+yNudge;
			canvasPosition.x = findXOnFourthRowKey(aKey);
			break;
	}

	return canvasPosition;
}

function findXOnFirstRowKey(aKey){
	//10 keys on the first row
	var numberOfCharacters = 10;
	var xNudge = (1/numberOfCharacters)/2;

	var relativeXPosition = 0.0;
	switch(aKey) {
		case '1':
			relativeXPosition = 0.0+xNudge;
			break;
		case '2':
			relativeXPosition = 0.1+xNudge;
			break;
		case '3':
			relativeXPosition = 0.2+xNudge;
			break;
		case '4':
			relativeXPosition = 0.3+xNudge;
			break;
		case '5':
			relativeXPosition = 0.4+xNudge;
			break;
		case '6':
			relativeXPosition = 0.5+xNudge;
			break;
		case '7':
			relativeXPosition = 0.6+xNudge;
			break;
		case '8':
			relativeXPosition = 0.7+xNudge;
			break;
		case '9':
			relativeXPosition = 0.8+xNudge;
			break;
		case '0':
			relativeXPosition = 0.9+xNudge;
			break;
	}
	return relativeXPosition;
}

function findXOnSecondRowKey(aKey){
	//10 keys on the second row
	var numberOfCharacters = 10;
	var xNudge = (1/numberOfCharacters)/2;

	var relativeXPosition = 0.0;
	switch(aKey) {
		case 'q': case 'Q':
			relativeXPosition = 0.0+xNudge;
			break;
		case 'w': case 'W':
			relativeXPosition = 0.1+xNudge;
			break;
		case 'e': case 'E':
			relativeXPosition = 0.2+xNudge;
			break;
		case 'r': case 'R':
			relativeXPosition = 0.3+xNudge;
			break;
		case 't': case 'T':
			relativeXPosition = 0.4+xNudge;
			break;
		case 'y': case 'Y':
			relativeXPosition = 0.5+xNudge;
			break;
		case 'u': case 'U':
			relativeXPosition = 0.6+xNudge;
			break;
		case 'i': case 'I':
			relativeXPosition = 0.7+xNudge;
			break;
		case 'o': case 'O':
			relativeXPosition = 0.8+xNudge;
			break;
		case 'p': case 'P':
			relativeXPosition = 0.9+xNudge;
			break;
	}
	return relativeXPosition;
}

function findXOnThirdRowKey(aKey){
	//9 keys on the third row
	var numberOfCharacters = 9;
	var ratio = 1.0/numberOfCharacters;
	var xNudge = (1/numberOfCharacters)/2;

	var relativeXPosition = 0.0;
	switch(aKey) {
		case 'a': case 'A':
			relativeXPosition = (0*ratio)+xNudge;
			break;
		case 's': case 'S':
			relativeXPosition = (1*ratio)+xNudge;
			break;
		case 'd': case 'D':
			relativeXPosition = (2*ratio)+xNudge;
			break;
		case 'f': case 'F':
			relativeXPosition = (3*ratio)+xNudge;
			break;
		case 'g': case 'G':
			relativeXPosition = (4*ratio)+xNudge;
			break;
		case 'h': case 'H':
			relativeXPosition = (5*ratio)+xNudge;
			break;
		case 'j': case 'J':
			relativeXPosition = (6*ratio)+xNudge;
			break;
		case 'k': case 'K':
			relativeXPosition = (7*ratio)+xNudge;
			break;
		case 'l': case 'L':
			relativeXPosition = (8*ratio)+xNudge;
			break;
	}
	return relativeXPosition;
}

function findXOnFourthRowKey(aKey){
	//7 keys on the third row
	var numberOfCharacters = 7;
	var ratio = 1/numberOfCharacters;
	var xNudge = (1/numberOfCharacters)/2;

	var relativeXPosition = 0.0;
	switch(aKey) {
		case 'z': case 'Z':
			relativeXPosition = (0*ratio)+xNudge;
			break;
		case 'x': case 'X':
			relativeXPosition = (1*ratio)+xNudge;
			break;
		case 'c': case 'C':
			relativeXPosition = (2*ratio)+xNudge;
			break;
		case 'v': case 'V':
			relativeXPosition = (3*ratio)+xNudge;
			break;
		case 'b': case 'B':
			relativeXPosition = (4*ratio)+xNudge;
			break;
		case 'n': case 'N':
			relativeXPosition = (5*ratio)+xNudge;
			break;
		case 'm': case 'M':
			relativeXPosition = (6*ratio)+xNudge;
			break;
	}
	return relativeXPosition;
}
