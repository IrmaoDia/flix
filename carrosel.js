 const carousel = document.getElementById('carousel');

  const items = document.querySelectorAll('.carousel-item');

  let currentIndex = 0;

  function getItemWidth() {
    const item = document.querySelector('.carousel-item');
    const style = getComputedStyle(item);
    return item.offsetWidth + parseInt(style.marginRight || 0);
  }

  function updateCarousel() {
    const itemWidth = getItemWidth();
    const translateX = -currentIndex * itemWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
    updateIndicators();
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function createIndicators() {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      indicatorsContainer.appendChild(indicator);
    }
  }

  function nextSlide() {
    if (currentIndex < items.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }



  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  setInterval(() => {
     
    if (currentIndex < items.length - 1) {
      currentIndex++;
      updateCarousel();
    }

    if (currentIndex == 9) {
        currentIndex = 0;
        updateCarousel();
    }
  
  }, 2000)

  createIndicators();
  updateCarousel();