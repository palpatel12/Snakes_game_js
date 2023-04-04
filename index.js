//board variables
var blockSize=25;
var rows=20;
var cols=20;
var board;
var context;

//snake
//snake head
var snakeX=blockSize*5;
var snakeY=blockSize*5;

//velocity varialbles to show growth of snake
var velocityX=0;
var velocityY=0;

//snake body
var snakeBody=[];

//food
var foodX; // no need to initialize it after we create the function to place food
var foodY;  

//gameover
var gameOver=false;

//score
var score=0;

window.onload=function(){
    //selecting the board canvas
    board=document.getElementById("board");
    //asigning height and width to canvas 
    board.height=rows*blockSize;
    board.width=cols*blockSize;
    context=board.getContext("2d");//used for drawing on the board

    placeFood();// to generate random location to place food
    document.addEventListener("keyup",changeDirection);
    //update();
    setInterval(update,1000/5);//to call update function every 200ms so that the snakes fell like moving
}

//update() function to draw the canvas
function update(){
    //stop updating when gameover
    if(gameOver){
        return;
    }
    //update score
    document.getElementById('score').innerHTML = score;

    //for canvas
    context.fillStyle="black";
    context.fillRect(0,0,board.height,board.width);//(20*25)=500 by 500 canvas created


    //for food
    context.fillStyle="red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    //for snake body
    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY]);//pushing food location in array(to use it further) 
        //place new food
        placeFood();
        score+=1;
    }

    //to keep moving snakes contionously we make them follow thier previous location
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    //updating head
    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }
    //for head
    context.fillStyle="lime";
    snakeX+=velocityX*blockSize;
    snakeY+=velocityY*blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);

    //to update food body to location where it ate the food
    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize)
    }


    //game over condition
    //condtion1 when it goes out of box
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }
    //condition2 when the snakes hits its own body
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}


//function for placing food at random location
function placeFood(){
    //Math.random-return random no. between 0-1
    //when we multiply it by rows or col we get random no. between 0-19.9999
    //then we take its floor value to get a no. between 0-19
    //then we muliply it by blockSize to get the box 
    foodX=Math.floor(Math.random()*cols)*blockSize;
    foodY=Math.floor(Math.random()*rows)*blockSize;
}

//function to change Direction of snake
function changeDirection(e){
    //e.code-detects arrow keys movement
    //velocityY!=1
    //second condition in the code is to prevent the user from pressing opposite direction
    //when the snake is moving in a certain way
    if(e.code=="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.code=="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    if(e.code=="ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    if(e.code=="ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
}

//reload page 
function reloadfunc(){
    window.location.reload();
}