// sketch.js

let anim;
let lineX = 100;
let lineX1 = 0;

let anim2;
let r = 255;
let g = 255;
let b = 255;


let anim3;
let re = 0;
let gr = 0;
let bl = 0; 
let t = 0;

let anim4;
let messagey = 300;
let messagey1 = 300;


function setup() {
  createCanvas(600, 600);
  anim = new AnimationTicker();
  anim.duration = 1000;
  anim2 = new AnimationTicker();
  anim2.duration = 1000;
  anim3 = new AnimationTicker();
  anim3.duration = 1000;
  anim4 = new AnimationTicker();
  anim4.duration = 3000;
  reset();
  textFont("Verdana");
}

function draw() {
  background(0);


  if (anim.isAnimating == true) {
    // things to do when we are animating

    anim.step();

    // this is where we compute the current value

    lineX = anim.linear(100,600);
  }

  if(anim2.isAnimating == true){
    anim2.step();
    r = anim2.easeInOutQuad(255,0);
    g = anim2.easeInOutQuad(255,0);
    b = anim2.easeInOutQuad(255,0);

  }


  if(anim3.isAnimating == true){
    anim3.step();

    re = anim3.easeInOutQuad(0,255);
    gr = anim3.easeInOutQuad(0,255);
    bl = anim3.easeInOutQuad(0,255);
    t = anim3.easeInOutQuad(0,255);

  }


  if(anim4.isAnimating == true){
    anim4.step();

    messagey = anim4.linear(300,100);
    messagey1 = anim4.linear(300,500);

  }



  let message = "split";
  fill(r,g,b);
  textSize(200);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  text(message, 300, 300);

 
  strokeWeight(20);
  line(0,310,lineX,310);

  let messageUp = "split";
  fill(re,gr,bl,t);
  textSize(200);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  text(messageUp, 300, messagey);


  let messageDown = "split";
  fill(re,gr,bl,t);
  textSize(200);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  text(messageDown, 300, messagey1);

}

function mousePressed() {
  // start the animation
  anim.start();
  anim2.start();
  anim3.start();
  anim4.start();
}

function reset() {
  lineX = 100;
  r = 255;
  g =255;
  b =255;
  re = 0;
  gr = 0;
  bl = 0; 
  t = 0;
  messagey = 300;
  messagey1 = 300;


}

function keyPressed() {
  // press "r" key, reset the start position
  if (key == "r") {
    reset();
  }
}


class AnimationTicker {
  constructor() {
    // Is the animation running?
    this.isAnimating = false;

    // t is a value 0-1 that indicates
    // how far the animation has progressed.
    this.t = 0.0;

    // When did the animation start?
    this.startTime = millis();

    // How many milliseconds will the animation run.
    this.duration = 2000;
  }

  start() {
    this.isAnimating = true;
    this.startTime = millis();
    this.t = 0.0;
  }

  step() {
    if (this.isAnimating == false) {
      return;
    }
    let currentMillis = millis();
    let timeElapsed = currentMillis - this.startTime;
    this.t = timeElapsed / this.duration;
    if (timeElapsed >= this.duration) {
      this.isAnimating = false;
      this.t = 1.0;
    }
  }

  // Use the current animation progress to interpolate
  // a value between start and stop values.
  linear(start, stop) {
    return map(this.t, 0.0, 1.0, start, stop);
  }

  easeInQuad(start, stop) {
    let tt = this.t * this.t;
    return map(tt, 0.0, 1.0, start, stop);
  }

  easeOutQuad(start, stop) {
    let tt = -(this.t * (this.t - 2.0));
    return map(tt, 0.0, 1.0, start, stop);
  }

  // Modeled after the piecewise quadratic
  // y = (1/2)((2x)^2)             ; [0, 0.5)
  // y = -(1/2)((2x-1)*(2x-3) - 1) ; [0.5, 1]
  easeInOutQuad(start, stop) {
    let tt = 0.0
    if (this.t < 0.5) {
        tt = 2.0 * this.t * this.t
    }
    else {
        tt = (-2.0 * this.t * this.t) + (4.0 * this.t) - 1.0;
    }
    return map(tt, 0.0, 1.0, start, stop);
  }
}




 




