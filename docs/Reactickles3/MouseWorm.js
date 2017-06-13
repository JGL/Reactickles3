function MouseWorm(){
  var worm = []; //array of WormSegment objects
  var wormLength = 30; //number of segments of the worm

  this.setup = function(){
    createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
    noStroke(); //no outlines, just filled shapes
    colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
    ellipseMode(RADIUS); //https://p5js.org/reference/#/p5/ellipseMode draw with a radius rather than a width
    var segmentColourMaxBrightness = 100;
    var segmentColourMinBrightness = 80;
    var segmentColourBrightnessRatio = (segmentColourMaxBrightness-segmentColourMinBrightness)/wormLength;
    var segmentColour = color(random(100),50,segmentColourMaxBrightness, 100); //random hue, saturation 50%, brightness 100%, alpha 100%
    var segmentMaxRadius = 50;
    var segmentMinRadius = 35;
    var segmentRadiusRatio = (segmentMaxRadius-segmentMinRadius)/wormLength;
    var segmentRadius = segmentMaxRadius;

    while(worm.length > 0) { // https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
      worm.pop();
    }
    for (var i=0; i < wormLength; i++) {
      worm.push(new WormSegment(segmentColour, segmentRadius));
      segmentRadius -= segmentRadiusRatio;
      segmentColour = color(hue(segmentColour), saturation(segmentColour), brightness(segmentColour)-segmentColourBrightnessRatio, alpha(segmentColour));
    }
    console.log("The length of the worm is " + worm.length);
  }

  this.draw = function(){
    background(255); //white background
    this.updateWorm();
    this.drawWorm();
  }

  this.updateWorm =function(){
    var relativeMousePos = createVector(mouseX/windowWidth, mouseY/windowHeight);
    this.seekWormTowardsPosition(relativeMousePos);

    //starting at back of the worm, copy the previous worm segments position onto the current segments position
    for (var i = (worm.length-1); i > 0; i--) {
      worm[i].position.x = worm[i-1].position.x;
      worm[i].position.y = worm[i-1].position.y;
      //had to copy both values - not the reference, worm[i].position = worm[i-1].position doesn't work
    }
  }

  this.drawWorm =function(){
    //draw the first segment of the worm last so that the shading looks correct
    for (var i = (worm.length-1); i > 0; i--) {
      worm[i].display();
    }
  }

  this.seekWormTowardsPosition = function(relativeSeekPosition){
    var easing = 0.05;
    //move the head of the worm a bit closer... via https://processing.org/examples/easing.html
    var dx = relativeSeekPosition.x - worm[0].position.x;
    worm[0].position.x += dx * easing;
    var dy = relativeSeekPosition.y - worm[0].position.y;
    worm[0].position.y += dy * easing;
  }

  this.keyTyped = function(){
    return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
  }

  this.touchMoved = function(){
    return false; //https://p5js.org/reference/#/p5/touchMoved preventing default behaviour
  }

  this.mouseReleased = function(){
    return false; //https://p5js.org/reference/#/p5/mouseReleased preventing default behaviour
  }

  this.windowResized = function(){//https://p5js.org/reference/#/p5/windowResized
    resizeCanvas(windowWidth, windowHeight);
  }

  function WormSegment(aColour,aRadius){ //WormSegment object
    this.radius = aRadius;
    this.position = createVector(0.0, 0.0); //start in top left of screen
    this.colour = aColour;

    this.display = function(){
      var translatedX = this.position.x * windowWidth;
      var translatedY = this.position.y * windowHeight;
      fill(this.colour);
      ellipse(translatedX, translatedY, this.radius); // https://p5js.org/reference/#/p5/ellipse and https://p5js.org/reference/#/p5/ellipseMode
    }
  }
}