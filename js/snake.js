let canvas=document.getElementById("snakeCanvas");

let ctx=canvas.getContext("2d");

let snake=[{x:150,y:150}];

let dx=10;
let dy=0;

function startSnake(){

setInterval(draw,100);

}

function draw(){

ctx.clearRect(0,0,300,300);

snake.forEach(part=>{

ctx.fillStyle="#E6D3A3";

ctx.fillRect(part.x,part.y,10,10);

});

snake[0].x+=dx;
snake[0].y+=dy;

}
