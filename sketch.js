let xPos;
let yPos;
let cake;
let eye;
let candle;

let candies1 = [];
let candies2 = [];
let candies3 = [];

let x1;
let y1;

let flames = [];

function setup(){
  createCanvas(800,800);
  background(255);
  xPos = 100;
  yPos = height - 300;
  cake = new Cake(xPos, yPos);
  eye = new Eyes(xPos, yPos);
  candle = new Candle(xPos, yPos);

  for(let i = 0; i < 10; i++){
    x1 = random(240, 300);
    y1 = random(360, 450);
    candies1.push(new Candy1(x1, y1));
  }
  
  for(let i = 0; i < 10; i++){
    x1 = random(480, 560);
    y1 = random(360, 450);
    candies2.push(new Candy1(x1, y1));
  }
  


}


function draw(){
  // noStroke();
  // stroke(249,215,15);
  background(255);
  cake.show();
  eye.show();
  candle.show();
  for(let i = 0; i < 10; i++){
    candies1[i].show();
  }
  for(let i = 0; i < 10; i++){
    candies2[i].show();
  }
  
  let t = frameCount/60;

  if (frameCount%8 == 0){
    for(let i = 0; i < random(1); i++)
    {
      candies3.push(new Candy3(random(width), 0));
    }
  }

  if (frameCount%2 == 0) {
    let p = new Flame();
    flames.push(p);
  }
  for (let i = flames.length - 1; i >= 0; i--) {
    let f1 = flames[i];
    if(keyIsDown(LEFT_ARROW)){
      let wind = createVector(-0.2, 0);
      f1.applyForce(wind);
    }
    else if(keyIsDown(RIGHT_ARROW)){
      let wind = createVector(0.2, 0);
      f1.applyForce(wind);
    }

    f1.update();
    f1.show();
    if (f1.finished()) {
      flames.splice(i, 1);
    }
  }
  // fill(40, 25, 2);
  // rect(230, 390, 135, 20);
  
  
  
//  ------------------ Moving Candies -----------------
  for(let i = 0; i < candies3.length; i++){

    let c3 = candies3[i];
    let gravity = createVector(0, 0.2);
    
    if(keyIsDown(LEFT_ARROW)){
      let wind = createVector(-0.2, 0);
      c3.applyForce(wind);
    }
    else if(keyIsDown(RIGHT_ARROW)){
      let wind = createVector(0.2, 0);
      c3.applyForce(wind);
    }
    c3.applyForce(gravity);
    c3.update();
    c3.display();
  }
}

// ----------------------- Candies on Cake ------------------------------

class Candy1{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.r = random(360);
  }

  show(){
    push();
    translate(this.x, this.y);
    rotate(this.r);
    noStroke();
    fill(this.c);
    rect(0, 0, 6, 40, 10);
    pop();
  }
}

// ----------------------- Falling Candies ------------------------------

class Candy3{
  constructor(x, y){
    this.c = color(random(255), random(255), random(255));
    this.r = random(360);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
  }
  
  applyForce(f){
    let force = f.copy();
    // force.div(this.mass);
    this.acc.add(force);
  }
  
  update(){
    // this.y += 1;
    this.r += 0.01;
      
    // ACC -> VEL -> POS
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // ***

    if(this.y > height)
    {
      let index = candies3.indexOf(this);
      candies3.splice(index,1);
    }
  }

  display(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.r);
    noStroke();
    fill(this.c);
    rect(0, 0, 6, 40, 10);
    pop();
  }
}

// ----------------------- The Flame ----------------------------



class Flame {
  constructor() {
    // this.x = x;
    // this.y = y;
    this.x = random(370, 420);
    this.y = 230;
    // this.vx = random(-1, 1);
    // this.vy = random(-5, -1);
    this.pos = createVector(this.x, this.y);
    this.vel = createVector(random(-1, 1), random(-5, -1));
    this.acc = createVector();
    
    this.alpha = 255;
    this.d = 16;
  }
  
  applyForce(f){
    let force = f.copy();
    // force.div(this.mass);
    this.acc.add(force);
  }
  
  
  finished() {
    return this.alpha < 0;
  }

