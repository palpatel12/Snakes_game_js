var blocksize=25;
var rows=20;
var cols=20;
var board;
var snake;
var food;
var context=[];
var snakeBody=[];

var snakeX=blocksize*5;
var snakeY=blocksize*5;

var snakeX;
var snakeY;

var velocityX=0;
var velocityY=0;

var foodX;
var foodY;

var score=0;
var gameOver=false;

window.onload=function(){
    board=document.getElementById("board");
    board.height=rows*blocksize;
    board.width=cols*blocksize;
    context=board.getContext("2d");

    // snakeStart();
    placeFood();
    document.addEventListener("keydown", changeDirection);
    document.getElementById("button").addEventListener("click",function(){
        window.location.reload();
    })
    setInterval(update,100);
}

function update(){
    if(foodX==snakeX && foodY==snakeY)
    {
        snakeBody.push([foodX,foodY]);
        placeFood();
        document.getElementById("Score1").innerText=++score;
    }

    context.fillStyle="#181825";
    context.fillRect(0,0,board.width,board.height);

    // context.strokeStyle="#222738";
    // for (var x = 0; x < rows*blocksize; x += blocksize) {
    //     for (var y = 0; y < cols*blocksize; y += blocksize) {
    //        context.strokeRect(x, y, blocksize, blocksize); 
    //     }
    // }

    context.fillStyle="red";
    context.shadowBlur=10;
    context.shadowColor="#FFF";
    context.fillRect(foodX,foodY,blocksize,blocksize);

    for(let i=snakeBody.length-1;i>0;i--)
    {
        snakeBody[i]=snakeBody[i-1];
    }

    if(snakeBody.length)
    {
        snakeBody[0]=[snakeX,snakeY];
    }

    context.fillStyle="lime";
    snakeX+=velocityX*blocksize;
    snakeY+=velocityY*blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
    for(let i=0;i<snakeBody.length;i++)
    {
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize);
    }

    if(snakeX<0 || snakeX>(rows*blocksize)-blocksize || snakeY<0 || snakeY>(cols*blocksize)-blocksize)
    {
        gameOver=true;
        window.location.reload();
    }

    for(let i=0;i<snakeBody.length;i++)
    {
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1])
        {
            gameOver=true;
            window.location.reload();
        }
    }
}

function changeDirection(e){

    //  console.log(e.code);

    document.body.classList.add("disable-scrolling");

    if(e.code=="ArrowUp" || e.code=="KeyW" && velocityY!=1)
    {
        velocityX=0;
        velocityY=-1;
    }

    else if(e.code=="ArrowDown" || e.code=="KeyS" && velocityY!=-1)
    {
        velocityX=0;
        velocityY=1;
    }

    else if(e.code=="ArrowLeft" || e.code=="KeyA" && velocityX!=1)
    {
        velocityX=-1;
        velocityY=0;
    }

    else if(e.code=="ArrowRight" || e.code=="KeyD" && velocityX!=-1)
    {
        velocityX=1;
        velocityY=0;
    }
}


function placeFood()
{
    foodX=Math.floor(Math.random()*cols)*blocksize;
    foodY=Math.floor(Math.random()*rows)*blocksize;
    
    for(let i=0;i<snakeBody.length;i++)
    {
        if(foodX==snakeBody[i][0] && foodY==snakeBody[i][1])
        {
            placeFood();
        }
    }
}

// function snakeStart()
// {
//     snakeX=Math.floor(Math.random()*cols)*blocksize;
//     snakeY=Math.floor(Math.random()*rows)*blocksize;
// }

//#181825
//#222738
//#FF3D02
//#FFFFFF
//#6E7888











