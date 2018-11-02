// Global variables for screen dimension
const maxY = 500, maxX= 800;
const minY = 0, minX = 0;
const bg = new Image();
bg.src = "stars.jpeg";

function initializeCanvas() {
    var canvas = document.getElementById("screen");
    var context = canvas.getContext("2d");
    var clicked = false;
    
    function animate(){
        console.log("Initializing");
        context.save();
        context.clearRect(0, 0, 800, 500); 
        context.font = "60px Arial";
        context.textAlign = "center";
        context.strokeStyle = "white";
        context.strokeText("Click to Start or Hit Enter", canvas.width/2, canvas.height/2);
        context.restore();
    }
    
    animate();
    
    document.addEventListener('keydown', function(event){
        if (event.keyCode == '13'){
            if(!clicked){
                draw();
                clicked = true;
            }
        }
    });
    document.getElementById("screen").addEventListener("click", function() {
        console.log("clicked");
        if(!clicked){
            draw();
            clicked = true;
        }
    });
}

function handleDirection(direction, dir, object){
    switch (direction){
        case "left":
            if (dir) object.y -= 5;
            else object.y += 5;
            object.x -=5;
            break;
        case "right":
            if (dir) object.y -= 5;
            else object.y += 5;
            object.x += 5;
            break;
        case "middle":
            if (dir) object.y -= 5;
            else object.y += 5;
            break;
    }
}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.playedOnce = false;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    } 
}


function draw() {
    var canvas = document.getElementById("screen");
    var context = canvas.getContext("2d");
    
    // how much space the player can move per click
    const dist = 100;
    // up or down
    var dir = false;
    // x direction
    var direction = "middle";
    var middleCounter = 0;
    // where the collisions could happen
    const outsideRange = 70;
    const insideRange = 25;
    
    var gameOver = false;
    
    function Background() {
        this.x = 0;
        this.y = 0;
        this.w = bg.width;
        this.h = bg.height;
        this.render = function () {
            context.drawImage(bg, this.x--, 0);
            if(this.x <= -499){
                this.x = 0;
            }
        }
    }
    
    function Score(){
        this.score = 0;
        this.end = "Game Over!";
        this.increaseScore = function(){
            this.score++;
        } 
        this.render = function() {
            context.font = "30px Arial";
            context.strokeStyle = "white";
            context.strokeText("Score: " + this.score, 25, 30);
        }
        this.endGame = function() {
            context.font = "60px Arial";
            context.textAlign = "center";
            context.strokeStyle = "white";
            context.strokeText(this.end, canvas.width/2, canvas.height/2);
        }
        this.hitEnter = function() {
            context.font = "40px Arial";
            context.textAlign = "center";
            context.fillStyle = "red";
            context.fillText("Press Enter or Click to Play Again", canvas.width/2, canvas.height/2 + 150);
        }
        this.endScore = function() {
            context.font = "40px Arial";
            context.textAlign = "center";
            context.strokeStyle = "white";
            context.strokeText("Score: " + this.score, canvas.width/2, canvas.height/2 + 75);
        }
    }
    
    function Pong(){
        this.x = parseFloat((Math.random() * 750).toFixed(0));
        this.y = parseFloat((Math.random() * 100).toFixed(0));
        this.render = function() {
            //console.log(this.y);
            context.fillStyle = "white";
            context.beginPath();
            context.arc(this.x,this.y,25,0,2*Math.PI);
            context.closePath();
            context.fill();
            //console.log("Pong: " + this.x + " " + this.y)
        }
    }
    
    function Player(){
        this.x = 400;
        this.y = 490;
        this.render = function() {
            context.fillStyle = "white";
            context.fillRect(this.x - 50, this.y, 100, 10);
            //console.log("Player: " + this.x + " " + this.y);
        }
    }
    
    // initialize our objects
    var background = new Background();
    var score = new Score();
    var pong = new Pong();
    var player = new Player();
    var sound = new Sound("ping_pong.wav");
    var paddle = new Sound("paddle.wav");
    var wallHit = new Sound("wallHit.wav");
    //console.log(dimension.keyX);\

    
    function animate() {
        
        context.save()
        context.clearRect(0, 0, 800, 500);
        background.render();
        pong.render();
        player.render();
        score.render();
        context.restore();
        // collision on left edge
        if ((pong.x >= player.x - outsideRange  && pong.x <= player.x - insideRange) 
            && pong.y >= player.y - insideRange){
            direction = "left";
            dir = true;
            score.increaseScore();
            sound.play();
        } 
        // collision on right edge
        else if ((pong.x <= player.x + outsideRange && pong.x >= player.x + insideRange) 
            && pong.y >= player.y - 25){
            direction = "right";
            dir = true;
            score.increaseScore();
            sound.play();
            
        } 
        // collision in the middle
        else if ((pong.x > player.x - insideRange && pong.x < player.x + insideRange) 
            && pong.y >= player.y - 25){
            direction = "middle"
            dir = true;
            middleCounter++;
            score.increaseScore();
            sound.play();
        } 
        // collision on top frame
        else if (pong.y <= minY){
            dir = false;
            paddle.play();
        } 
        // end game if it goes underneath 
        else if (pong.y > maxY){
            if(!wallHit.playedOnce) wallHit.play();
            wallHit.playedOnce = true;
            context.clearRect(0,0,800,500);
            background.render();
            score.endGame();
            score.hitEnter();
            score.endScore();
            gameOver = true;
            return;
        }
        
        handleDirection(direction, dir, pong);
        
        // Don't let the user bounce it in the middle infinitely
        if (direction == 'middle' && dir){
            //console.log(middleCounter)
            if (middleCounter == 2) {
                var leftRight = Math.round(Math.random());
                console.log(leftRight);
                if (leftRight == 1){
                    direction = "right";
                } else {
                    direction = "left";
                }
                middleCounter = 0;
            } 
        }
        
        // wrap the pong
        if (pong.x < minX){
            pong.x += maxX;
        } else if(pong.x > maxX){
            pong.x -= maxX;
        }
        // wrap the player
        if (player.x < minX){
            player.x += maxX;
        } else if(player.x > maxX){
            player.x -= maxX;
        }
    
        
        //console.log("X: "+player.x+" Y: "+player.y);
    }
    
    
    var animateInterval = setInterval(animate, 10);
    
    document.addEventListener('keydown', function(event){
        // right key
        if (event.keyCode == '39' && !gameOver){
            player.x += dist;
            //console.log(player.x)
        } 
        // left key
        else if (event.keyCode == '37' && !gameOver){
            player.x -= dist;
            //console.log(player.x)
        }
        // enter
        else if (event.keyCode == '13'){
            if(gameOver) location.reload();
        }
    });
    

    document.getElementById("screen").addEventListener("click", function(){
        if(gameOver) location.reload();
    });

    

    
   // console.log("Y: " + y, " X: " + x + " Mouse: " + dimension.keyX);
    
        
}

function initialize() {
    initializeCanvas();
}