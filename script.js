
function Pipe() {
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x = width;
  this.w = 20;
  this.speed = 2;  //adjust for speed of pipe draw
  
  this.highlight = false;  //collision
  
  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) { //if bird is less than top or greater than bottom pipe
      if (bird.x > this.x && bird.x < this.x + this.w) {
       this.highlight = true;  //returns true when collision happens
        return true;
        
      }
      this.highlight = false;  
      return false;
    
      
    }
    
  }

  
  this.show = function() { //this determines length,color of pipes
    fill(255);
    
    if (this.highlight) {  //hit on pipe highlights red
      fill(255,0 ,0)
    }
    
    rect(this.x, 0, this.w, this.top)
    rect(this.x, height-this.bottom, this.w, this.bottom)
    
  }
  this.update = function() {
    this.x -= this.speed;
  }
  
  this.offscreen = function() {
    if(this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
} // END OF PIPE FUNCTION



function Bird() {  //size of bird
  this.y = height/2;
  this.x = 64;
  
  this.gravity = 0.6; //calculates gravity
  this.lift = -15; //bounce factor
  this.velocity = 1; //speed of drop
  
  this.show = function() { //description of bird
    fill(255);
    ellipse(this.x, this.y, 32, 32);
    
  }
  
  this.up = function() { //will make bird bounce vs velocity/gravity
    this.velocity += this.lift;
    
  }
  
  this.update = function() { //calculates force of gravity due to velocity
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    
    if (this.y > height) { //if bird hits bottom, it stays bottom
      this.y = height;
      this.velocity = 0;
    } 
    
  }
} //END OF BIRD FUNCTION

//START OF P5.JS
var bird;
var pipes= [];  //declaring pipe array

function setup() {  //p5 canvas
  createCanvas(400,600);
  bird = new Bird();  //bird constructor
  pipes.push(new Pipe()); //pipe constructor pushes end of array
  
}

function draw() {  //functions for bird
  background(0);
  
  
  for (var i = pipes.length-1; i>= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    
    if (pipes[i].hits(bird)){
      
    }
    
    if (pipes[i].offscreen()) {  //if pipes go offscreen, splice/removes pipe
      pipes.splice(i, 1); 
    }
  }
  
  bird.show();
  bird.update();
  
  if (frameCount % 100 == 0) {
     pipes.push(new Pipe());
    
  }
  
  
  
}

function keyPressed() {  //will make bird bounce if spacebar is pressed
  if (key === ' '){
    bird.up();
    //console.log("SPACE");
  }
}