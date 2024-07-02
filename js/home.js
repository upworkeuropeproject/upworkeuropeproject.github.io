document.addEventListener('DOMContentLoaded', function() {
  // Agrupar elementos relacionados en objetos
  const header = {
    main: document.querySelector('.uw__header'),
    content: document.querySelector('.uw__header__content'),
    logo: document.querySelector('.uw__header__logo'),
    nav: document.querySelector('.uw__header__nav')
  };
  const draw = {
    main: document.querySelector('.uw__draw'),
    bean: document.querySelector('.uw__draw__bean'),
    caracol: document.querySelector('.uw__draw__caracol')
  };
  const objetive = {
    main: document.querySelector('.uw__objetive'),
    title: document.querySelector('.uw__objetive__title')
  };
  const about = {
    main: document.querySelector('.uw__about'),
    title: document.querySelector('.uw__about__title')
  };
  const statistics = {
    main: document.querySelector('.uw__statistics'),
    participants: document.querySelector('.uw__statistics__participants__count'),
    budget: document.querySelector('.uw__statistics__budget__count'),
    animationInProgress: false
  };

  // Función de animación
  const animateValue = (obj, start, end, duration, isReverse = false) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(isReverse ? end - progress * (end - start) : progress * (end - start) + start);
      obj.textContent = currentValue + (currentValue !== 0 && obj === statistics.budget ? 'K' : '');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        animationInProgress = false;
      }
    };
    window.requestAnimationFrame(step);
  };

  // Función reutilizable para efectos de hover
  function addHoverEffect(element, onEnter, onLeave) {
    element.main.addEventListener('mouseenter', onEnter);
    element.main.addEventListener('mouseleave', onLeave);
  }

  // Eventos de animación
  addHoverEffect(header, 
    () => {
      header.content.style.left = '300px';
      header.logo.style.opacity = '0';
      header.nav.style.opacity = '1';
    },
    () => {
      header.content.style.left = '50%';
      header.logo.style.opacity = '1';
      header.nav.style.opacity = '0';
    }
  );

  addHoverEffect(draw,
    () => {
      draw.caracol.style.strokeDashoffset = '0';
      draw.bean.style.strokeDashoffset = '75';
    },
    () => {
      draw.caracol.style.strokeDashoffset = '50';
      draw.bean.style.strokeDashoffset = '0';
    }
  );

  function titleHoverEffect(element) {
    addHoverEffect(element,
      () => {
        element.title.style.fontSize = '45px';
        element.title.style.fontWeight = 'bold';
      },
      () => {
        element.title.style.fontSize = '40px';
        element.title.style.fontWeight = 'normal';
      }
    );
  }

  titleHoverEffect(objetive);
  titleHoverEffect(about);

  addHoverEffect(statistics,
    () => {
      if (!statistics.animationInProgress) {
        animateValue(statistics.participants, 0, 1000, 500);
        animateValue(statistics.budget, 0, 5, 500);
      }
    },
    () => {
      if (!statistics.animationInProgress) {
        animateValue(statistics.participants, 0, 1000, 500, true);
        animateValue(statistics.budget, 0, 5, 500, true);
    }
    }
  );

  const carousel = {
    track: document.querySelector('.uw__partners__carousel__track'),
    slides: Array.from(document.querySelectorAll('.uw__partners__carousel__slide')),
    nextButton: document.querySelector('.uw__partners__carousel__button__right'),
    prevButton: document.querySelector('.uw__partners__carousel__button__left'),
    currentIndex: 0
  };

  function initCarousel() {
    const slideWidth = carousel.slides[0].getBoundingClientRect().width;
    
    // Posiciona los slides uno al lado del otro
    carousel.slides.forEach((slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    });

    carousel.nextButton.addEventListener('click', () => moveCarousel('next'));
    carousel.prevButton.addEventListener('click', () => moveCarousel('prev'));
  }

  function moveCarousel(direction) {
    const slideWidth = carousel.slides[0].getBoundingClientRect().width;
    const slidesCount = carousel.slides.length;

    if (direction === 'next') {
      carousel.currentIndex = (carousel.currentIndex + 1) % slidesCount;
    } else {
      carousel.currentIndex = (carousel.currentIndex - 1 + slidesCount) % slidesCount;
    }

    console.log(`Moviendo a la posición: ${carousel.currentIndex}, Ancho del slide: ${slideWidth}`);
    carousel.track.style.transform = `translateX(-${carousel.currentIndex * slideWidth}px)`;
  }

  // Inicializar el carrusel
  initCarousel();
});