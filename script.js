// Mobile menu and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Gallery functionality
  const slides = document.querySelectorAll('.gallery-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevButton = document.querySelector('.gallery-prev');
  const nextButton = document.querySelector('.gallery-next');
  let currentSlide = 0;
  let slideInterval;
  
  // Set background images from data-bg attributes
  slides.forEach(slide => {
    const bgImage = slide.getAttribute('data-bg');
    if (bgImage) {
      slide.style.backgroundImage = `url(${bgImage})`;
    }
  });
  
  function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
  }
  
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }
  
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }
  
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 8000); // Auto-advance every 8 seconds
  }
  
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }
  
  // Event listeners for navigation buttons
  if (nextButton) {
    console.log('Next button found, adding event listener');
    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Next button clicked');
      nextSlide();
      stopAutoSlide();
      startAutoSlide(); // Restart auto-advance
    });
  } else {
    console.log('Next button not found');
  }
  
  if (prevButton) {
    console.log('Prev button found, adding event listener');
    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Prev button clicked');
      prevSlide();
      stopAutoSlide();
      startAutoSlide(); // Restart auto-advance
    });
  } else {
    console.log('Prev button not found');
  }
  
  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      stopAutoSlide();
      startAutoSlide(); // Restart auto-advance
    });
  });
  
  // Pause auto-advance on hover
  const heroGallery = document.querySelector('.hero-gallery');
  if (heroGallery) {
    heroGallery.addEventListener('mouseenter', stopAutoSlide);
    heroGallery.addEventListener('mouseleave', startAutoSlide);
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    }
  });
  
  // Start auto-advance
  if (slides.length > 1) {
    startAutoSlide();
  }

  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  // Mobile menu toggle functionality
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Close mobile menu
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      
      // Get the target section
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Smooth scroll to target section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Add scroll effect to navbar - integrated hero with scroll transition
  const navbar = document.querySelector('.navbar');
  
  // Function to update active navigation link
  function updateActiveNavLink() {
    const sections = ['hero', 'about', 'sponsors', 'contact'];
    let currentSection = 'hero';
    
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        
        if (sectionTop <= 150) {
          currentSection = sectionId;
        }
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when user scrolls down
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link
    updateActiveNavLink();
  });
  
  // Initial call to set correct active link
  updateActiveNavLink();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      // Reset mobile menu on desktop
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});