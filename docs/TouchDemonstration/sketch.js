function setup() {
  createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
}

function draw() {
	background(0); //black background
	stroke('red'); //draw circles outlines in red
	fill('red'); //draw circles filled in red
	var circleRadius = 100;
	ellipse(mouseX, mouseY, circleRadius, circleRadius); //just to prove i'm drawing and updating!
	print("The number of touches is " + touches.length);
	for (var i = 0; i < touches.length-1; i++) { //for each of the elements in the touches array
		var xPosition = touches[i].x;
		var yPosition = touches[i].y;
		ellipse(xPosition, yPosition, circleRadius, circleRadius);
	}
}