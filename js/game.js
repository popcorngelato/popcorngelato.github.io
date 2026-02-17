/* =========================
   GLOBAL GAME STATE MANAGER
========================= */

let currentGame = null;

/* stop semua loop / timer */
function stopAllGames(){

    /* stop memory timer */
    if(timerInterval){
        clearInterval(timerInterval);
        timerInterval = null;
    }

}

/* switch game tanpa bug */
function showGame(game){

    if(currentGame === game) return;

    stopAllGames();

    document.getElementById("snakeGame").style.display="none";
    document.getElementById("tttGame").style.display="none";
    document.getElementById("memoryGame").style.display="none";

    currentGame = game;

    if(game==="snake"){
        document.getElementById("snakeGame").style.display="block";
        resetGame();
    }

    if(game==="ttt"){
        document.getElementById("tttGame").style.display="block";
        initBoard();
    }

    if(game==="memory"){
        document.getElementById("memoryGame").style.display="block";
        initMemory();
    }

}


/* =========================
   SNAKE GAME
========================= */

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 15;
let count = 0;
let speed = 10;

let snake;
let apple;
let score;
let ateApple;

let highscore = localStorage.getItem("snakeHighscore") || 0;
document.getElementById("highscore").innerText = highscore;


function initSnake(){

    snake = {
        x:150,
        y:150,
        dx:grid,
        dy:0,
        cells:[],
        maxCells:1
    };

    apple = {
        x:90,
        y:90
    };

    score = 0;
    speed = 10;

    document.getElementById("score").innerText=score;

}


function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}


function gameLoop(){

    requestAnimationFrame(gameLoop);

    if(currentGame !== "snake") return;

    if(++count < speed) return;

    count=0;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ateApple = false;

    snake.x+=snake.dx;
    snake.y+=snake.dy;

    if(snake.x<0) snake.x=canvas.width-grid;
    if(snake.x>=canvas.width) snake.x=0;
    if(snake.y<0) snake.y=canvas.height-grid;
    if(snake.y>=canvas.height) snake.y=0;

    snake.cells.unshift({x:snake.x,y:snake.y});

    if(snake.cells.length>snake.maxCells){
        snake.cells.pop();
    }

    ctx.fillStyle="red";
    ctx.fillRect(apple.x,apple.y,grid-1,grid-1);

    ctx.fillStyle="#00ff88";

    snake.cells.forEach(function(cell,index){

        ctx.fillRect(cell.x,cell.y,grid-1,grid-1);

        if(cell.x===apple.x && cell.y===apple.y && !ateApple){

            ateApple = true;

            snake.maxCells++;

            score++;

            document.getElementById("score").innerText = score;

            if(score > highscore){

                highscore = score;

                localStorage.setItem("snakeHighscore", highscore);

                document.getElementById("highscore").innerText = highscore;

            }

            if(speed > 3){
                speed -= 0.15;
            }

            apple.x=getRandomInt(0,20)*grid;
            apple.y=getRandomInt(0,20)*grid;

        }

        for(let i=index+1;i<snake.cells.length;i++){

            if(cell.x===snake.cells[i].x && cell.y===snake.cells[i].y){

                resetGame();

            }

        }

    });

}

requestAnimationFrame(gameLoop);


function resetGame(){

    initSnake();

}


function setDirection(dir){

    if(currentGame !== "snake") return;

    if(dir==="left" && snake.dx===0){
        snake.dx=-grid;
        snake.dy=0;
    }

    if(dir==="right" && snake.dx===0){
        snake.dx=grid;
        snake.dy=0;
    }

    if(dir==="up" && snake.dy===0){
        snake.dy=-grid;
        snake.dx=0;
    }

    if(dir==="down" && snake.dy===0){
        snake.dy=grid;
        snake.dx=0;
    }

}


document.addEventListener("keydown",function(e){

    if(currentGame !== "snake") return;

    if(e.key==="ArrowLeft") setDirection("left");
    if(e.key==="ArrowRight") setDirection("right");
    if(e.key==="ArrowUp") setDirection("up");
    if(e.key==="ArrowDown") setDirection("down");

});

initSnake();


/* =========================
   TIC TAC TOE
========================= */

const board = document.getElementById("board");
const statusText = document.getElementById("tttStatus");

let cells=[];
let gameActive=true;

function initBoard(){

    board.innerHTML="";
    cells=[];

    for(let i=0;i<9;i++){

        let cell=document.createElement("div");

        cell.classList.add("cell");

        cell.dataset.index=i;

        cell.addEventListener("click",playerMove);

        board.appendChild(cell);

        cells.push("");

    }

    statusText.innerText="Your Turn (X)";

    gameActive=true;

}


