new p5();

var x = 0;
var img;

function preload() {
	img = loadImage("cat.jpg");
}

function setup() {
	var myCanvas = createCanvas(600, 400); //create a canvas
	myCanvas.parent('myContainer'); //attach it to the div element called myContainer

	drawingContext.shadowOffsetX = 5; //a whole series of ative HTML5 Canvas functionality, see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
	drawingContext.shadowOffsetY = -5;
	drawingContext.shadowBlur = 10;
	drawingContext.shadowColor = "red";
	background(200);
}

function draw() {
	background(200);
	line(15, 25, 70, 90);
	ellipse(x, height/2, 20, 20);
	x = x + 1;
	ellipse(width/2, height/2, 50, 50);
	image(img, 0, 0);
}

function touchMoved() {
  // stop touches on Mobile devices moving the whole container around
  return false;
}