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

const gap = 90;

let stopFlag = false;

let pipes = [];

pipes.push({
    x: cvs.width,
    y: 0
})

let xPos = 10;
let yPos = 150;
let score = 0;

const gravity = 1.5;
const x_speed = 1;

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
        ctx.drawImage(pipeDown, pipes[i].x, pipes[i].y + pipeUp.height + gap);
        pipes[i].x -= x_speed;
        birdDead(pipes[i]);
        if (5 - x_speed < pipes[i].x && pipes[i].x <= 5) {
            score++;
        }

        if (125 - x_speed < pipes[i].x && pipes[i].x <= 125) {
            pipes.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }
    }

    pipes = pipes.filter(pipe => pipe.x >= -pipeUp.width);
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPos, yPos);

    yPos += gravity;

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
            yPos + bird.height >= pipe.y + pipeUp.height + gap
        ) ||
        yPos + bird.height >= cvs.height - fg.height
    ) {
        stopFlag = true
        location.reload()
    }
}
pipeDown.onload = draw;
