var fountainPosition;
var randomColour;

//matter-js and p5.js integration based on https://github.com/shiffman/p5-matter by Daniel Shiffman
//also see https://www.youtube.com/watch?v=urR596FsU68 introduction to matter.js by Daniel Shiffman
var Engine = Matter.Engine;
//var Render = Matter.Render; // commented out as we are using p5.js to render everything to the screen
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

var fountainWidth = 50; //50 pixels wide
var fountainHeight = 50; //50 pixels high

function setup() {
  canvas = createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  noStroke(); //no outlines, just filled shapes
  colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
  rectMode(CENTER); // draw rects from their centres... https://p5js.org/reference/#/p5/rectMode
  pickRandomColour();
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
  var ground = Bodies.rectangle(width / 2, height, width, 1, params);
  var leftWall = Bodies.rectangle(0, height / 2, 1, height, params);
  var rightWall = Bodies.rectangle(width, height / 2, 1, height, params);
  var top = Bodies.rectangle(width / 2, 0, width, 1, params);
  World.add(world, ground);
  World.add(world, leftWall);
  World.add(world, rightWall);
  World.add(world, top);

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
}

function pickRandomColour(){
  randomColour = color(random(100),50,100,50); //random hue, saturation 50%, brightness 100%, alpha 50%
}

function drawFountain(){
  var translatedX = this.fountainPosition.x * windowWidth;
  var translatedY = this.fountainPosition.y * windowHeight;
  var redColour = color(0,100,100,100);
  fill(redColour);
  triangle(translatedX-(fountainWidth/2),translatedY,translatedX+(fountainWidth/2),translatedY,translatedX,translatedY-fountainHeight); //https://p5js.org/reference/#/p5/triangle
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
  circles.push(newCircle);
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
  fill(randomColour);

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var pos = circle.position;
    var r = circle.circleRadius;
    var angle = circle.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    ellipse(0, 0, r * 2);
    line(0, 0, r, 0);
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
