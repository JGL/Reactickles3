function KeyboardSpringyCircles(){
  var springyCircles = []; //array of SpringyCircle objects
  var numberOfSpringyCircles = 100;
  var allTheKeys = "1234567890qwertyuiopasdfghjklzxcvbnm";
  var circleMinRadius = 50;
  var circleMaxRadius = 100;

  this.setup = function(){
    createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
    noStroke(); //no outlines, just filled shapes
    colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
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
    for (var i = 0; i < springyCircles.length; i++) {
      springyCircles[i].display();
    }
  }

  this.keyTyped = function(){
    var lowerCaseKey = key.toLowerCase(); //key is a system variable via https://p5js.org/reference/#/p5/key, toLowerCase via http://www.w3schools.com/jsref/jsref_tolowercase.asp

    if(allTheKeys.includes(lowerCaseKey)){
      //if the key is a valid one, circles nearby should react
      var positionOfKey = getCanvasPositionFromKey(lowerCaseKey);
      var positionOfKeyInPixels = createVector(positionOfKey.x * windowWidth, positionOfKey.y * windowHeight);

      for (var i = 0; i < springyCircles.length; i++) {
        //for all the springyCircles
        var positionOfCircleInPixels = createVector(springyCircles[i].position.x * windowWidth, springyCircles[i].position.y * windowHeight);
        var radiusOfCircle = springyCircles[i].radius;
        var distanceBetweenKeyAndCircle = dist(positionOfKeyInPixels.x, positionOfKeyInPixels.y, positionOfCircleInPixels.x, positionOfCircleInPixels.y);

        if(distanceBetweenKeyAndCircle < radiusOfCircle){
          //if the key is under the springy circle, then spring/move it
          springyCircles[i].moveCircle();
        }

      }
    }

    return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
  }

  this.mouseReleased = function(){
    return false; //https://p5js.org/reference/#/p5/mouseReleased preventing default behaviour
  }

  this.touchMoved = function(){
    return false; //https://p5js.org/reference/#/p5/touchMoved
  }

  this.windowResized = function(){//https://p5js.org/reference/#/p5/windowResized
    resizeCanvas(windowWidth, windowHeight);
  }

  function SpringyCircle(){ //SpringyCircle object
    //converted from Processing.js http://processingjs.org/learning/topic/springs/
    this.colour = color(random(100),50,100,50);; //random hue, saturation 50%, brightness 100%, alpha 50%
    this.radius = random(circleMinRadius,circleMaxRadius);
    this.mass = this.radius/10.0;
    this.springConstant = 0.5; //aka "k" in Hookes law https://en.wikipedia.org/wiki/Hooke's_law
    this.damping = 0.9;
    this.restPosition = createVector(random(windowWidth)/windowWidth,random(windowHeight)/windowHeight);
    this.position = createVector(this.restPosition.x, this.restPosition.y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.force = createVector(0,0);

    this.display = function(){
      // can't do these things below, need to call dedicated static p5.vector methods, see: https://p5js.org/reference/#/p5.Vector
      // this.force = -this.springConstant * (this.position-this.restPosition); // f=-ky
      // this.acceleration = this.force/this.mass; // Set the acceleration, f=ma == a=f/m
      // this.velocity = this.damping * (this.velocity+this.acceleration);
      // this.position += this.velocity;
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
