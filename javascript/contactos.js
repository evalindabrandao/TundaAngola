    
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('nav--scrolled', window.scrollY > 60));
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => { burger.classList.toggle('open'); mobileMenu.classList.toggle('open'); });
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'flex';
});

