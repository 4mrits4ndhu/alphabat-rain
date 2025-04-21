const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let letters = [];
let speed = 2;
let score = 0;
let gameOver = false;

function createLetter() {
    const x = Math.random() * canvas.width;
    const letter = {
        x: x,
        y: 0,
        char: String.fromCharCode(65 + Math.floor(Math.random() * 26))
    };
    letters.push(letter);
}

function updateLetters() {
    letters.forEach(letter => {
        letter.y += speed;
        if (letter.y >= canvas.height) {
            gameOver = true;
        }
    });
    letters = letters.filter(letter => letter.y < canvas.height);
}

function drawLetters() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    ctx.font = '30px Arial';
    letters.forEach(letter => {
        ctx.fillText(letter.char, letter.x, letter.y);
    });
}

function handleKeyPress(event) {
    const typedChar = event.key.toUpperCase();
    letters = letters.filter(letter => {
        if (letter.char === typedChar) {
            score++;
            return false;
        }
        return true;
    });
}

document.addEventListener('keydown', handleKeyPress);

function gameLoop() {
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFF';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        ctx.fillText(`Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2 + 60);
        return;
    }
    updateLetters();
    drawLetters();
    speed += 0.001; // Increase speed gradually
    requestAnimationFrame(gameLoop);
}

setInterval(createLetter, 1000);
gameLoop();
