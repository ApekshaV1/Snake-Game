// canvas 18x18 square--> matrix of 18 row and 18 column board[x][y]
// going up is negative for y axis(y-1) and going down is positive for y axis(y+1)
// similarly going right is positive for x axis(x+1) and going left is negative for x axis(x-1)
// we multiply the coordinates with the box size to locate the food because it will not understand the [1][1] index 

//board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Snake head
var snakeX= blocksize*5;
var snakeY= blocksize*5;

velocityX=0;
velocityY=0;

var snakeBody =[];

gameOver=false;

//Food
var foodX ;
var foodY ;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows*blocksize;
    board.width = cols*blocksize;
    context = board.getContext("2d");   //used for drawing on the board

    placefood();
    document.addEventListener("keyup", changeDirection);  //this will listen the arrow keys and will call the function changeDirection
    //update();
    setInterval(update, 3000/10); //100 milliseconds
}

function update(){

    if(gameOver){
        return;
    }

    context.fillStyle="black";  //drawing the board
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";   //drawing the snake
    context.fillRect(foodX,foodY,blocksize,blocksize);

    if(snakeX == foodX && snakeY == foodY){  //to check and make the snake eat food
        snakeBody.push([foodX,foodY]);
        placefood();

    }

    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";   //drawing the snake
    snakeX +=velocityX*blocksize;
    snakeY +=velocityY*blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }  
    
    //game over conditions
    if(snakeX < 0|| snakeX >cols*blocksize || snakeY < 0|| snakeY > rows*blocksize){
        gameOver = true;
        alert("Game Over");
    }

    for(let i=0; i<snakeBody.length; i++){

        if(snakeX ==  snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("GameOver");

        }
    }

}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY !=1){
        velocityX=0;
        velocityY=-1;

    }
    else if(e.code == "ArrowDown" && velocityY !=-1){
        velocityX=0;
        velocityY=1;
        
    }
    else if(e.code == "ArrowLeft" && velocityY !=1){
        velocityX=-1;
        velocityY=0;
        
    }
    else if(e.code == "ArrowRight" && velocityY !=-1){
        velocityX=1;
        velocityY=0;
        
    }
}

function placefood(){
    //(0-1)*cols -> (0-19.999) -> (0-10)*25
    foodX = Math.floor(Math.random()*cols)*blocksize;
    foodY = Math.floor(Math.random()*rows)*blocksize;
}

