function setup() {
	createCanvas(640, 480);
	ellipseMode(RADIUS); //https://p5js.org/reference/#/p5/ellipseMode draw with a radius rather than a width
}

function draw() {
	if (mouseIsPressed) {
		fill(0);
	} else {
		fill(255);
	}
	ellipse(mouseX, mouseY, 40); // https://p5js.org/reference/#/p5/ellipse and https://p5js.org/reference/#/p5/ellipseMode
}