function playerMove(e){

    if(currentGame !== "ttt") return;

    let index=e.target.dataset.index;

    if(!gameActive || cells[index]!="") return;

    cells[index]="X";

    e.target.innerText="X";

    if(checkWinner("X")){

        statusText.innerText="You Win!";
        gameActive=false;
        return;

    }

    if(cells.every(c=>c!="")){

        statusText.innerText="Draw!";
        gameActive=false;
        return;

    }

    setTimeout(comMove,400);

}


function comMove(){

    if(currentGame !== "ttt") return;

    let move=getBestMove();

    cells[move]="O";

    board.children[move].innerText="O";

    if(checkWinner("O")){

        statusText.innerText="Computer Wins!";
        gameActive=false;

    }

}


function getBestMove(){

    for(let i=0;i<9;i++){

        if(cells[i]==""){

            cells[i]="O";

            if(checkWinner("O")){
                cells[i]="";
                return i;
            }

            cells[i]="";

        }

    }

    for(let i=0;i<9;i++){

        if(cells[i]==""){

            cells[i]="X";

            if(checkWinner("X")){
                cells[i]="";
                return i;
            }

            cells[i]="";

        }

    }

    let empty=cells.map((v,i)=>v==""?i:null).filter(v=>v!=null);

    return empty[Math.floor(Math.random()*empty.length)];

}


function checkWinner(player){

    const combos=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return combos.some(combo =>
        combo.every(i=>cells[i]==player)
    );

}


/* =========================
   MEMORY GAME
========================= */

const memoryBoard = document.getElementById("memoryBoard");

let memoryCards=[];
let firstCard=null;
let secondCard=null;
let lockBoard=false;
let matchedPairs=0;
let moves=0;

let timer=0;
let timerInterval=null;
let gameStarted=false;

let bestTime = localStorage.getItem("memoryBestTime");

document.getElementById("bestTime").innerText =
bestTime ? bestTime : "--";


const images=[

"assets/images/story1.jpg",
"assets/images/story2.jpg",
"assets/images/story3.jpg",
"assets/images/story4.jpg",
"assets/images/photo-2.1.jpg",
"assets/images/photo-2.4.jpg",
"assets/images/photo-4.1.jpg",
"assets/images/photo-4.8.jpg"

];


function initMemory(){

    stopAllGames();

    memoryBoard.innerHTML="";

    memoryCards=[...images,...images];
    memoryCards.sort(()=>0.5-Math.random());

    firstCard=null;
    secondCard=null;
    lockBoard=false;
    matchedPairs=0;
    moves=0;

    timer=0;
    gameStarted=false;

    document.getElementById("moveCount").innerText=moves;
    document.getElementById("timer").innerText=timer;

    memoryCards.forEach(src=>{

        let card=document.createElement("div");
        card.classList.add("memory-card");

        let inner=document.createElement("div");
        inner.classList.add("memory-inner");

        let front=document.createElement("div");
        front.classList.add("memory-front");

        let back=document.createElement("div");
        back.classList.add("memory-back");

        let img=document.createElement("img");
        img.src=src;

        back.appendChild(img);

        inner.appendChild(front);
        inner.appendChild(back);

        card.appendChild(inner);

        card.addEventListener("click",flipCard);

        memoryBoard.appendChild(card);

    });

}


function flipCard(){

    if(currentGame !== "memory") return;

    if(lockBoard) return;
    if(this===firstCard) return;

    this.classList.add("flipped");

    if(!gameStarted){

        gameStarted=true;

        timerInterval=setInterval(()=>{

            timer++;
            document.getElementById("timer").innerText=timer;

        },1000);

    }

    if(!firstCard){

        firstCard=this;
        return;

    }

    secondCard=this;
    lockBoard=true;

    moves++;

    document.getElementById("moveCount").innerText=moves;

    checkMatch();

}


function checkMatch(){

    let img1=firstCard.querySelector("img").src;
    let img2=secondCard.querySelector("img").src;

    if(img1===img2){

        matchedPairs++;

        if(matchedPairs===images.length){

            stopAllGames();

            if(!bestTime || timer < bestTime){

                localStorage.setItem("memoryBestTime",timer);

                bestTime=timer;

                document.getElementById("bestTime").innerText=timer;

            }

            setTimeout(()=>{

                alert("Perfect! Time: "+timer+"s");

            },300);

        }

        resetFlip();

    }
    else{

        setTimeout(()=>{

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetFlip();

        },800);

    }

}


function resetFlip(){

    firstCard=null;
    secondCard=null;
    lockBoard=false;

}
