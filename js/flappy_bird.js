const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeDown = new Image();

bird.src = "img/flappy_bird_bird.png"
bg.src = "img/flappy_bird_bg.png"
fg.src = "img/flappy_bird_fg.png"
pipeUp.src = "img/flappy_bird_pipeUp.png"
pipeDown.src = "img/flappy_bird_pipeBottom.png"

const GAP = 90;
const GRAVITY = 1.5;
const X_SPEED = 1;
const SCORE_THR = 5;
const NEW_PIPE_THR = 125;


let stopFlag = false;
let xPos = 10;
let yPos = 150;
let score = 0;
let pipes = [];

pipes.push({
    x: cvs.width,
    y: 0
})

document.addEventListener("keydown", moveUp);

function moveUp(event) {
    if (event.keyCode === 27)
        stopFlag = true;
    yPos -= 30; 
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipes.length; i++) {

        ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeDown, pipes[i].x, pipes[i].y + pipeUp.height + GAP);
        pipes[i].x -= X_SPEED;
        birdDead(pipes[i]);
        if (SCORE_THR - X_SPEED < pipes[i].x && pipes[i].x <= SCORE_THR) {
            score++;
        }

        if (NEW_PIPE_THR - X_SPEED < pipes[i].x && pipes[i].x <= NEW_PIPE_THR) {
            pipes.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }
    }

    pipes = pipes.filter(pipe => pipe.x >= -pipeUp.width);
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPos, yPos);

    yPos += GRAVITY;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText(score, 10, cvs.height - 20);

    if (!stopFlag)
        requestAnimationFrame(draw);
}

function birdDead(pipe) {
    if (
        xPos + bird.width >= pipe.x &&
        xPos <= pipe.x + pipeUp.width &&
        (
            yPos <= pipe.y + pipeUp.height ||
            yPos + bird.height >= pipe.y + pipeUp.height + GAP
        ) ||
        yPos + bird.height >= cvs.height - fg.height
    ) {
        stopFlag = true
        location.reload()
    }
}
pipeDown.onload = draw;
