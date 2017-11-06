function KeyboardFountain(){
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

  this.setup = function(){
    canvas = createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
    noStroke(); //no outlines, just filled shapes
    colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
    rectMode(CENTER); // draw rects from their centres... https://p5js.org/reference/#/p5/rectMode
    ellipseMode(RADIUS); // draw circles from their centres... https://p5js.org/reference/#/p5/ellipseMode
    this.fountainPosition = createVector(0.5,1); //half way across the screen, at the bottom of the screen

    while(circles.length > 0) { // https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
      circles.pop();
    }

    this.setupPhysics();
  }

  this.setupPhysics = function(){
    // create an engine
    engine = Engine.create();
    world = engine.world;

    //make sure the world is clear
    World.clear(world);

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
    var fountainX = this.fountainPosition.x*windowWidth;
    var fountainY = this.fountainPosition.y*windowHeight; //to get it above the ground! otherwise it would fall forever!
    this.fountain = Bodies.rectangle(fountainX-(fountainWidth/2), fountainY-(fountainHeight/2), fountainWidth, fountainHeight, params); //position is in the centre of it
    World.add(world, this.fountain);

    // run the engine
    Engine.run(engine);
  }

  this.draw = function(){
    background(255); //white background
    rectMode(CENTER); // draw rects from their centres... https://p5js.org/reference/#/p5/rectMode
    this.moveFountain();
    this.drawFountain();
    this.drawCircles();
  }

  this.moveFountain = function(){
    var moveAmount = 0.005;

    if (keyIsDown(LEFT_ARROW) && (this.fountainPosition.x >= moveAmount))
      this.fountainPosition.x -= moveAmount;

    if (keyIsDown(RIGHT_ARROW) && (this.fountainPosition.x <= (1-moveAmount)))
      this.fountainPosition.x += moveAmount;

    var positionVector = Matter.Vector.create((this.fountainPosition.x*windowWidth)-(fountainWidth/2), (this.fountainPosition.y*windowHeight)-(fountainHeight/2));
    Body.setPosition(this.fountain, positionVector);
  }

  this.drawFountain = function(){
    var translatedX = this.fountainPosition.x * windowWidth;
    var translatedY = this.fountainPosition.y * windowHeight;
    var greyColour = color('rgba(0,0,0,0.5)');

    fill(greyColour);
    rect(translatedX-(fountainWidth/2), translatedY-(fountainHeight/2), fountainWidth, fountainHeight);//rect(x,y,w,h
    //triangle(translatedX-(fountainWidth/2),translatedY,translatedX+(fountainWidth/2),translatedY,translatedX,translatedY-fountainHeight); //https://p5js.org/reference/#/p5/triangle

    //also draw the simulated rectangle
    var posFountainX = this.fountain.position.x;
    var posFountainY = this.fountain.position.y;
    rect(posFountainX, posFountainY, fountainWidth, fountainHeight);
  }

  this.addCircle = function(){
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

 this.drawCircles = function(){
    noStroke();

    for (var i = 0; i < circles.length; i+= 1) {
      var circle = circles[i].matterCircle;
      var pos = circle.position;
      var r = circle.circleRadius;
      var angle = circle.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill(circles[i].colour);
      ellipse(0, 0, r); //previously ellipse(0, 0, r *2) when using a different ellipseMode: https://p5js.org/reference/#/p5/ellipseMode
      //line(0, 0, r, 0); //useful to be able to see rotation of the circles
      pop();
    }
  }

  this.keyTyped = function(){
    this.addCircle();
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

  function FountainCircle(theCircle) {  // quick class to hold Matter Circle and its colour
    this.matterCircle = theCircle;
    this.colour = color(random(100),50,100,50); //random hue, saturation 50%, brightness 100%, alpha 50%;
  }
}