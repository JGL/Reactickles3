var characterSize = 24;
var theKeyboardScalingCircleGrid;
var theKeyboardWorm;
var theMouseWorm;
var theKeyboardSpringyCircles;
var theMouseSpringyCircles;
var theKeyboardBouncingCircleGrid;
var theKeyboardSquares;
var theKeyboardFountain;

var menuScreen = true;  //to start with, display the menu screen
var reactickleScreen = false; //to start with, don't display a Reactickle as the user hasn't selected one yet
var theReactickle;

var buttons = []; //array of all the ReactickleButtons

var theReturnToMenuButton;

var animationOfKeyboardScalingCircleGrid;
var animationOfKeyboardWorm;
var animationOfMouseWorm;
var animationOfKeyboardSpringyCircles;
var animationOfMouseSpringyCircles;
var animationOfKeyboardBouncingCircleGrid;
var animationOfKeyboardSquares;
var animationOfKeyboardFountain;

var animations = [];

var reactickles3Font;

var strokeSize = 4; //draw a pixel border of this size around buttons in the menu

var textOffsetFromSideOfScreen = 10; //offset the text in the actual Reactickle screen by this amount

function preload(){
  //preload all the video icons
  animationOfKeyboardScalingCircleGrid = loadAnimation("png/KeyboardScalingCircleGrid01.png", "png/KeyboardScalingCircleGrid88.png");
  animations.push(animationOfKeyboardScalingCircleGrid);
  animationOfKeyboardWorm = loadAnimation("png/KeyboardWorm01.png", "png/KeyboardWorm79.png");
  animations.push(animationOfKeyboardWorm);
  animationOfMouseWorm = loadAnimation("png/MouseWorm001.png", "png/MouseWorm102.png");
  animations.push(animationOfMouseWorm);
  animationOfKeyboardSpringyCircles = loadAnimation("png/KeyboardSpringyCircles001.png", "png/KeyboardSpringyCircles112.png");
  animations.push(animationOfKeyboardSpringyCircles);
  animationOfMouseSpringyCircles = loadAnimation("png/MouseSpringyCircles001.png", "png/MouseSpringyCircles140.png");
  animations.push(animationOfMouseSpringyCircles);
  animationOfKeyboardBouncingCircleGrid = loadAnimation("png/KeyboardBouncingCircleGrid01.png", "png/KeyboardBouncingCircleGrid98.png");
  animations.push(animationOfKeyboardBouncingCircleGrid);
  animationOfKeyboardSquares = loadAnimation("png/KeyboardSquares001.png", "png/KeyboardSquares210.png");
  animations.push(animationOfKeyboardSquares);
  animationOfKeyboardFountain = loadAnimation("png/KeyboardFountain001.png", "png/KeyboardFountain235.png");
  animations.push(animationOfKeyboardFountain);

  reactickles3Font = loadFont("font/futura_book.otf");
}