  update() {
    // this.x += this.vx;
    // this.y += this.vy;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // ***

    if(this.y < 0 || this.x < 0 || this.x > width)
    {
      let index = flames.indexOf(this);
      flames.splice(index,1);
    }
    
    this.alpha -= 3;
    this.d -= random(0.05, 0.1);
  }

  show() {
    noStroke();
    fill(random(200,230), random(50, 150), 10, this.alpha);
    ellipse(this.pos.x, this.pos.y, this.d);
  }
}




// ----------------------- The Drawing Part ----------------------------

class Candle{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  show(){
    fill(151, 194, 84);
    strokeWeight(5);
    stroke(116,147,68);
    rect(this.x + 240, this.y - 250, 100, 160, 20);
    
    stroke(116,147,68);
    strokeWeight(5);
    fill(151, 194, 84);
    ellipse(this.x + 290, this.y - 240, 100, 50);
    
    stroke(116,147,68);
    fill(116,147,68);
    rect(this.x + 287, this.y - 280, 6, 30, 10);
    
  }
  
  
}


class Eyes{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  show(){
    noStroke();
    //fill(255);
    
    fill(244,234,217);
    ellipse(this.x + 250, this.y + 50, 70, 70);
    ellipse(this.x + 330, this.y + 50, 70, 70);
    
    fill(91, 45, 24);
    ellipse(this.x + 250, this.y + 50, 45, 45);
    ellipse(this.x + 330, this.y + 50, 45, 45);
    
    //fill(134, 72, 38);
    stroke(134, 72, 38);
    noFill();
    strokeWeight(10);
    //curve(5, 26, 5, 26, 73, 24, 73, 61);
    curve(this.x + 250, this.y-20, this.x + 250, this.y + 110, this.x + 330, this.y + 110,this.x + 330, this.y-20);
  }
  
}

class Cake{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  show(){
  strokeWeight(10);
  stroke(173,126,65);
  fill(255);
  ellipse(this.x+300,this.y,100,100);
  //y += 1;
  
  beginShape();
  fill(221,170,87);
  curveVertex(this.x + 100, this.y + 110);
  curveVertex(this.x + 100, this.y + 110);
  curveVertex(this.x + 120, this.y + 140);
  curveVertex(this.x + 200, this.y + 160);
  curveVertex(this.x + 400, this.y + 160);
  curveVertex(this.x + 480, this.y + 140);
  curveVertex(this.x + 500, this.y + 110);
  curveVertex(this.x + 500, this.y + 110);
  endShape();
  
  beginShape();
  vertex(this.x + 100, this.y + 110);
  vertex(this.x + 100, this.y - 20);
  vertex(this.x + 500, this.y - 20);
  vertex(this.x + 500, this.y + 110);
  endShape();
  
  beginShape();
  stroke(99, 46, 4);
  strokeWeight(10);
  fill(134, 72, 38);
  curveVertex(this.x + 480, this.y); 
  curveVertex(this.x + 480, this.y);
  curveVertex(this.x + 380, this.y + 60); 
  curveVertex(this.x + 350, this.y); 
  curveVertex(this.x + 300, this.y - 20); 
  curveVertex(this.x + 250, this.y - 20); 
  curveVertex(this.x + 200, this.y);
  curveVertex(this.x + 140, this.y + 40);
  curveVertex(this.x + 120, this.y);
  curveVertex(this.x + 100, this.y - 20);
  curveVertex(this.x + 95, this.y - 40);
  curveVertex(this.x + 90, this.y - 70);
  curveVertex(this.x + 95, this.y - 100);
  curveVertex(this.x + 150, this.y - 150);
  curveVertex(this.x + 300, this.y - 180);
  curveVertex(this.x + 450, this.y - 150);
  curveVertex(this.x + 505, this.y - 100);
  curveVertex(this.x + 510, this.y - 70);
  curveVertex(this.x + 505, this.y - 40);
  curveVertex(this.x + 500, this.y - 20);
  curveVertex(this.x + 480, this.y);
  curveVertex(this.x + 480, this.y);
  endShape();
  }
}
