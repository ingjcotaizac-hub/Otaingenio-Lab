/* OTAINGENIO LAB — MAIN APPLICATION CONTROLLER */

// Import Submodules
import { initTelemetry } from './telemetry.js';
import { initParadigm } from './paradigm.js';
import { initSimulator } from './simulator.js';
import { initCalculator } from './calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Diagnostic Modules
  initTelemetry();
  initParadigm();
  initSimulator();
  initCalculator();

  // Scroll Header Effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightNavOnScroll();
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const mobileIcon = mobileToggle.querySelector('i');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
      mobileIcon.className = 'fa-solid fa-xmark';
    } else {
      mobileIcon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu on nav link click
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSec = document.getElementById(targetId);
      
      navMenu.classList.remove('active');
      mobileIcon.className = 'fa-solid fa-bars';

      if (targetSec) {
        window.scrollTo({
          top: targetSec.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navigation active highlighting on scroll
  const sections = document.querySelectorAll('section');
  function highlightNavOnScroll() {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < (sec.offsetTop + sec.offsetHeight)) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === current) {
        link.classList.add('active');
      }
    });
  }

  // Segment Selector ("Para ti")
  const segBtnGobernantas = document.getElementById('seg-btn-gobernantas');
  const segBtnDirectores = document.getElementById('seg-btn-directores');
  const segmentCard = document.getElementById('segment-display-card');

  // Renders segmented content with smooth fade-in
  function renderSegment(role) {
    segmentCard.style.opacity = 0;
    segmentCard.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      if (role === 'gobernanta') {
        segmentCard.innerHTML = `
          <div class="seg-layout">
            <div class="seg-pain-points">
              <h4>El Dolor en Pisos</h4>
              <ul class="pain-list">
                <li>
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <div>
                    <strong>Esfuerzo invisible:</strong>
                    <span>Sientes que el hotel funciona y brilla gracias a tu sobreesfuerzo diario no reconocido.</span>
                  </div>
                </li>
                <li>
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <div>
                    <strong>Repartos de trabajo desequilibrados:</strong>
                    <span>Asignar habitaciones fijas sin calibrar salidas quema a tu equipo y genera bajas sistemáticas.</span>
                  </div>
                </li>
                <li>
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <div>
                    <strong>Falta de autoridad ejecutiva:</strong>
                    <span>Falta de herramientas técnicas y lenguaje financiero para defender tus recursos ante la gerencia.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="seg-solution">
              <h4>La Transformación Otaingenio</h4>
              <p>Te enseñamos a tomar el control del departamento como una gestora de procesos y costes de alto nivel, no como una mera supervisora de limpieza.</p>
              <ul class="seg-solution-list">
                <li><i class="fa-solid fa-circle-check"></i> <span><strong>Aprende el lenguaje de Gerencia:</strong> Domina ratios como CPOR, productividad real y control presupuestario.</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span><strong>Sistemas de Créditos Justos:</strong> Aprende a repartir el planing del día en base al esfuerzo real, no por azar.</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span><strong>Liderazgo de Autoridad:</strong> Gana respeto, argumentos y tu lugar legítimo en los comités de dirección.</span></li>
              </ul>
              <a href="#program-section" class="btn-primary">
                <span>Ver Programa Superior</span>
                <i class="fa-solid fa-chevron-right"></i>
              </a>
            </div>
          </div>
        `;
      } else {
        segmentCard.innerHTML = `
          <div class="seg-layout">
            <div class="seg-pain-points">
              <h4>El Coste de la Intuición</h4>
              <ul class="pain-list">
                <li>
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <div>
                    <strong>La gran "Caja Negra" del hotel:</strong>
                    <span>El departamento de pisos representa hasta el 40% de tus costes y careces de métricas reales de eficiencia.</span>
                  </div>
                </li>
                <li>
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <div>
                    <strong>Fugas de EBITDA ocultas:</strong>
                    <span>Mermas de CPOR de hasta 2.50€ por habitación ocupada debido a tiempos muertos e ineficiencias de flujo.</span>
                  </div>
                </li>
                <li>
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <div>
                    <strong>Rotación y fatiga disparadas:</strong>
                    <span>Bajas continuas y mal clima laboral causados por repartos de trabajo desequilibrados y falta de sistema.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="seg-solution">
              <h4>Ingeniería y Control de Ratios</h4>
              <p>Audita e implanta un sistema operativo riguroso con Otaingenio Lab para controlar tus costes, asegurar la calidad y potenciar tu cuenta de explotación.</p>
              <ul class="seg-solution-list">
                <li><i class="fa-solid fa-circle-check"></i> <span><strong>Gobernantas con Enfoque Ejecutivo:</strong> Convertimos a tu personal en gestoras basadas en datos y rentabilidad.</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span><strong>Auditorías LQA vs CPOR:</strong> Equilibra calidad y costes con controles numéricos de desviación.</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span><strong>Optimización del Margen:</strong> Retorno de inversión inmediato reduciendo la fuga operativa un 15%.</span></li>
              </ul>
              <a href="#calculator-section" class="btn-primary">
                <span>Calcular Costes CPOR</span>
                <i class="fa-solid fa-calculator"></i>
              </a>
            </div>
          </div>
        `;
      }
      segmentCard.style.opacity = 1;
      segmentCard.style.transform = 'translateY(0)';
    }, 200);
  }

  // Active event listeners for segment tabs
  segBtnGobernantas.addEventListener('click', () => {
    segBtnGobernantas.classList.add('active');
    segBtnDirectores.classList.remove('active');
    renderSegment('gobernanta');
  });

  segBtnDirectores.addEventListener('click', () => {
    segBtnDirectores.classList.add('active');
    segBtnGobernantas.classList.remove('active');
    renderSegment('director');
  });

  // Render initial segment state
  renderSegment('gobernanta');

  // Book Hover Rotate Rotation helper (CSS 3D perspective effect based on mouse coordinate)
  const bookContainer = document.getElementById('css-book-3d');
  const bookWrapper = bookContainer.parentElement;

  bookWrapper.addEventListener('mousemove', (e) => {
    const rect = bookWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Limits rotation between -30 and 30 degs
    const rotateY = (x / (rect.width / 2)) * 35;
    const rotateX = -(y / (rect.height / 2)) * 25;
    
    bookContainer.style.transform = `rotateY(${rotateY - 20}deg) rotateX(${rotateX + 10}deg)`;
  });

  bookWrapper.addEventListener('mouseleave', () => {
    bookContainer.style.transform = 'rotateY(-20deg) rotateX(10deg)';
  });

  // Pre-enrollment Modal Controller
  const openModalBtn = document.getElementById('btn-open-enrollment');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const enrollmentModal = document.getElementById('enrollment-modal');

  if (openModalBtn && closeModalBtn && enrollmentModal) {
    openModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      enrollmentModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevents background scrolling
    });

    closeModalBtn.addEventListener('click', () => {
      enrollmentModal.classList.remove('active');
      document.body.style.overflow = ''; // Restores background scrolling
    });

    // Close modal on clicking outside the content area
    enrollmentModal.addEventListener('click', (e) => {
      if (e.target === enrollmentModal) {
        enrollmentModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Accordion Controller
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isActive = item.classList.contains('active');
      
      // Close other accordions
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherHeader = otherItem.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current accordion
      item.classList.toggle('active');
      header.setAttribute('aria-expanded', isActive ? 'false' : 'true');
    });
  });
});
