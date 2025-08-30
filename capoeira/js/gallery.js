// Menu responsivo mobile
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
  console.log('Menu clicado - Estado atual:', navMenu.classList.contains('active'));
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
  // acessibilidade: aria-expanded
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  // Foca no primeiro link do menu ao abrir
  if (!expanded) {
    const firstLink = navMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }
});

// Fecha menu no mobile com o link
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function () {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Fecha menu ao com ESC
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape" && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }
});

// Mudança do header ao rolar
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Script de lightbox simples com navegação
(function(){
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  const items = Array.from(gallery.querySelectorAll('.gallery-item'));
  let current = -1;
  let scrollPosition = 0;

  function openLightbox(index){
    const item = items[index];
    if(!item) return;
    
    // Salva a posição atual do scroll
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Previne o scroll do body
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPosition}px`;
    
    const full = item.dataset.full;
    const caption = item.dataset.caption || '';
    lbImg.src = full;
    lbImg.alt = caption;
    lbCaption.textContent = caption;
    current = index;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    
    // Restaura o scroll do body
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    
    // Restaura a posição do scroll
    window.scrollTo(0, scrollPosition);
  }

  function showNext(delta){
    if(current < 0) return;
    let nextIndex = (current + delta + items.length) % items.length;
    openLightbox(nextIndex);
  }

  // abrir ao clicar
  items.forEach((it, idx) => {
    it.addEventListener('click', ()=> openLightbox(idx));
    it.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') openLightbox(idx);
    });
    it.tabIndex = 0;
  });

  // botões
  lbClose.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', ()=> showNext(-1));
  nextBtn.addEventListener('click', ()=> showNext(1));

  // fechar clicando fora
  lightbox.addEventListener('click', (e)=>{
    if(e.target === lightbox) closeLightbox();
  });

  // navegação por teclado
  document.addEventListener('keydown', (e)=>{
    if(lightbox.classList.contains('open')){
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowRight') showNext(1);
      if(e.key === 'ArrowLeft') showNext(-1);
    }
  });

})();

// CARROSSEL SIMPLES COM FADE E ZOOM (igual ao da home)
const carouselImages = document.querySelectorAll('.carousel-image');
let currentIndex = 0;

// garante que só a primeira imagem apareça ao carregar
carouselImages.forEach((img, i) => {
  img.classList.toggle('active', i === 0);
});

function showNextImage() {
  if (carouselImages.length === 0) return;
  carouselImages[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % carouselImages.length;
  carouselImages[currentIndex].classList.add('active');
}

if (carouselImages.length > 1) {
  setInterval(showNextImage, 5000);
}