var worm = []; //array of WormSegment objects
var wormLength = 30; //number of segments of the worm

function setup() {
  createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  noStroke(); //no outlines, just filled shapes
  colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
  var segmentColourMaxBrightness = 100;
  var segmentColourMinBrightness = 80;
  var segmentColourBrightnessRatio = (segmentColourMaxBrightness-segmentColourMinBrightness)/wormLength;
  var segmentColour = color(random(100),50,segmentColourMaxBrightness, 100); //random hue, saturation 50%, brightness 100%, alpha 100%
  var segmentMaxRadius = 100;
  var segmentMinRadius = 70;
  var segmentRadiusRatio = (segmentMaxRadius-segmentMinRadius)/wormLength;
  var segmentRadius = segmentMaxRadius;

  for (var i=0; i < wormLength; i++) {
    worm.push(new WormSegment(segmentColour, segmentRadius));
    segmentRadius -= segmentRadiusRatio;
    segmentColour = color(hue(segmentColour), saturation(segmentColour), brightness(segmentColour)-segmentColourBrightnessRatio, alpha(segmentColour));
  }
  console.log("The length of the worm is " + worm.length);
}

function draw() {
  background(255); //white background
  updateWorm();
  drawWorm();
}

function updateWorm(){
  var relativeMousePos = createVector(mouseX/windowWidth, mouseY/windowHeight);
  seekWormTowardsPosition(relativeMousePos);

  //starting at back of the worm, copy the previous worm segments position onto the current segments position
  for (var i = (worm.length-1); i > 0; i--) {
    worm[i].position.x = worm[i-1].position.x;
    worm[i].position.y = worm[i-1].position.y;
    //had to copy both values - not the reference, worm[i].position = worm[i-1].position doesn't work
  }
}

function drawWorm(){
  //draw the first segment of the worm last so that the shading looks correct
  for (var i = (worm.length-1); i > 0; i--) {
    worm[i].display();
  }
}

function seekWormTowardsPosition(relativeSeekPosition){
  var easing = 0.05;
  //move the head of the worm a bit closer... via https://processing.org/examples/easing.html
  var dx = relativeSeekPosition.x - worm[0].position.x;
  worm[0].position.x += dx * easing;
  var dy = relativeSeekPosition.y - worm[0].position.y;
  worm[0].position.y += dy * easing;
}

function keyTyped(){
  return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
}

function WormSegment(aColour,aRadius){ //WormSegment object
  this.radius = aRadius;
  this.position = createVector(0.5,0.5); //start in centre of screen
  this.colour = aColour;

  this.display = function(){
    var translatedX = this.position.x * windowWidth;
    var translatedY = this.position.y * windowHeight;
    fill(this.colour);
    ellipse(translatedX, translatedY, this.radius, this.radius);
  }
}
