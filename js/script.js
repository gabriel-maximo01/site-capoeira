// =============================
// CAPOEIRA VIVA - SCRIPT.JS
// =============================

//  Menu responsivo mobile
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

// Mudança do header (transparente enquanto hero visível;
const hero = document.querySelector('.hero');
if (hero) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.10) {
        header.classList.remove('scrolled');
      } else {
        header.classList.add('scrolled');
      }
    });
  }, {
    threshold: [0, 0.1, 0.5, 1]
  });
  heroObserver.observe(hero);
}

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

// Animações para rolar a página 
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.animationPlayState = 'running';
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.1
});
faders.forEach(fader => {
  fader.style.animationPlayState = 'paused';
  appearOnScroll.observe(fader);
});

// CARROSSEL SIMPLES COM FADE E ZOOM 
const carouselImages = document.querySelectorAll('.carousel-image');
let currentIndex = 0;

// garante que so a primeira imagem ali ao carregar
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

// Botão "voltar ao topo"
const btnTopo = document.createElement('button');
btnTopo.innerHTML = '↑';
btnTopo.setAttribute('aria-label', 'Voltar ao topo');
btnTopo.className = 'btn-topo';
btnTopo.style.display = 'none';
document.body.appendChild(btnTopo);

window.addEventListener('scroll', () => {
  btnTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Carrossel de imagens com botões de navegação
const carrossel = document.querySelector('.carrossel');
const items = document.querySelectorAll('.carrossel-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const totalItems = items.length;

function updateCarrossel() {
  carrossel.style.transform = `translateX(-${index * 100}%)`;
}

// Botão voltar
prevBtn.addEventListener('click', () => {
  index = (index - 1 + totalItems) % totalItems; // agora funciona direito
  updateCarrossel();
});

// Botão avançar
nextBtn.addEventListener('click', () => {
  index = (index + 1) % totalItems;
  updateCarrossel();
});

// SWIPER CAPOEIRA (o treco das fotinhas)

document.addEventListener('DOMContentLoaded', function() {
  // verificar se o Swiper esta carregado
  if (typeof Swiper === 'undefined') {
    console.error('Swiper não foi carregado corretamente');
    // carregar Swiper dinamicamente se não estiver disponível
    loadSwiperScript();
  } else {
    initSwiper();
  }
  
  function loadSwiperScript() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.onload = initSwiper;
    document.head.appendChild(script);
    
    // Também carregar o CSS se necessário
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(link);
  }
  
  function initSwiper() {
    const swiperContainer = document.querySelector('.swiper-capoeira-container');
    
    if (!swiperContainer) {
      console.error('Container do Swiper não encontrado');
      return;
    }
    
    // Inicia o Swiper
    const swiperCapoeira = new Swiper('.swiper-capoeira-container', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.capoeira-swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.capoeira-swiper-button-next',
        prevEl: '.capoeira-swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
    
    // Pausa 0 autoplay quando o mouse tiver no swiper
    swiperContainer.addEventListener('mouseenter', function() {
      swiperCapoeira.autoplay.stop();
    });
    
    swiperContainer.addEventListener('mouseleave', function() {
      swiperCapoeira.autoplay.start();
    });
    
    console.log('Swiper inicializado com sucesso');
  }
});