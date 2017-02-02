var springyCircles = []; //array of SpringyCircle objects
var numberOfSpringyCircles = 10;
var allTheKeys = "1234567890qwertyuiopasdfghjklzxcvbnm";
var circleMinRadius = 50;
var circleMaxRadius = 100;
var sel; //a dropdown menu <select></select> element in the DOM.

function setup() {
  createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  noStroke(); //no outlines, just filled shapes
  colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
  ellipseMode(RADIUS); //https://p5js.org/reference/#/p5/ellipseMode draw with a radius rather than a width

  for (var i=0; i < numberOfSpringyCircles; i++) {
    springyCircles.push(new SpringyCircle());
  }

  selectLabel = createDiv('Select an easing function:');
  selectLabel.position(10, 10);

  textAlign(CENTER);
  sel = createSelect();
  sel.position(10, 30);
  sel.option('easeOutBounce');
  sel.option('easeOutBack');
  sel.option('elastic');
  sel.option('swingTo');
  sel.option('bounce');
  sel.option('bouncePast');
}

function draw() {
  background(255); //white background
  drawCircles();
}

function drawCircles(){
  for (var i = 0; i < springyCircles.length; i++) {
    springyCircles[i].display();
  }
}

function keyTyped(){
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
        springyCircles[i].startEase();
      }

    }
  }

  return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
}

function SpringyCircle(){ //SpringyCircle object
  this.colour = color(random(100),50,100,50);; //random hue, saturation 50%, brightness 100%, alpha 50%
  this.radius = random(circleMinRadius,circleMaxRadius);
  this.position = createVector(random(windowWidth)/windowWidth,random(windowHeight)/windowHeight);
  this.startPosition = createVector(this.position.x, this.position.y);
  this.startPosition.y += 0.15; //want to start 15% of the screen down when the circle is interacted with
  this.durationOfEase = 1000; //1000 milliseconds for easing
  this.endPosition = createVector(this.position.x, this.position.y); //want to finish back where we started
  this.startTimeOfEase = -1;

  this.display = function(){
    var milliseconds = millis();
    var elapsedMillisSinceStartOfEase = milliseconds - this.startTimeOfEase;
    if(this.startTimeOfEase > 0 && elapsedMillisSinceStartOfEase < this.durationOfEase){
      var changeBetweenStartAndEnd = this.endPosition.y - this.startPosition.y;
      var ratioOfEaseComplete = elapsedMillisSinceStartOfEase/this.durationOfEase;
      var changeUpToNow = 0;
      var easeOption = sel.value();

      switch(easeOption){
        case 'easeOutBounce':
          changeUpToNow = changeBetweenStartAndEnd*easeOutBounce(ratioOfEaseComplete);
          break;
        case 'easeOutBack':
          changeUpToNow = changeBetweenStartAndEnd*easeOutBack(ratioOfEaseComplete);
          break;
        case 'elastic':
          changeUpToNow = changeBetweenStartAndEnd*elastic(ratioOfEaseComplete);
          break;
        case 'swingTo':
          changeUpToNow = changeBetweenStartAndEnd*swingTo(ratioOfEaseComplete);
          break;
        case 'bounce':
          changeUpToNow = changeBetweenStartAndEnd*bounce(ratioOfEaseComplete);
          break;
        case 'bouncePast':
          changeUpToNow = changeBetweenStartAndEnd*bouncePast(ratioOfEaseComplete);
          break;
        default:
          changeUpToNow = changeBetweenStartAndEnd*bouncePast(ratioOfEaseComplete);
          break;
      }

      this.position.y = this.startPosition.y + changeUpToNow;
    }
    var translatedX = this.position.x * windowWidth;
    var translatedY = this.position.y * windowHeight;
    fill(this.colour);
    ellipse(translatedX, translatedY, this.radius); // https://p5js.org/reference/#/p5/ellipse and https://p5js.org/reference/#/p5/ellipseMode
  }

  this.startEase = function(){ //move the position of the spring a bit
    print("Starting an Ease");
    this.startTimeOfEase = millis();
  }
}
