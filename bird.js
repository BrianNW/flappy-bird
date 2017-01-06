function Bird() {
  this.y = height/2;
  this.x = 64;
  
  this.gravity = 1;
  this.velocity = 0;
  
  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
    
  }
  
  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    
  }
  
}