function setup() {
  createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  textSize(characterSize);
  colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
  rectMode(CORNER);

  theKeyBoardScalingCircleGrid = new KeyboardScalingCircleGrid();
  theKeyboardWorm = new KeyboardWorm();
  theMouseWorm = new MouseWorm();
  theKeyboardSpringyCircles = new KeyboardSpringyCircles();
  theMouseSpringyCircles = new MouseSpringyCircles();
  theKeyboardBouncingCircleGrid = new KeyboardBouncingCircleGrid();
  theKeyboardSquares = new KeyboardSquares();
  theKeyboardFountain = new KeyboardFountain();

  var theButtonDimensions = createVector(128,128);

  var theKeyboardScalingCircleGridButtonPosition = createVector(100, 200);
  var theKeyboardScalingCircleGridButton = new ReactickleButton("Keyboard Scaling Circle Grid", theKeyBoardScalingCircleGrid, theKeyboardScalingCircleGridButtonPosition, theButtonDimensions, animationOfKeyboardScalingCircleGrid);
  buttons.push(theKeyboardScalingCircleGridButton);

  var theKeyboardWormButtonPosition = createVector(100+(theButtonDimensions.x * 1), 200);
  var theKeyboardWormButton = new ReactickleButton("Keyboard Worm", theKeyboardWorm, theKeyboardWormButtonPosition, theButtonDimensions, animationOfKeyboardWorm);
  buttons.push(theKeyboardWormButton);

  var theKeyboardSpringyCirclesPosition = createVector(100+(theButtonDimensions.x * 2), 200);
  var theKeyboardSpringyCirclesButton = new ReactickleButton("Keyboard Springy Circles", theKeyboardSpringyCircles, theKeyboardSpringyCirclesPosition, theButtonDimensions, animationOfKeyboardSpringyCircles);
  buttons.push(theKeyboardSpringyCirclesButton);

  var theKeyboardBouncingCircleGridPosition = createVector(100+(theButtonDimensions.x * 3), 200);
  var theKeyboardBouncingCircleGridButton = new ReactickleButton("Keyboard Bouncing Circle Grid", theKeyboardBouncingCircleGrid, theKeyboardBouncingCircleGridPosition, theButtonDimensions, animationOfKeyboardBouncingCircleGrid);
  buttons.push(theKeyboardBouncingCircleGridButton);

  var theKeyboardSquaresPosition = createVector(100+(theButtonDimensions.x * 4), 200);
  var theKeyboardSquaresButton = new ReactickleButton("Keyboard Squares", theKeyboardSquares, theKeyboardSquaresPosition, theButtonDimensions, animationOfKeyboardSquares);
  buttons.push(theKeyboardSquaresButton);

  var theKeyboardFountainPosition = createVector(100+(theButtonDimensions.x * 5), 200);
  var theKeyboardFountainButton = new ReactickleButton("Keyboard Fountain", theKeyboardFountain, theKeyboardFountainPosition, theButtonDimensions, animationOfKeyboardFountain);
  buttons.push(theKeyboardFountainButton);

  //separate row for mouse based interactions
  var theMouseWormButtonPosition = createVector(100, 400);
  var theMouseWormButton = new ReactickleButton("Mouse Worm", theMouseWorm, theMouseWormButtonPosition, theButtonDimensions, animationOfMouseWorm);
  buttons.push(theMouseWormButton);

  var theMouseSpringyCirclesPosition = createVector(100+theButtonDimensions.x, 400);
  var theMouseSpringyCirclesButton = new ReactickleButton("Mouse Springy Circles", theMouseSpringyCircles, theMouseSpringyCirclesPosition, theButtonDimensions, animationOfMouseSpringyCircles);
  buttons.push(theMouseSpringyCirclesButton);

  var theReactickleTitlePosition = createVector(0,0);
  theReactickleTitle = new ReactickleTitle(theReactickleTitlePosition, theButtonDimensions);

  var theReturnToMenuButtonPosition = createVector(0, windowHeight-theButtonDimensions.y);
  theReturnToMenuButton = new ReturnToMenuButton(theReturnToMenuButtonPosition,theButtonDimensions);

  //playAndLoopAllVideos();

  strokeWeight(strokeSize);
}

function draw() {
  if(menuScreen){
    rectMode(CORNER); // making sure the buttons are drawn correctly
    background(255); //white background
    noStroke();
    fill(0);
    textFont(reactickles3Font);
    textSize(48);
    text('Welcome to ReacTickles3', 100, 120);
    textSize(24);
    text("Please choose a ReacTickle below:", 100, 180);

    strokeWeight(strokeSize);
    for(var i=0; i<buttons.length; i++){
      buttons[i].draw();
    }
  }

  if(reactickleScreen){
    theReactickle.draw();
    rectMode(CORNER); // making sure the buttons are drawn correctly
    theReactickleTitle.draw();
    theReturnToMenuButton.draw();
  }
}

function keyTyped(){
  if(reactickleScreen){
    theReactickle.keyTyped();
  }
  return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
}

function touchMoved(){
  if(reactickleScreen){
    theReactickle.touchMoved();
  }
  return false; //https://p5js.org/reference/#/p5/touchMoved
}

function mouseMoved(){
  if(!mouseIsPressed && menuScreen){
    //then the mouse is just moving around, so highlight the mouseOvered button
    for(var i=0; i<buttons.length; i+= 1){
      if(buttons[i].checkIfMouseOverButton(mouseX, mouseY)){//is the mouse over the button in question?
        buttons[i].highlit = true; //get the reactickle to run from the button itself
      }else{
        buttons[i].highlit = false;
      }
    }
  }
}

