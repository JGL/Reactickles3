/*
easing.p5.jgl.js
Easing equations suitable for use with p5.js

see https://github.com/jeremyckahn/shifty/blob/master/src/shifty.formulas.js
and http://upshots.org/actionscript/jsas-understanding-easing
and of course http://robertpenner.com/easing/

Adapted from Jeremy Kahn's https://github.com/jeremyckahn/shifty/blob/master/src/shifty.formulas.js

Which was in turn adapted from Thomas Fuchs'
[Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).

Based on Easing Equations (c) 2003 [Robert
Penner](http://www.robertpenner.com/), all rights reserved. This work is
[subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).

TERMS OF USE - EASING EQUATIONS

Open source under the BSD License.

Copyright © 2001 Robert Penner
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

function easeOutQuad(howFarThroughEase){
  return -(Math.pow((howFarThroughEase - 1), 2) - 1);
}

function easeInOutQuad(howFarThroughEase){
  if ((howFarThroughEase /= 0.5) < 1) {return 0.5 * Math.pow(howFarThroughEase,2);}
  return -0.5 * ((howFarThroughEase -= 2) * howFarThroughEase - 2);
}

function easeInCubic(howFarThroughEase){
  return Math.pow(howFarThroughEase, 3);
}

function easeOutCubic(howFarThroughEase){
  return (Math.pow((howFarThroughEase - 1), 3) + 1);
}

function easeInOutCubic(howFarThroughEase){
  if ((howFarThroughEase /= 0.5) < 1) {return 0.5 * Math.pow(howFarThroughEase,3);}
  return 0.5 * (Math.pow((howFarThroughEase - 2),3) + 2);
}

function easeInQuart(howFarThroughEase){
  return Math.pow(howFarThroughEase, 4);
}

function easeOutQuart(howFarThroughEase){
  return -(Math.pow((howFarThroughEase - 1), 4) - 1);
}

function easeInOutQuart(howFarThroughEase){
  if ((howFarThroughEase /= 0.5) < 1) {return 0.5 * Math.pow(howFarThroughEase,4);}
  return -0.5 * ((howFarThroughEase -= 2) * Math.pow(howFarThroughEase,3) - 2);
}

function easeInQuint(howFarThroughEase){
  return Math.pow(howFarThroughEase, 5);
}

function easeOutQuint(howFarThroughEase){
  return (Math.pow((howFarThroughEase - 1), 5) + 1);
}

function easeInOutQuint(howFarThroughEase){
  if ((howFarThroughEase /= 0.5) < 1) {return 0.5 * Math.pow(howFarThroughEase,5);}
  return 0.5 * (Math.pow((howFarThroughEase - 2),5) + 2);
}

function easeInSine(howFarThroughEase){
  return -Math.cos(howFarThroughEase * (Math.PI / 2)) + 1;
}

function easeOutSine(howFarThroughEase){
  return Math.sin(howFarThroughEase * (Math.PI / 2));
}

function easeInOutSine(howFarThroughEase){
  return (-0.5 * (Math.cos(Math.PI * howFarThroughEase) - 1));
}

function easeInExpo(howFarThroughEase){
  return (howFarThroughEase === 0) ? 0 : Math.pow(2, 10 * (howFarThroughEase - 1));
}

function easeOutExpo(howFarThroughEase){
  return (howFarThroughEase === 1) ? 1 : -Math.pow(2, -10 * howFarThroughEase) + 1;
}

function easeInOutExpo(howFarThroughEase){
  if (howFarThroughEase === 0) {return 0;}
  if (howFarThroughEase === 1) {return 1;}
  if ((howFarThroughEase /= 0.5) < 1) {return 0.5 * Math.pow(2,10 * (howFarThroughEase - 1));}
  return 0.5 * (-Math.pow(2, -10 * --howFarThroughEase) + 2);
}

function easeInCirc(howFarThroughEase){
  return -(Math.sqrt(1 - (howFarThroughEase * howFarThroughEase)) - 1);
}

function easeOutCirc(howFarThroughEase){
  return Math.sqrt(1 - Math.pow((howFarThroughEase - 1), 2));
}

function easeInOutCirc(howFarThroughEase){
  if ((howFarThroughEase /= 0.5) < 1) {return -0.5 * (Math.sqrt(1 - howFarThroughEase * howFarThroughEase) - 1);}
  return 0.5 * (Math.sqrt(1 - (howFarThroughEase -= 2) * howFarThroughEase) + 1);
}

function easeOutBounce(howFarThroughEase){
  if ((howFarThroughEase) < (1 / 2.75)) {
    return (7.5625 * howFarThroughEase * howFarThroughEase);
  } else if (howFarThroughEase < (2 / 2.75)) {
    return (7.5625 * (howFarThroughEase -= (1.5 / 2.75)) * howFarThroughEase + 0.75);
  } else if (howFarThroughEase < (2.5 / 2.75)) {
    return (7.5625 * (howFarThroughEase -= (2.25 / 2.75)) * howFarThroughEase + 0.9375);
  } else {
    return (7.5625 * (howFarThroughEase -= (2.625 / 2.75)) * howFarThroughEase + 0.984375);
  }
}

function easeInBack(howFarThroughEase){
  var s = 1.70158;
  return (howFarThroughEase) * howFarThroughEase * ((s + 1) * howFarThroughEase - s);
}

function easeOutBack(howFarThroughEase){
  var s = 1.70158;
  return (howFarThroughEase = howFarThroughEase - 1) * howFarThroughEase * ((s + 1) * howFarThroughEase + s) + 1;
}

function easeInOutBack(howFarThroughEase){
  var s = 1.70158;
  if ((howFarThroughEase /= 0.5) < 1) {
    return 0.5 * (howFarThroughEase * howFarThroughEase * (((s *= (1.525)) + 1) * howFarThroughEase - s));
  }
  return 0.5 * ((howFarThroughEase -= 2) * howFarThroughEase * (((s *= (1.525)) + 1) * howFarThroughEase + s) + 2);
}

function elastic(howFarThroughEase){
  return -1 * Math.pow(4,-8 * howFarThroughEase) * Math.sin((howFarThroughEase * 6 - 1) * (2 * Math.PI) / 2) + 1;
}

function swingFromTo(howFarThroughEase){
  var s = 1.70158;
  return ((howFarThroughEase /= 0.5) < 1) ?
      0.5 * (howFarThroughEase * howFarThroughEase * (((s *= (1.525)) + 1) * howFarThroughEase - s)) :
      0.5 * ((howFarThroughEase -= 2) * howFarThroughEase * (((s *= (1.525)) + 1) * howFarThroughEase + s) + 2);
}

function swingFrom(howFarThroughEase){
  var s = 1.70158;
  return howFarThroughEase * howFarThroughEase * ((s + 1) * howFarThroughEase - s);
}

function swingTo(howFarThroughEase){
  var s = 1.70158;
  return (howFarThroughEase -= 1) * howFarThroughEase * ((s + 1) * howFarThroughEase + s) + 1;
}

function bounce(howFarThroughEase){
  if (howFarThroughEase < (1 / 2.75)) {
    return (7.5625 * howFarThroughEase * howFarThroughEase);
  } else if (howFarThroughEase < (2 / 2.75)) {
    return (7.5625 * (howFarThroughEase -= (1.5 / 2.75)) * howFarThroughEase + 0.75);
  } else if (howFarThroughEase < (2.5 / 2.75)) {
    return (7.5625 * (howFarThroughEase -= (2.25 / 2.75)) * howFarThroughEase + 0.9375);
  } else {
    return (7.5625 * (howFarThroughEase -= (2.625 / 2.75)) * howFarThroughEase + 0.984375);
  }
}

function bouncePast(howFarThroughEase){
  if (howFarThroughEase < (1 / 2.75)) {
    return (7.5625 * howFarThroughEase * howFarThroughEase);
  } else if (howFarThroughEase < (2 / 2.75)) {
    return 2 - (7.5625 * (howFarThroughEase -= (1.5 / 2.75)) * howFarThroughEase + 0.75);
  } else if (howFarThroughEase < (2.5 / 2.75)) {
    return 2 - (7.5625 * (howFarThroughEase -= (2.25 / 2.75)) * howFarThroughEase + 0.9375);
  } else {
    return 2 - (7.5625 * (howFarThroughEase -= (2.625 / 2.75)) * howFarThroughEase + 0.984375);
  }
}

function easeFromTo(howFarThroughEase){
  if ((howFarThroughEase /= 0.5) < 1) {return 0.5 * Math.pow(howFarThroughEase,4);}
  return -0.5 * ((howFarThroughEase -= 2) * Math.pow(howFarThroughEase,3) - 2);
}

function easeFrom(howFarThroughEase){
  return Math.pow(howFarThroughEase,4);
}

function easeTo(howFarThroughEase){
  return Math.pow(howFarThroughEase,0.25);
}
