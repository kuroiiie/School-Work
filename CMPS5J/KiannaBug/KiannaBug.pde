class Bug{
  // fields
  float xpos;
  float ypos;
  float Xspeed;
  float Yspeed;
  color bodyColor;
  int state;


  // constructor
  Bug(float x, float y, int s){
    this.xpos = x;
    this.ypos = y;
    this.Xspeed = random (1,1.5);
    this.Yspeed = random (1,1.5);
    this.bodyColor = color(random(255),random(255),random(255));
    this.state = int(random(1,4));
  }
  
  // methods
  void crawl(){
    if (state == 1){
      xpos += Xspeed;
    }if (state == 2){
      xpos -= Xspeed;
    }if (state == 3){
      ypos += Yspeed;
    }if (state == 4){
      ypos -= Yspeed;
    }
    if (xpos>width+30)  xpos = -30;
    if (xpos<-30)       xpos = width+30;
    if (ypos>height+30) ypos = -30;
    if (ypos<-30)       ypos = height+30;
  }
  
  void display(){
    fill (bodyColor);
    stroke (0);
    if (state == 1 || state == 2){
      line (xpos,ypos-15,xpos,ypos+15);
      line (xpos+10,ypos-15,xpos+10,ypos+15);
      line (xpos-10,ypos-15,xpos-10,ypos+15);
      ellipse (xpos,ypos,30,20);
    }if (state == 3 || state == 4){
      line (xpos-15,ypos,xpos+15,ypos);
      line (xpos-15,ypos+10,xpos+15,ypos+10);
      line (xpos-15,ypos-10,xpos+15,ypos-10);
      ellipse (xpos,ypos,20,30);
    }
  }
  
  void squash(){
    if (mousePressed && mouseOn()) state = 0;
  }
  
  void runAway(){
    if (mousePressed && scared()){
      if (state == 1 || state == 2){
        Xspeed *= 1.5;
      }else if (state == 3 || state == 4){
        Yspeed *= 1.5;
      }
    }
  }
  
  boolean mouseOn(){
    return ((this.xpos-15)<=mouseX) && (mouseX<=(this.xpos+15)) && ((this.ypos-15)<=mouseY) && (mouseY<=(this.ypos+15)) && (state == 1 || state == 2 || state == 3 || state == 4);
  }
  
  boolean scared(){
    return ((this.xpos-30)<=mouseX) && (mouseX<=(this.xpos+30)) && ((this.ypos-30)<=mouseY) && (mouseY<=(this.ypos+30));
  }
}
