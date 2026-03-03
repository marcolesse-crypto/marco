/* ============================================================
   FORJA DO MESTRE — JavaScript
   ============================================================ */

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

/* ---------- FILTRO DE PRODUTOS ---------- */
const filtros = document.querySelectorAll('.filtro-btn');
const cards   = document.querySelectorAll('.produto-card');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      if (match) {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeIn .4s ease';
      }
    });
  });
});

/* ---------- SLIDER DE DEPOIMENTOS ---------- */
const depoimentos = document.querySelectorAll('.depoimento-card');
let   currentSlide = 0;
let   autoSlide;

function criarDots() {
  const dotsContainer = document.getElementById('sliderDots');
  depoimentos.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => irParaSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function irParaSlide(index) {
  depoimentos[currentSlide].classList.remove('active');
  document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
  currentSlide = (index + depoimentos.length) % depoimentos.length;
  depoimentos[currentSlide].classList.add('active');
  document.querySelectorAll('.dot')[currentSlide].classList.add('active');
}

function mudarSlide(dir) {
  clearInterval(autoSlide);
  irParaSlide(currentSlide + dir);
  iniciarAutoSlide();
}

function iniciarAutoSlide() {
  autoSlide = setInterval(() => irParaSlide(currentSlide + 1), 5000);
}

criarDots();
iniciarAutoSlide();

/* ---------- VOLTAR AO TOPO ---------- */
function voltarAoTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- SCROLL SUAVE PARA LINKS ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ---------- MODAL DE PRODUTO ---------- */
const modalData = {
  chef: {
    img:       'images/faca-chef.png',
    categoria: 'Cozinha',
    nome:      'Faca do Chef',
    preco:     'R$ 380,00',
    desc:      'A Faca do Chef é a peça central de qualquer cozinha profissional. Forjada em aço carbono 1095 com dureza HRC 58-60, ela mantém o fio por muito mais tempo que as facas industriais. O cabo em madeira de nogueira é trabalhado à mão para oferecer o equilíbrio e a ergonomia ideais para longas horas de uso.',
    specs: [
      { label: 'Comprimento da Lâmina', value: '20 cm' },
      { label: 'Aço',                   value: 'Carbono 1095' },
      { label: 'Dureza',                value: 'HRC 58-60' },
      { label: 'Cabo',                  value: 'Madeira de Nogueira' },
      { label: 'Acabamento',            value: 'Polido Espelhado' },
      { label: 'Bainha',                value: 'Couro Artesanal' },
    ]
  },
  santoku: {
    img:       'images/kitchen-knives.jpg',
    categoria: 'Cozinha',
    nome:      'Faca Santoku',
    preco:     'R$ 420,00',
    desc:      'Inspirada na tradição japonesa, a Santoku artesanal combina o melhor dos dois mundos: a técnica oriental de lâmina plana com o aço brasileiro de alta qualidade. Os alvéolos na lâmina evitam que os alimentos grudem, tornando os cortes mais ágeis e precisos. Perfeita para legumes, carnes e peixes.',
    specs: [
      { label: 'Comprimento da Lâmina', value: '18 cm' },
      { label: 'Aço',                   value: 'Inox 440C' },
      { label: 'Dureza',                value: 'HRC 57-59' },
      { label: 'Cabo',                  value: 'Jacarandá' },
      { label: 'Acabamento',            value: 'Acetinado' },
      { label: 'Bainha',                value: 'Couro Artesanal' },
    ]
  },
  conjunto: {
    img:       'images/chef-set.jpg',
    categoria: 'Cozinha',
    nome:      'Conjunto Cozinha (6 peças)',
    preco:     'R$ 1.890,00',
    desc:      'O conjunto completo para quem leva a sério a arte de cozinhar. São 6 facas artesanais cuidadosamente selecionadas: Chef (20cm), Pão (22cm), Desossa (15cm), Legumes (10cm), Filetar (17cm) e Faca de Mesa (12cm). Todas com cabos combinados em madeira de imbuia e estojo em couro legítimo.',
    specs: [
      { label: 'Peças',                 value: '6 facas' },
      { label: 'Aço',                   value: 'Carbono 1095 / Inox 440C' },
      { label: 'Cabos',                 value: 'Madeira de Imbuia' },
      { label: 'Estojo',                value: 'Couro Legítimo' },
      { label: 'Personalização',        value: 'Disponível' },
      { label: 'Prazo de Entrega',      value: '30 a 45 dias' },
    ]
  },
  caca: {
    img:       'images/faca-caca.jpg',
    categoria: 'Caça & Pesca',
    nome:      'Faca de Caça',
    preco:     'R$ 450,00',
    desc:      'Desenvolvida para os desafios do campo, a Faca de Caça combina resistência e versatilidade. A lâmina robusta em aço carbono temperado suporta os mais exigentes trabalhos de campo, enquanto o cabo em madeira e osso oferece aderência segura mesmo com as mãos molhadas. Acompanha bainha em couro costurado à mão.',
    specs: [
      { label: 'Comprimento da Lâmina', value: '15 cm' },
      { label: 'Aço',                   value: 'Carbono 1084' },
      { label: 'Dureza',                value: 'HRC 57-60' },
      { label: 'Cabo',                  value: 'Madeira + Osso' },
      { label: 'Guarda',                value: 'Latão' },
      { label: 'Bainha',                value: 'Couro Costurado à Mão' },
    ]
  },
  jungle: {
    img:       'images/faca-jungle.jpg',
    categoria: 'Caça & Pesca',
    nome:      'Faca Jungle / Pesca',
    preco:     'R$ 320,00',
    desc:      'Criada especialmente para pescadores e aventureiros, a Faca Jungle tem lâmina fina e flexível que permite filetar peixes com precisão cirúrgica. O cabo antiderrapante em madeira tratada com óleo de linhaça garante segurança mesmo em ambientes úmidos. Ideal para pesca, camping e atividades ao ar livre.',
    specs: [
      { label: 'Comprimento da Lâmina', value: '17 cm' },
      { label: 'Aço',                   value: 'Inox 440C' },
      { label: 'Dureza',                value: 'HRC 56-58' },
      { label: 'Cabo',                  value: 'Madeira Tratada' },
      { label: 'Acabamento',            value: 'Acetinado' },
      { label: 'Resistência',           value: 'Alta Umidade' },
    ]
  },
  sobrevivencia: {
    img:       'images/faca-sobrevivencia.jpg',
    categoria: 'Campo & Sobrevivência',
    nome:      'Faca de Sobrevivência',
    preco:     'R$ 580,00',
    desc:      'A faca definitiva para situações extremas. Construção full tang em aço D2 de alta resistência ao desgaste, com lâmina de 22 cm que inclui serrilha parcial para cortar cordas e materiais duros. O cabo em micarta G10 é praticamente indestrutível e mantém a aderência em qualquer condição. Bainha tática em kydex com sistema de fixação MOLLE.',
    specs: [
      { label: 'Comprimento da Lâmina', value: '22 cm' },
      { label: 'Aço',                   value: 'D2 Tool Steel' },
      { label: 'Dureza',                value: 'HRC 60-62' },
      { label: 'Cabo',                  value: 'Micarta G10' },
      { label: 'Construção',            value: 'Full Tang' },
      { label: 'Bainha',                value: 'Kydex Tático' },
    ]
  },
  gaucha: {
    img:       'images/faca-gaucha.jpg',
    categoria: 'Coleção',
    nome:      'Faca Gaúcha Tradicional',
    preco:     'R$ 520,00',
    desc:      'Uma homenagem à tradição gaúcha. A Faca Gaúcha é forjada seguindo os métodos centenários dos cuteleiros do Rio Grande do Sul. A lâmina em aço carbono é trabalhada para ter o perfil característico da faca gaúcha, e o cabo em chifre de boi com virola em alpaca é um símbolo de identidade cultural. Acompanha bainha em couro artesanal com costuras decorativas.',
    specs: [
      { label: 'Comprimento da Lâmina', value: '20 cm' },
      { label: 'Aço',                   value: 'Carbono 1095' },
      { label: 'Cabo',                  value: 'Chifre de Boi' },
      { label: 'Virola',                value: 'Alpaca' },
      { label: 'Bainha',                value: 'Couro com Costuras Decorativas' },
      { label: 'Estilo',                value: 'Gaúcho Tradicional' },
    ]
  },
  bowie: {
    img:       'images/kitchen2.jpg',
    categoria: 'Coleção',
    nome:      'Faca Bowie Clássica',
    preco:     'R$ 750,00',
    desc:      'Inspirada no lendário Bowie Knife americano do século XIX, esta peça é um verdadeiro objeto de colecionador. A lâmina de 25 cm em aço 1095 apresenta o característico clip point e falso fio, com acabamento polido que realça a beleza do metal. O cabo em madeira de imbuia com proteção em latão completa esta obra de arte funcional.',
    specs: [
      { label: 'Comprimento da Lâmina', value: '25 cm' },
      { label: 'Aço',                   value: 'Carbono 1095' },
      { label: 'Dureza',                value: 'HRC 57-60' },
      { label: 'Cabo',                  value: 'Madeira de Imbuia' },
      { label: 'Guarda',                value: 'Latão Polido' },
      { label: 'Acabamento',            value: 'Polido Espelhado' },
    ]
  },
  bushcraft: {
    img:       'images/facas-gaucha2.jpg',
    categoria: 'Campo & Sobrevivência',
    nome:      'Faca Bushcraft',
    preco:     'R$ 390,00',
    desc:      'A faca ideal para quem ama a natureza e as atividades de camping e trilhas. O perfil escandinavo da lâmina (Scandi Grind) é perfeito para trabalhar madeira, fazer fogo e preparar alimentos no campo. O cabo em madeira de oliveira com textura natural oferece aderência excelente e um visual rústico e elegante.',
    specs: [
      { label: 'Comprimento da Lâmina', value: '12 cm' },
      { label: 'Aço',                   value: 'Carbono 1075' },
      { label: 'Dureza',                value: 'HRC 56-58' },
      { label: 'Cabo',                  value: 'Madeira de Oliveira' },
      { label: 'Perfil da Lâmina',      value: 'Scandi Grind' },
      { label: 'Bainha',                value: 'Couro Artesanal' },
    ]
  }
};

function abrirModal(tipo) {
  const data = modalData[tipo];
  if (!data) return;
  const specsHTML = data.specs.map(s =>
    `<div class="spec-item"><strong>${s.label}</strong><span>${s.value}</span></div>`
  ).join('');
  document.getElementById('modalContent').innerHTML = `
    <img src="${data.img}" alt="${data.nome}" />
    <div class="modal-body">
      <span class="produto-categoria">${data.categoria}</span>
      <h2>${data.nome}</h2>
      <div class="preco-modal">${data.preco}</div>
      <p>${data.desc}</p>
      <div class="modal-specs">${specsHTML}</div>
      <button class="modal-btn" onclick="irParaContato('${data.nome}'); fecharModal();">
        <i class="fas fa-shopping-cart"></i> Fazer Encomenda
      </button>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- LIGHTBOX ---------- */
function abrirLightbox(src, caption) {
  document.getElementById('lightboxImg').src     = src;
  document.getElementById('lightboxCaption').textContent = caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* Fechar com ESC */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { fecharModal(); fecharLightbox(); }
});

/* ---------- IR PARA CONTATO COM PRODUTO PRÉ-SELECIONADO ---------- */
function irParaContato(nomeProduto) {
  const select = document.getElementById('tipo-faca');
  const map = {
    'Faca do Chef':               'chef',
    'Faca Santoku':               'santoku',
    'Conjunto Cozinha 6 peças':   'conjunto',
    'Faca de Caça':               'caca',
    'Faca Jungle / Pesca':        'pesca',
    'Faca de Sobrevivência':      'sobrevivencia',
    'Faca Gaúcha Tradicional':    'gaucha',
    'Faca Bowie Clássica':        'bowie',
    'Faca Bushcraft':             'bushcraft',
  };
  if (select && map[nomeProduto]) select.value = map[nomeProduto];
  const contato = document.getElementById('contato');
  if (contato) {
    setTimeout(() => {
      window.scrollTo({ top: contato.offsetTop - 80, behavior: 'smooth' });
    }, 100);
  }
}

/* ---------- FORMULÁRIO DE CONTATO ---------- */
function enviarFormulario(e) {
  e.preventDefault();
  const btn = document.querySelector('.btn-submit');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('contatoForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 1800);
}

/* ---------- ANIMAÇÕES AO SCROLL (Intersection Observer) ---------- */
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.produto-card, .diferencial-card, .galeria-item, .step, .stat, .contato-item'
).forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});

/* ---------- MÁSCARA DE TELEFONE ---------- */
const telInput = document.getElementById('telefone');
if (telInput) {
  telInput.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.length <= 10) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    this.value = v.substring(0, 15);
  });
}

/* ---------- CONTADOR DE ESTATÍSTICAS ---------- */
function animarContador(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = (suffix === '+' ? '+' : '') + current.toLocaleString('pt-BR') + (suffix === '%' ? '%' : '');
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text = num.textContent.trim();
        if (text.includes('+')) animarContador(num, parseInt(text.replace(/\D/g, '')), '+');
        else if (text.includes('%')) animarContador(num, parseInt(text), '%');
        else animarContador(num, parseInt(text.replace(/\D/g, '')));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.sobre-stats');
if (statsSection) statsObserver.observe(statsSection);
