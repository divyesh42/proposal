const title = document.querySelector('h1');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const responseText = document.getElementById('responseText');
const gif = document.querySelector('.gif');
const hoverSound = document.getElementById('hoverSound');
const yesSound = document.getElementById('yesSound');
const noSound = document.getElementById('noSound');
const hesitationSound = document.getElementById('hesitationSound');

let hesitationInterval = null;

window.addEventListener('load', () => {
    hesitationInterval = setInterval(() => {
        hesitationSound.play();
    }, 4000);
});

yesBtn.addEventListener('click', () => {
    clearInterval(hesitationInterval);
    hesitationSound.pause();
    hesitationSound.currentTime = 0;
    yesSound.play();
});

noBtn.addEventListener('click', () => {
    clearInterval(hesitationInterval);
    hesitationSound.pause();
    hesitationSound.currentTime = 0;
    noSound.play();
});

yesBtn.addEventListener('click', () => {
    responseText.textContent = 'Yayyyy! I love you too, Niyupop! 14th Feb Dinner@8? 💖 💞';
    gif.src = 'https://c.tenor.com/bGpXSx4Uj0MAAAAM/cute-happy.gif';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    title.style.color = 'transparent';
    title.style.height = '0';
    title.style.margin = '0';
});

yesBtn.addEventListener('click', () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// noBtn.addEventListener('click', () => {
//     responseText.textContent = 'НNo? Alright then, but you’re still my Valentine anyway! 🤭';
//     gif.src = 'https://i.pinimg.com/originals/3e/47/7e/3e477e83c35e2a7a38f19ccdad163faa.gif';
//     yesBtn.style.display = 'none';
//     noBtn.style.display = 'none';
//     title.style.display = 'none';
// });

// hearts animation

// canvas setup
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// arrays
const hearts = [];
const stars = [];

// mouse = hearts ❤️
document.addEventListener('mousemove', (e) => {
    const heart = new Heart();
    heart.x = e.clientX;
    heart.y = e.clientY;
    heart.size = 10;
    heart.speed = 1;
    hearts.push(heart);
});

// ❤️ Heart class (cursor trail)
class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#ff6f61' : '#ff3b2f';
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 4, this.x - this.size, this.y + this.size / 2, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 2, this.x + this.size / 2, this.y - this.size / 4, this.x, this.y);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -50;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

// ⭐ Star class (background)
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 2;   // ⬅️ bigger
        this.speed = Math.random() * 0.4 + 0.2;
        this.alpha = Math.random();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${this.alpha})`;
        ctx.shadowBlur = 10;                 // ⬅️ glow
        ctx.shadowColor = 'gold';
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}


function initStars() {
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }
}

// animate
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => star.update());
    hearts.forEach(heart => heart.update());
    requestAnimationFrame(animate);
}

// start
initStars();
animate();

// resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 🔊 sounds
yesBtn.addEventListener('mouseenter', () => hoverSound.play());
noBtn.addEventListener('mouseenter', () => hoverSound.play());
yesBtn.addEventListener('click', () => yesSound.play());
noBtn.addEventListener('click', () => noSound.play());

