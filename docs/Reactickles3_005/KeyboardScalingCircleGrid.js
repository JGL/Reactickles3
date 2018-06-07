function KeyboardScalingCircleGrid(){
  var characterSize = 50;
  var circles = []; //array of ScalingCircle objects
  var allTheKeys = "1234567890qwertyuiopasdfghjklzxcvbnm";

  this.setup = function(){
    createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
    textSize(characterSize);
    colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
    ellipseMode(RADIUS); //https://p5js.org/reference/#/p5/ellipseMode draw with a radius rather than a width
    while(circles.length > 0) { // via https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
      circles.pop();
    }
    for (var i=0; i < allTheKeys.length; i+= 1) {
      circles.push(new ScalingCircle(allTheKeys[i]));
    }
    console.log("The size of the circles array is " + circles.length);
  }

  this.draw = function(){
    background(255); //white background
    noStroke();
    for (var i=0; i<circles.length; i+= 1) {
      circles[i].display();
    }
  }

  this.keyTyped = function(){
    var lowerCaseKey = key.toLowerCase(); //key is a system variable via https://p5js.org/reference/#/p5/key
    for (var i=0; i<circles.length; i+= 1) {
      if(lowerCaseKey === circles[i].key){
        circles[i].scaleUpandDown();
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

  function ScalingCircle(aKey){ //ScalingCircle object
    this.key = aKey;
    this.circleBigRadius = 150;
    this.circleSmallRadius = 50;
    this.circleRadius = this.circleSmallRadius;
    this.position = createVector(-1,-1);
    this.position = getCanvasPositionFromKey(aKey);
    this.colour = color(random(100),50,100,50); //random hue, saturation 50% and brightness 100%, alpha 50%
    this.millisToScaleUp = 50;
    this.millisToScaleDown = 500;
    this.startScale = 0;
    this.endScale = 0;
    this.scaling = false;

    this.display = function(){
      if(this.scaling){
        this.scale();
      }
      var translatedX = this.position.x * windowWidth;
      var translatedY = this.position.y * windowHeight;
      fill(this.colour);
      ellipse(translatedX, translatedY, this.circleRadius); // https://p5js.org/reference/#/p5/ellipse
    }; //don't forget to close your method!

    this.scale = function(){
      var now = millis();
      var millisElapsed = now-this.startScale;

      if(millisElapsed < this.millisToScaleUp){
        var howFarAlongScaleUp = millisElapsed/this.millisToScaleUp;
        this.scaleUp(howFarAlongScaleUp);
      }else{
        var howFarAlongScaleDown = (millisElapsed-this.millisToScaleUp)/this.millisToScaleDown;
        this.scaleDown(howFarAlongScaleDown);
      }

      if(now >= this.endScale){
        this.scaling = false;
      }
    }

    this.scaleUp = function(howFarAlongScale){
      var differenceInRadius = this.circleBigRadius - this.circleSmallRadius;
      var newRadius = this.circleSmallRadius+(howFarAlongScale*differenceInRadius);
      this.circleRadius = newRadius;
    }

    this.scaleDown = function(howFarAlongScale){
      var differenceInRadius = this.circleBigRadius - this.circleSmallRadius;
      var newRadius = this.circleBigRadius-(howFarAlongScale*differenceInRadius);
      this.circleRadius = newRadius;
    }

    this.scaleUpandDown = function(){
      this.scaling = true;
      this.startScale = millis();
      this.endScale = this.startScale+this.millisToScaleUp+this.millisToScaleDown;
    }
  }

  function getCanvasPositionFromKey(aKey){
    var canvasPosition =  createVector(-1,-1); //off screen for now
    var numberOfRows = 4;
    var yNudge = (1/numberOfRows)/2;

    switch(aKey) {
      case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0':
      canvasPosition.y = 0+yNudge;
      canvasPosition.x = findXOnFirstRowKey(aKey);
      break;
      case 'q': case 'w': case 'e': case 'r': case 't': case 'y': case 'u': case 'i': case 'o': case 'p':
      case 'Q': case 'W': case 'E': case 'R': case 'T': case 'Y': case 'U': case 'I': case 'O': case 'P':
      canvasPosition.y = 0.25+yNudge;
      canvasPosition.x = findXOnSecondRowKey(aKey);
      break;
      case 'a': case 's': case 'd': case 'f': case 'g': case 'h': case 'j': case 'k': case 'l':
      case 'A': case 'S': case 'D': case 'F': case 'G': case 'H': case 'J': case 'K': case 'L':
      canvasPosition.y = 0.5+yNudge;
      canvasPosition.x = findXOnThirdRowKey(aKey);
      break;
      case 'z': case 'x': case 'c': case 'v': case 'b': case 'n': case 'm':
      case 'Z': case 'X': case 'C': case 'V': case 'B': case 'N': case 'M':
      canvasPosition.y = 0.75+yNudge;
      canvasPosition.x = findXOnFourthRowKey(aKey);
      break;
    }

    return canvasPosition;
  }

  function findXOnFirstRowKey(aKey){
    //10 keys on the first row
    var numberOfCharacters = 10;
    var xNudge = (1/numberOfCharacters)/2;

    var relativeXPosition = 0.0;
    switch(aKey) {
      case '1':
      relativeXPosition = 0.0+xNudge;
      break;
      case '2':
      relativeXPosition = 0.1+xNudge;
      break;
      case '3':
      relativeXPosition = 0.2+xNudge;
      break;
      case '4':
      relativeXPosition = 0.3+xNudge;
      break;
      case '5':
      relativeXPosition = 0.4+xNudge;
      break;
      case '6':
      relativeXPosition = 0.5+xNudge;
      break;
      case '7':
      relativeXPosition = 0.6+xNudge;
      break;
      case '8':
      relativeXPosition = 0.7+xNudge;
      break;
      case '9':
      relativeXPosition = 0.8+xNudge;
      break;
      case '0':
      relativeXPosition = 0.9+xNudge;
      break;
    }
    return relativeXPosition;
  }

  function findXOnSecondRowKey(aKey){
    //10 keys on the second row
    var numberOfCharacters = 10;
    var xNudge = (1/numberOfCharacters)/2;

    var relativeXPosition = 0.0;
    switch(aKey) {
      case 'q': case 'Q':
      relativeXPosition = 0.0+xNudge;
      break;
      case 'w': case 'W':
      relativeXPosition = 0.1+xNudge;
      break;
      case 'e': case 'E':
      relativeXPosition = 0.2+xNudge;
      break;
      case 'r': case 'R':
      relativeXPosition = 0.3+xNudge;
      break;
      case 't': case 'T':
      relativeXPosition = 0.4+xNudge;
      break;
      case 'y': case 'Y':
      relativeXPosition = 0.5+xNudge;
      break;
      case 'u': case 'U':
      relativeXPosition = 0.6+xNudge;
      break;
      case 'i': case 'I':
      relativeXPosition = 0.7+xNudge;
      break;
      case 'o': case 'O':
      relativeXPosition = 0.8+xNudge;
      break;
      case 'p': case 'P':
      relativeXPosition = 0.9+xNudge;
      break;
    }
    return relativeXPosition;
  }

  function findXOnThirdRowKey(aKey){
    //9 keys on the third row
    var numberOfCharacters = 9;
    var ratio = 1.0/numberOfCharacters;
    var xNudge = (1/numberOfCharacters)/2;

    var relativeXPosition = 0.0;
    switch(aKey) {
      case 'a': case 'A':
      relativeXPosition = (0*ratio)+xNudge;
      break;
      case 's': case 'S':
      relativeXPosition = (1*ratio)+xNudge;
      break;
      case 'd': case 'D':
      relativeXPosition = (2*ratio)+xNudge;
      break;
      case 'f': case 'F':
      relativeXPosition = (3*ratio)+xNudge;
      break;
      case 'g': case 'G':
      relativeXPosition = (4*ratio)+xNudge;
      break;
      case 'h': case 'H':
      relativeXPosition = (5*ratio)+xNudge;
      break;
      case 'j': case 'J':
      relativeXPosition = (6*ratio)+xNudge;
      break;
      case 'k': case 'K':
      relativeXPosition = (7*ratio)+xNudge;
      break;
      case 'l': case 'L':
      relativeXPosition = (8*ratio)+xNudge;
      break;
    }
    return relativeXPosition;
  }

  function findXOnFourthRowKey(aKey){
    //7 keys on the third row
    var numberOfCharacters = 7;
    var ratio = 1/numberOfCharacters;
    var xNudge = (1/numberOfCharacters)/2;

    var relativeXPosition = 0.0;
    switch(aKey) {
      case 'z': case 'Z':
      relativeXPosition = (0*ratio)+xNudge;
      break;
      case 'x': case 'X':
      relativeXPosition = (1*ratio)+xNudge;
      break;
      case 'c': case 'C':
      relativeXPosition = (2*ratio)+xNudge;
      break;
      case 'v': case 'V':
      relativeXPosition = (3*ratio)+xNudge;
      break;
      case 'b': case 'B':
      relativeXPosition = (4*ratio)+xNudge;
      break;
      case 'n': case 'N':
      relativeXPosition = (5*ratio)+xNudge;
      break;
      case 'm': case 'M':
      relativeXPosition = (6*ratio)+xNudge;
      break;
    }
    return relativeXPosition;
  }
}
