// Inicializa os ícones do Lucide
lucide.createIcons();

// --- Lógica do PDF Viewer ---
// Ajustado para refletir as 19 páginas do seu portfólio na pasta img/portfolio/
const pages = [
    "img/portfolio/1.jpg",  // Capa: Wesley Souza [cite: 1, 3]
    "img/portfolio/2.jpg",  // Sobre Mim [cite: 8]
    "img/portfolio/3.jpg",  // Histórico Educacional [cite: 18]
    "img/portfolio/4.jpg",  // Experiência Profissional [cite: 36]
    "img/portfolio/5.jpg",  // Projetos de Render [cite: 45]
    "img/portfolio/6.jpg",  // Render - Cozinha Neon [cite: 54]
    "img/portfolio/7.jpg",  // Render - Cozinha Preta [cite: 56]
    "img/portfolio/8.jpg",  // Render - Setup Gamer [cite: 64]
    "img/portfolio/9.jpg",  // Planta: Projeto Residencial [cite: 67]
    "img/portfolio/10.jpg", // QR Code Projeto Residencial [cite: 73]
    "img/portfolio/11.jpg", // Projeto Comercial: Loja Richards [cite: 78]
    "img/portfolio/12.jpg", // Render Loja Richards [cite: 81]
    "img/portfolio/13.jpg", // Projeto Industrial: EVA Unipê [cite: 84]
    "img/portfolio/14.jpg", // Internacional: Portugal [cite: 91]
    "img/portfolio/15.jpg", // Render Apartamento Portugal [cite: 95]
    "img/portfolio/16.jpg", // Internacional: USA Pet [cite: 99]
    "img/portfolio/17.jpg", // Planta e Designers USA [cite: 109, 111]
    "img/portfolio/18.jpg", // Softwares Usados [cite: 119]
    "img/portfolio/19.jpg"  // Contato Final [cite: 130, 131]
];

let currentPage = 0;
const pageImg = document.getElementById('pdf-page');
const pageCounter = document.getElementById('page-num');

function updatePage() {
    if (!pageImg) return;
    pageImg.style.opacity = '0';
    setTimeout(() => {
        pageImg.src = pages[currentPage];
        // Atualizado para mostrar o total de 19 páginas
        pageCounter.innerText = `${(currentPage + 1).toString().padStart(2, '0')} / ${pages.length.toString().padStart(2, '0')}`;
        pageImg.style.opacity = '1';
    }, 300);
}

// Tornando as funções globais para o onclick do HTML
window.nextPage = function() {
    currentPage = (currentPage + 1) % pages.length;
    updatePage();
};

window.prevPage = function() {
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    updatePage();
};

// --- Efeito Marquee (Duplicação do conteúdo) ---
const marquee = document.getElementById('marquee');
if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
}

// --- Efeito Scroll na Navbar ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// --- Scroll Reveal Animation ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- Formulário de Contato (AJAX com Formspree) ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const data = new FormData(e.target);
        
        btn.innerHTML = 'Enviando...';
        btn.disabled = true;

        try {
            const response = await fetch(e.target.action, {
                method: 'POST', // Usa o método definido no HTML [cite: 130]
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                btn.innerHTML = 'Mensagem Enviada! <i data-lucide="check"></i>';
                btn.style.backgroundColor = '#10b981';
                lucide.createIcons();
                e.target.reset();
                
                // Retorna o botão ao normal após 5 segundos
                setTimeout(() => {
                    btn.innerHTML = 'Enviar Proposta <i data-lucide="send"></i>';
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    lucide.createIcons();
                }, 5000);
            } else {
                throw new Error();
            }
        } catch (error) {
            btn.innerHTML = 'Erro ao enviar <i data-lucide="alert-circle"></i>';
            btn.style.backgroundColor = '#ef4444';
            btn.disabled = false;
            lucide.createIcons();
        }
    });
}

// --- Menu Mobile ---
const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
let menuOpen = false;

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        if (menuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'fixed';
            navLinks.style.inset = '0';
            navLinks.style.background = 'black';
            navLinks.style.justifyContent = 'center';
            navLinks.style.alignItems = 'center';
            navLinks.style.zIndex = '999';
            menuBtn.innerHTML = '<i data-lucide="x"></i>';
        } else {
            navLinks.style.display = '';
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
        }
        lucide.createIcons();
    });
}