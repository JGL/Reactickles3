function MouseSpringyCircles(){
  var springyCircles = []; //array of SpringyCircle objects
  var numberOfSpringyCircles = 20;
  var allTheKeys = "1234567890qwertyuiopasdfghjklzxcvbnm";

  this.setup = function(){
    createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
    noStroke(); //no outlines, just filled shapes
    colorMode(HSB, 100); //Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
    ellipseMode(RADIUS); //https://p5js.org/reference/#/p5/ellipseMode draw with a radius rather than a width

    while(springyCircles.length > 0) { // https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
      springyCircles.pop();
    }

    for (var i=0; i < numberOfSpringyCircles; i++) {
      springyCircles.push(new SpringyCircle());
    }
  }

  this.draw = function(){
    background(255); //white background
    this.drawCircles();
  }

  this.drawCircles = function(){
    for (var i = 0; i < springyCircles.length; i+= 1) {
      springyCircles[i].display();
    }
  }

  this.checkIfCirclesShouldSpring = function(){
    for (var i = 0; i < springyCircles.length; i+= 1) {
      //for all the springyCircles
      var positionOfCircleInPixels = createVector(springyCircles[i].position.x * windowWidth, springyCircles[i].position.y * windowHeight);
      var distanceBetweenMouseAndCircle = dist(mouseX, mouseY, positionOfCircleInPixels.x, positionOfCircleInPixels.y); //https://p5js.org/reference/#/p5/dist

      if(distanceBetweenMouseAndCircle < (springyCircles[i].radius)){
        //if the mouse is under the springy circle, then spring/move it
        springyCircles[i].moveCircle();
      }

    }
  }

  this.windowResized = function(){//https://p5js.org/reference/#/p5/windowResized
    resizeCanvas(windowWidth, windowHeight);
  }

  this.touchMoved = function(){
    this.checkIfCirclesShouldSpring();
    return false; //https://p5js.org/reference/#/p5/touchMoved
  }

  this.mouseReleased = function(){
    this.checkIfCirclesShouldSpring();
  }

  this.keyTyped = function(){
    var lowerCaseKey = key.toLowerCase(); //key is a system variable via https://p5js.org/reference/#/p5/key, toLowerCase via http://www.w3schools.com/jsref/jsref_tolowercase.asp

    return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
  }

  function SpringyCircle(){ //SpringyCircle object
    var circleMinRadius = 50;
    var circleMaxRadius = 100;
    this.colour = color(random(100),50,100,50);; //random hue, saturation 50%, brightness 100%, alpha 50%
    this.radius = random(circleMinRadius,circleMaxRadius);
    this.mass = this.radius/10.0;
    this.springConstant = 0.5; //aka "k" in Hookes law https://en.wikipedia.org/wiki/Hooke's_law
    this.damping = 0.9;
    this.position = createVector(random(windowWidth)/windowWidth,random(windowHeight)/windowHeight);
    this.restPosition = createVector(this.position.x, this.position.y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.force = createVector(0,0);

    this.display = function(){
      // Uses static p5.vector methods, see: https://p5js.org/reference/#/p5.Vector
      this.force = p5.Vector.mult(p5.Vector.sub(this.position,this.restPosition),-this.springConstant); // f=-ky
      this.acceleration = p5.Vector.div(this.force,this.mass); // Set the acceleration, f=ma == a=f/m
      this.velocity = p5.Vector.mult(p5.Vector.add(this.velocity, this.acceleration),this.damping);
      this.position.add(this.velocity);

      var translatedX = this.position.x * windowWidth;
      var translatedY = this.position.y * windowHeight;
      fill(this.colour);
      ellipse(translatedX, translatedY, this.radius); // https://p5js.org/reference/#/p5/ellipse and https://p5js.org/reference/#/p5/ellipseMode
    }

    this.moveCircle = function(){ //move the position of the spring a bit
      var randomOffset = createVector(random(-0.1,0.1), random(-0.1,0.1));
      //this.position += randomOffset; += doesn't work!
      this.position.add(randomOffset); //see https://p5js.org/examples/hello-p5-flocking.html for more p5.vector fun
      // and http://p5js.org/reference/#/p5.Vector
    }
  }
}
