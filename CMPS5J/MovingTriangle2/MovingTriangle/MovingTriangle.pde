// CMPS 5J
// Christopher Huynh
// pa8
// MovingTringle.pde

// declare and initialize variables

int x1 = 0;  
int y1 = 0;  
int x2 = 400;
int y2 = 400;
int x3 = 0;
int y3 = 400;
int speed = 3;  

int state1 = 0;  // "state" of 1st corner
int state2 = 2;  // "state" of 2nd corner
int state3 = 3;  // "state" of 3rd corner

// setup window size and match program framerate to example

void setup() {
  size(400, 400);
  frameRate(58.5);
}


void draw() {
// redraws background and triangle
  background(0,255,0);

  // Display the triangle
  stroke(0);
  fill(255,0,255);
  triangle(x1, y1, x2, y2, x3, y3);

  // change position, change state if necessary
  if (state1 == 0 && state2==2 && state3==3) {        
    x1 += speed;
    if (x1 > width) {   
      x1 = width;
      state1 = 1;
    }
  }
  if (state1 ==1 && state2==2 && state3==3) {
    y3 -= speed;
    if (y3 < 0) {
      y3 = 0;
      state3 = 0;
    }
  }
  if (state1 == 1 && state2 ==2 && state3==0) {
    x2 -= speed;
    if (x2 < 0) {
      x2 = 0;
      state2 = 3;
    }
  }
  if (state1 ==1 && state2 ==3 && state3==0){
    y1 += speed;
    if (y1 > height){
      y1 = height;
      state1 = 2;
    }
  }
    if (state3 == 0 && state1==2 && state2==3) {        
    x3 += speed;
    if (x3 > width) {   
      x3 = width;
      state3 = 1;
    }
  }
  if (state3 ==1 && state1==2 && state2==3) {
    y2 -= speed;
    if (y2 < 0) {
      y2 = 0;
      state2 = 0;
    }
  }
  if (state3 == 1 && state1 ==2 && state2==0) {
    x1 -= speed;
    if (x1 < 0) {
      x1 = 0;
      state1 = 3;
    }
  }
  if (state3 ==1 && state1 ==3 && state2==0){
    y3 += speed;
    if (y3 > height){
      y3 = height;
      state3 = 2;
    }
  }
    if (state2 == 0 && state3==2 && state1==3) {       
    x2 += speed;
    if (x2 > width) {    
      x2 = width;
      state2 = 1;
    }
  }
  if (state2 ==1 && state3==2 && state1==3) {
    y1 -= speed;
    if (y1 < 0) {
      y1 = 0;
      state1 = 0;
    }
  }
  if (state2 == 1 && state3 ==2 && state1==0) {
    x3 -= speed;
    if (x3 < 0) {
      x3 = 0;
      state3 = 3;
    }
  }
  if (state2 ==1 && state3 ==3 && state1==0){
    y2 += speed;
    if (y2 > height){
      y2 = height;
      state2 = 2;
    }
  }
}

// stop triangle moving when mouse clicked

void mousePressed() {
  if (speed == 3){
  speed = 0;
  } else {
  speed = 3;
  }
}
