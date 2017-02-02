/*
keyboard.p5.jgl.js
Various p5.js functions for enabling keyboard interaction

Open Source under the MIT License
https://opensource.org/licenses/MIT

Copyright 2017 Joel Gethin Lewis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function getCanvasPositionFromKey(aKey){ //returns the position of a key onscreen in the form of a vector between 0..1 where 0,0 is top left and 1,1 is bottom right of screen - i.e. relative screen ratio rather than absolute pixel position
  var canvasPosition =  createVector(0.5,0.5); //centre of screen for now
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
