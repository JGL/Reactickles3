function setup() {
  createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  ellipseMode(RADIUS); //https://p5js.org/reference/#/p5/ellipseMode draw with a radius rather than a width
}

function draw() {
	background(0); //black background
	stroke('red'); //draw circles outlines in red
	fill('red'); //draw circles filled in red
	var circleRadius = 50;
	ellipse(mouseX, mouseY, circleRadius, circleRadius); //just to prove i'm drawing and updating!
	print("The number of touches is " + touches.length);
	for (var i = 0; i < touches.length-1; i++) { //for each of the elements in the touches array
		var xPosition = touches[i].x;
		var yPosition = touches[i].y;
		ellipse(xPosition, yPosition, circleRadius); // https://p5js.org/reference/#/p5/ellipse and https://p5js.org/reference/#/p5/ellipseMode
	}
}