function mouseReleased(){
  if(menuScreen){
    for(var i=0; i<buttons.length; i+= 1){

      if(buttons[i].checkIfMouseOverButton(mouseX, mouseY)){//is the mouse over the button in question?
        //if so, we aren't on the menuScreen any more, we are running a Reactickle
        menuScreen = false; //set menuScreen to false as we aren't on the menu any more
        reactickleScreen = true; //set reactickleScreen to true as we want to display a reactickle now
        theReactickle = buttons[i].reactickleToRun; //get the reactickle to run from the button itself
        theReactickle.setup(); //set it up!
        theReactickleTitle.updateButtonText(buttons[i].title); //update the button to have the reactickle name in it too
        //stopAllVideos(); //no point playing the thumbnails if we can't see them
        break;
      }
    }
  }

  if(reactickleScreen){
    theReactickle.mouseReleased();
    if(theReturnToMenuButton.checkIfMouseOverButton(mouseX, mouseY)){
      menuScreen = true;
      reactickleScreen = false;
      //playAndLoopAllVideos();
    }
  }
}

function windowResized(){
  if(reactickleScreen){
    theReactickle.windowResized();
  }
}

// function stopAllVideos(){
//   for(var i=0; i< videoThumbnails.length; i+=1){
//     videoThumbnails[i].stop();
//   }
// }

// function playAndLoopAllVideos(){
//   for(var i=0; i< videoThumbnails.length; i+=1){
//     videoThumbnails[i].loop();
//   }
// }

function ReactickleButton(title, reactickleToRun, position, dimensions, animationThumbnail){
  this.title = title;
  this.reactickleToRun = reactickleToRun;
  this.position = position;
  this.dimensions = dimensions;
  this.highlightColour = color('rgb(255,0,0)');
  this.animationThumbnail = animationThumbnail;
  this.highlit = false;

  this.draw = function(){
    animation(this.animationThumbnail, this.position.x+(this.dimensions.x/2), this.position.y+(this.dimensions.y/2));

    noStroke();
    fill(0);
    textFont(reactickles3Font);
    textSize(18);
    text(this.title, this.position.x+4, this.position.y+(this.dimensions.y/3), this.dimensions.x, this.dimensions.y);

    //draw a highlight around the button, if necessary
    if(this.highlit){
      stroke(this.highlightColour);
      noFill();
      rect(this.position.x, this.position.y, this.dimensions.x-(strokeSize/2), this.dimensions.y);
    }
  }

  this.checkIfMouseOverButton = function(aMouseX, aMouseY){
    var mouseIsOver = false;

    //start with X position
    if((aMouseX >= this.position.x) && (aMouseX <= (this.position.x + this.dimensions.x))){
      if((aMouseY >= this.position.y) && (aMouseY <= (this.position.y + this.dimensions.y))){
        mouseIsOver = true;
      }
    }

    return mouseIsOver;
  }
}

function ReturnToMenuButton(position, dimensions){
  this.title = "Back to Menu";
  this.position = position;
  this.dimensions = dimensions;
  this.backgroundColour = color('rgba(0,0,0,0.5)');
  this.textColour = color('rgb(255,255,255)');

  this.draw = function(){
    textFont(reactickles3Font);
    textSize(characterSize);
    noStroke();
    fill(this.backgroundColour);
    rect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
    fill(this.textColour);
    text(this.title, this.position.x+textOffsetFromSideOfScreen, this.position.y+(this.dimensions.y/3), this.dimensions.x-textOffsetFromSideOfScreen, this.dimensions.y); //https://p5js.org/reference/#/p5/text
  }

  this.checkIfMouseOverButton = function(aMouseX, aMouseY){
    var mouseIsOver = false;

    //start with X position
    if((aMouseX >= this.position.x) && (aMouseX <= (this.position.x + this.dimensions.x))){
      if((aMouseY >= this.position.y) && (aMouseY <= (this.position.y + this.dimensions.y))){
        mouseIsOver = true;
      }
    }

    return mouseIsOver;
  }
}

function ReactickleTitle(position, dimensions){
  this.title = "A Reactickle";
  this.position = position;
  this.dimensions = dimensions;
  this.backgroundColour = color('rgba(0,0,0,0.5)');
  this.textColour = color('rgb(255,255,255)');

  this.draw = function(){
    textFont(reactickles3Font);
    textSize(characterSize);
    noStroke();
    fill(this.backgroundColour);
    rect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
    fill(this.textColour);
    text(this.title, this.position.x+textOffsetFromSideOfScreen, this.position.y+textOffsetFromSideOfScreen, this.dimensions.x-textOffsetFromSideOfScreen, this.dimensions.y); //https://p5js.org/reference/#/p5/text
  }

  this.updateButtonText = function(textToAdd){
    this.title = textToAdd;
  }
}