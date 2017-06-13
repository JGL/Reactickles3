function KeyboardBouncingCircleGrid(){
  var bouncyCircles = []; //array of BouncyCircle objects
  var allTheKeys = "1234567890qwertyuiopasdfghjklzxcvbnm";

  this.setup = function(){
    createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
    noStroke(); //no outlines, just filled shapes
    colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
    ellipseMode(RADIUS); //https://p5js.org/reference/#/p5/ellipseMode draw with a radius rather than a width

    for (var i=0; i < allTheKeys.length; i++) {
      bouncyCircles.push(new BouncyCircle(allTheKeys[i]));
    }
  }

  this.draw = function(){
    background(255); //white background
    this.drawCircles();
  }

  this.drawCircles = function(){
    for (var i = 0; i < bouncyCircles.length; i++) {
      bouncyCircles[i].display();
    }
  }

  this.keyTyped = function(){
    var lowerCaseKey = key.toLowerCase(); //key is a system variable via https://p5js.org/reference/#/p5/key
    for (var i=0; i<bouncyCircles.length; i++) {
      if(lowerCaseKey == bouncyCircles[i].key){
        bouncyCircles[i].moveCircle();
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

  function BouncyCircle(aKey){ //SpringyCircle object
    this.key = aKey;
    this.colour = color(random(100),50,100,50);; //random hue, saturation 50%, brightness 100%, alpha 50%
    this.radius = 50;
    this.mass = this.radius/10.0;
    this.springConstant = 0.5; //aka "k" in Hookes law https://en.wikipedia.org/wiki/Hooke's_law
    this.damping = 0.9;
    this.position = createVector(-1,-1);
    this.position = getCanvasPositionFromKey(this.key);
    this.restPosition = createVector(this.position.x, this.position.y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.force = createVector(0,0);

    this.display = function(){
      //need to call dedicated static p5.vector methods, see: https://p5js.org/reference/#/p5.Vector
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