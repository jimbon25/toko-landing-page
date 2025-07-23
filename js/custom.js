// Swiper Gallery Autoplay Initialization
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.gallery-swiper')) {
    var swiper = new Swiper('.gallery-swiper', {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
      }
    });
  }
});
// Tutup navbar collapse saat menu diklik (mobile)
document.addEventListener('DOMContentLoaded', function() {
  var navbarCollapse = document.getElementById('navbarNav');
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
      bsCollapse.hide();
      // Highlight active menu
      navLinks.forEach(function(l) {
        l.classList.remove('active-menu');
      });
      this.classList.add('active-menu');
    });
  });
});

// Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;
  const navbarCollapse = document.getElementById('navbarNav');
  // Load saved theme
  if(localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('bi-moon-stars');
    themeIcon.classList.add('bi-brightness-high');
  }
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    if(isDark) {
      themeIcon.classList.remove('bi-moon-stars');
      themeIcon.classList.add('bi-brightness-high');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.remove('bi-brightness-high');
      themeIcon.classList.add('bi-moon-stars');
      localStorage.setItem('theme', 'light');
    }
    // Tutup navbar jika terbuka
    if (navbarCollapse.classList.contains('show')) {
      var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
      bsCollapse.hide();
    }
  });
});

// Modal Product Detail: tampilkan varian jika ada
document.addEventListener('DOMContentLoaded', function() {
  var productDetailModal = document.getElementById('productDetailModal');
  if(productDetailModal) {
    productDetailModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget;
      var name = button.getAttribute('data-product-name');
      var desc = button.getAttribute('data-product-description');
      var price = button.getAttribute('data-product-price');
      var unit = button.getAttribute('data-product-unit');
      var variants = button.getAttribute('data-product-variants');
      document.getElementById('modalProductName').textContent = name;
      document.getElementById('modalProductDescription').textContent = desc;
      document.getElementById('modalProductPrice').textContent = price + (unit ? ' / ' + unit : '');
      var unitsDiv = document.getElementById('modalProductUnits');
      unitsDiv.innerHTML = '';
      if(variants) {
        try {
          var arr = JSON.parse(variants);
          var ul = document.createElement('ul');
          ul.className = 'mt-2 text-start';
          arr.forEach(function(v) {
            var li = document.createElement('li');
            li.textContent = v;
            ul.appendChild(li);
          });
          unitsDiv.appendChild(ul);
        } catch(e) {
          unitsDiv.textContent = variants;
        }
      }
    });
  }
});

// Intersection Observer untuk animasi fade-in
document.addEventListener('DOMContentLoaded', function() {
  var observer = new window.IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.animate').forEach(function(el) {
    observer.observe(el);
  });
});
