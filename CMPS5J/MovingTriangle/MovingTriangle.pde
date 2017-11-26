int x1 = 0;
int y1 = 0;
int x2 = 400;
int y2 = 400;
int x3 = 0;
int y3 = 400;


int speed = 3;

int state = 0; 


void setup() {
  size(400, 400);
}

void draw() {
  background(0, 255, 0);
  stroke(0);
  fill(255, 0, 255);
  triangle(x1, y1, x2, y2, x3, y3);

  if (state == 0) {       
    x1 += speed;
    if (x1 > width) {    
      x1 = width;
      state = 1;
    }
  }
  if (state == 1) {    
    y3 -= speed;
    if (y3 < 0) {   
      y3 = 0;
      state = 2;
    }
  }
  if (state == 2) {        
    x2 -= speed;
    if (x2 < 0) {    
      x2 = 0;
      state = 3;
    }
  }
  if (state == 3) {    
    y1 += speed;
    if (y1 > height) {   
      y1 = height;
      state = 4;
    }
  }
  if (state == 4) {    
    x3 += speed;
    if (x3 > width) {   
      x3 = width;
      state = 5;
    }
  }
  if (state == 5) {    
    y2 -= speed;
    if (y2 < 0) {   
      y2 = 0;
      state = 6;
    }
  }
  if (state == 6) {    
    x1 -= speed;
    if (x1 < 0) {   
      x1 = 0;
      state = 7;
    }
  }
  if (state == 7) {    
    y3 += speed;
    if (y3 > height) {   
      y3 = height;
      state = 8;
    }
  }
  if (state == 8) {    
    x2 += speed;
    if (x2 > width) {   
      x2 = width;
      state = 9;
    }
  }
  if (state == 9) {    
    y1 -= speed;
    if (y1 < 0) {   
      y1 = 0;
      state = 10;
    }
  }
  if (state == 10) {    
    x3 -= speed;
    if (x3 < 0) {   
      x3 = 0;
      state = 11;
    }
  }
  if (state == 11) {   
    y2 += speed;
    if (y2 > height) {   
      y2 = height;
      state = 0;
    }
  }
}
  void mousePressed() {
    if (speed == 3)
      speed = 0;
    else if (speed == 0)
      speed = 3;
  }

