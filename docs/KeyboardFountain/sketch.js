var fountainPosition;
var randomColour;

//matter-js and p5.js integration based on https://github.com/shiffman/p5-matter by Daniel Shiffman
//also see https://www.youtube.com/watch?v=urR596FsU68 introduction to matter.js by Daniel Shiffman
var Engine = Matter.Engine;
var Render = Matter.Render; // commented out as we are using p5.js to render everything to the screen
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Composite = Matter.Composite;
var Composites = Matter.Composites;

var engine;
var world;
var bodies;
var canvas;

var circles = [];//array holding the circles in the simulation

var fountainWidth = 10;
var fountainHeight = 50;

var fountain;

function setup() {
  canvas = createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  noStroke(); //no outlines, just filled shapes
  colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
  rectMode(CENTER); // draw rects from their centres... https://p5js.org/reference/#/p5/rectMode
  fountainPosition = createVector(0.5,1); //half way across the screen, at the bottom of the screen

  setupPhysics();
}

function setupPhysics(){
  // create an engine
  engine = Engine.create();
  world = engine.world;

  //make walls to constrain everything
  var params = {
    isStatic: true
  }
  var ground = Bodies.rectangle(width / 2, height+1, width, 1, params); //+1 so it's just below the bottom of the screen, Matter.Bodies.rectangle(x, y, width, height, [options])
  var leftWall = Bodies.rectangle(0, height / 2, 1, height, params);
  var rightWall = Bodies.rectangle(width, height / 2, 1, height, params);
  var top = Bodies.rectangle(width / 2, 0, width, 1, params);
  World.add(world, ground);
  World.add(world, leftWall);
  World.add(world, rightWall);
  World.add(world, top);

  //adding the fountain
  var fountainX = fountainPosition.x*windowWidth;
  var fountainY = fountainPosition.y*windowHeight; //to get it above the ground! otherwise it would fall forever!
  fountain = Bodies.rectangle(fountainX-(fountainWidth/2), fountainY-(fountainHeight/2), fountainWidth, fountainHeight, params); //position is in the centre of it
  World.add(world, fountain);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(255); //white background
  moveFountain();
  drawFountain();
  drawCircles();
}

function moveFountain(){
  var moveAmount = 0.005;

  if (keyIsDown(LEFT_ARROW) && (this.fountainPosition.x >= moveAmount))
    this.fountainPosition.x -= moveAmount;

  if (keyIsDown(RIGHT_ARROW) && (this.fountainPosition.x <= (1-moveAmount)))
    this.fountainPosition.x += moveAmount;

  var positionVector = Matter.Vector.create((this.fountainPosition.x*windowWidth)-(fountainWidth/2), (this.fountainPosition.y*windowHeight)-(fountainHeight/2));
  Body.setPosition(fountain, positionVector);
}

function drawFountain(){
  var translatedX = this.fountainPosition.x * windowWidth;
  var translatedY = this.fountainPosition.y * windowHeight;
  //var redColour = color(0,100,100,100);
  var redColour = color('rgba(0,0,0,0.5)');
  var blueColour = color('rgba(0,0,0,0.5)');

  fill(redColour);
  rect(translatedX-(fountainWidth/2), translatedY-(fountainHeight/2), fountainWidth, fountainHeight);//rect(x,y,w,h
  //triangle(translatedX-(fountainWidth/2),translatedY,translatedX+(fountainWidth/2),translatedY,translatedX,translatedY-fountainHeight); //https://p5js.org/reference/#/p5/triangle

  //also draw the simulated triangle
  var posFountainX = this.fountain.position.x;
  var posFountainY = this.fountain.position.y;
  fill(blueColour);
  rect(posFountainX, posFountainY, fountainWidth, fountainHeight);
}

function addCircle(){
  var params = {
    restitution: 0.7,
    friction: 0.2
  }
  var translatedX = this.fountainPosition.x * windowWidth;
  var translatedY = this.fountainPosition.y * windowHeight;
  var radius = 21;
  var newCircle = Bodies.circle(translatedX, translatedY-(fountainHeight), radius, params);
  var theCircleToAdd = new FountainCircle(newCircle);
  circles.push(theCircleToAdd);
  World.add(world, newCircle);

  //set a random velocity of the new circle
  //see http://brm.io/matter-js/docs/classes/Body.html
  //from http://codepen.io/lilgreenland/pen/jrMvaB?editors=0010#0
  Body.setVelocity(newCircle, {
      x: random(-5,5),
      y: -random(15,30)
    });
}

function drawCircles(){
  stroke(255);
  strokeWeight(1);

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i].matterCircle;
    var pos = circle.position;
    var r = circle.circleRadius;
    var angle = circle.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(circles[i].colour);
    ellipse(0, 0, r * 2);
    //line(0, 0, r, 0);
    pop();
  }
}

function keyTyped(){
  addCircle();
  return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
}

function windowResized() { //https://p5js.org/reference/#/p5/windowResized
  resizeCanvas(windowWidth, windowHeight);
}

function FountainCircle(theCircle) {  // quick class to hold Matter Circle and its colour
  this.matterCircle = theCircle;
  this.colour = color(random(100),50,100,50); //random hue, saturation 50%, brightness 100%, alpha 50%;
}