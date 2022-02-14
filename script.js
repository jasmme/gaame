let w = window.innerWidth;
let h = window.innerHeight;
//declare an object
let player = new jumper();
//variable to store collision
let hit = false
//declare obstacle
let block = new obstacle()
//life counter
let lives = 3
let bg
let fire_img

function Enter() {
  location.href = "Game.html"
  console.log("teleporting you to the game~")
}

function setup() {
  createCanvas(w,h)
  bg = loadImage('background.png')
  fire_img = loadImage('fireball.png')
}

function draw() {
    clear()  //clear canvas
    background(bg)
    player.show()
    player.update()
    block.update()
    block.show()

    //if blocks hit, then they are hitting
  hit = collideRectRect(player.x, player.y, 50, 50, block.x, block.y, block.width, block.height)

    //clear the screen

    //label for lives
  
  document.getElementById("score").innerHTML = "lives: " + lives
  //let h5 = createElement('h1', 'number of lives: ' + lives);
  //h5.style('color', '#00a1d3');
  //h5.position(0, 0);

  if (hit === true){
    console.log("hit")
    //take away one life if there's a collision
    lives -= 1
    //prove that lives are being taken
    console.log(lives)

    //reset if die
    player.x = 0
    player.y = 0
    //reset the block position
    block.x = w
    block.y = h/2

    //end the game if lives are zero
    if (lives === 0 ){
      noLoop();
    }
  }

    
        /****LEFT AND RIGHT KEYS *****/
        if (keyIsDown(65)) {
            player.x -= 10
        }
        if (keyIsDown(68)) {
            player.x += 10
        }

    //call the show of the block
    
    //console.log(block.x)
}
//now we build the jumper object
function jumper() {
    //starting x and y position for our player
    this.x = 0
    this.y = 0
    //apply the force of gravity
    this.gravity = 0.5
    //apply opposing force of gravity
    this.lift = -10
    //current velocity of our player
    this.velocity = 0
    //build a show function to show the object on the canvas
    this.show = function() {
        fill(color('red'))
        rect(this.x,this.y,50,50)
    }
    //build a jump function
    this.jump = function() {
        //take the initial velocity and modify it by the lift
        this.velocity += this.lift;
    }
    //build a function that will update itself in the draw function
    this.update = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.velocity *= 0.9; //air resistance
        //stop the jumper from going through the floor
        if ((this.y > h - 50) || (this.y < 0)) {
            this.y = h-50
            this.velocity = 0
        }
    }
   
}

/******** BUILD OBSTACLE OBJECT **********/
function obstacle() {
   //starting x and y position for our player
   this.x = 1000
   this.y = 0
   //apply the force of gravity
   this.gravity = 2
   //apply opposing force of gravity
   this.lift = -10
   //current velocity of our player
   this.velocity = 0
   //set the width and height of the thing at long fucking last
   this.width = 50
   this.height = 200
   //build a show function to show the object on the canvas
   this.show = function() {
     image(fire_img, this.x, this.y, this.width, this.height)
      //fill(color('black'))
      //rect(this.x,this.y,this.width,this.height)
   }

   //build a function that will update itself in the draw function
   this.update = function() {
    this.velocity += this.gravity;
    this.x -= this.velocity;
    this.velocity *= 0.4; //speed at which the blocks move
    //stop the obstacle from going through the floor
    if (this.x < 50) {
      this.x = w
      this.y = random(50,h-50)
      this.velocity = 0
    }
   }
  
}





/*************************************** */
function keyPressed() {
    if (keyCode === 32) {
        player.jump();
    }
}




