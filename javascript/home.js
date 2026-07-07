
// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
});

// Mobile burger
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

// FAQ accordion
document.querySelectorAll('.faq__item').forEach(item => {
    item.addEventListener('toggle', () => {
        document.querySelectorAll('.faq__item[open]').forEach(open => {
            if (open !== item) open.removeAttribute('open');
        });
    });
});
