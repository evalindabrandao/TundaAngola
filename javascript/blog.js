
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('nav--scrolled', window.scrollY > 60));
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => { burger.classList.toggle('open'); mobileMenu.classList.toggle('open'); });

// Filtro sidebar
const filtros = document.querySelectorAll('.filtro-pill');
const artigos = document.querySelectorAll('.artigo-linha');
filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        filtros.forEach(b => b.classList.remove('filtro-pill--active'));
        btn.classList.add('filtro-pill--active');
        const cat = btn.dataset.cat;
        let count = 0;
        artigos.forEach(a => {
            const show = cat === 'todos' || a.dataset.cat === cat;
            a.style.display = show ? '' : 'none';
            if (show) { count++; a.querySelector('.artigo-linha__num').textContent = String(count).padStart(2, '0'); }
        });
    });
});

function handleNewsletter(e) {
    e.preventDefault();
    e.target.innerHTML = '<p style="color:var(--orange);font-size:0.88rem;font-weight:500;text-align:center;padding:8px 0">✓ Subscrito com sucesso!</p>';
}
