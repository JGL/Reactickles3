function setup() {
	createCanvas(600, 600); // make a 600 x 600 canvas in which to interact and draw
}

function draw() {
	background(0); //black background
	stroke('red'); //draw circles outlines in red
	fill('red'); //draw circles filled in red
	var circleRadius = 10;
	ellipse(mouseX, mouseY, circleRadius, circleRadius); //just to prove i'm drawing and updating!
	print("The number of touches is " + touches.length);
	for (var i = 0; i < touches.length-1; i++) { //for each of the elements in the touches array
		var xPosition = touches[i].x;
		var yPosition = touches[i].y;
		ellipse(xPosition, yPosition, circleRadius, circleRadius);
	}
}