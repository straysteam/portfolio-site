// Inicializa os ícones do Lucide
lucide.createIcons();

// --- Lógica do PDF Viewer ---
const pages = [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
];

let currentPage = 0;
const pageImg = document.getElementById('pdf-page');
const pageCounter = document.getElementById('page-num');

function updatePage() {
    if (!pageImg) return;
    pageImg.style.opacity = '0';
    setTimeout(() => {
        pageImg.src = pages[currentPage];
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

// --- Formulário de Contato ---
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
                method: 'POST',
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