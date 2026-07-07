
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => { burger.classList.toggle('open'); mobileMenu.classList.toggle('open'); });

// Bússola a rodar lentamente
const compass = document.getElementById('compass');
let angle = 0;
setInterval(() => {
    angle += 0.4;
    compass.style.transform = `rotate(${angle}deg)`;
}, 16);
