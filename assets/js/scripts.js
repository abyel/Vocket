   // Preloader
   document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('fade-out');
    }, 800);

    // Animasi Banner
    let currentDot = 0;
    const dots = document.querySelectorAll('.dot');
    const banner = document.querySelector('.promo-banner');
    const bannerImage = banner.querySelector('.banner-img img'); // Target img element
    const bannerContent = [{
            title: "Premium Sale!",
            desc: "Diskon Premium untuk Seluruh transaksi ",
            image: "assets/image/icon/banner/crown.png"
        },
        {
            title: "Netflix Special",
            desc: "Dapatkan 3 bulan dengan harga 2 hari anjay",
            image: "assets/image/icon/banner/netflix.png"
        },
        {
            title: "Spotify Deals",
            desc: "Streaming musik tanpa batas dengan diskon Juga",
            image: "assets/image/icon/banner/spotify.png"
        },
        {
            title: "Bundle Package",
            desc: "Dana pelajar ",
            image: "assets/image/icon/banner/star.png"
        }
    ];

    function changeBanner() {
        dots.forEach(dot => dot.classList.remove('active'));
        currentDot = (currentDot + 1) % dots.length;
        dots[currentDot].classList.add('active');

        // Fade out banner
        banner.style.opacity = 0;

        setTimeout(() => {
            // Update content
            const content = bannerContent[currentDot];
            banner.querySelector('h3').textContent = content.title;
            banner.querySelector('p').textContent = content.desc;
            bannerImage.src = content.image; // Ubah src gambar

            // Fade in banner
            banner.style.opacity = 1;
            banner.classList.remove('slide-up');
            void banner.offsetWidth; // Force reflow
            banner.classList.add('slide-up');
        }, 300);
    }

    // Auto-change banner setiap 5 detik
    setInterval(changeBanner, 5000);

    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            if (index !== currentDot) {
                clearInterval(bannerInterval);
                currentDot = index -
                    1; // Decrement so the changeBanner function will set it correctly
                changeBanner();
                bannerInterval = setInterval(changeBanner, 5000);
            }
        });
    });

    let bannerInterval = setInterval(changeBanner, 5000);



// Improve navigation animation with smoother transitions
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Initialize active state
    if (!document.querySelector('.nav-item.active')) {
      navItems[0].classList.add('active');
    }
    
    // Add ripple effect function
    function createRipple(event) {
      const item = event.currentTarget;
      
      const circle = document.createElement('span');
      const diameter = Math.max(item.clientWidth, item.clientHeight);
      
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - item.getBoundingClientRect().left - diameter / 2}px`;
      circle.style.top = `${event.clientY - item.getBoundingClientRect().top - diameter / 2}px`;
      circle.classList.add('ripple');
      
      // Remove existing ripples
      const ripple = item.querySelector('.ripple');
      if (ripple) {
        ripple.remove();
      }
      
      item.appendChild(circle);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        circle.remove();
      }, 600);
    }
    
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Don't do anything if already active
        if (this.classList.contains('active')) return;
        
        // Add ripple effect
        createRipple(e);
        
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class with a small delay for smoother animation
        setTimeout(() => {
          this.classList.add('active');
        }, 50);
        
        // Get navigation type and handle content loading
        const navType = this.getAttribute('data-nav');
        console.log(`Navigasi ke: ${navType}`);
        
        // Load content based on navigation
        loadContent(navType);
      });
    });
    
    // Content loading function (placeholder)
    function loadContent(contentType) {
      // You can implement content loading logic here
      const contentArea = document.querySelector('.content-area') || document.body;
      
      // Add a loading indicator
      contentArea.classList.add('loading');
      
      // Simulate content loading with a small delay
      setTimeout(() => {
        contentArea.classList.remove('loading');
        // Here you would typically fetch and display the actual content
      }, 300);
    }
    
    // Product Card Click Enhancement
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('click', function() {
        // Add a subtle click effect
        this.classList.add('card-clicked');
        
        const productName = this.querySelector('.product-name').textContent;
        const productId = this.getAttribute('data-product-id') || '0';
        console.log(`Produk dipilih: ${productName} (ID: ${productId})`);
        
        // Navigate to product detail page (example implementation)
        // window.location.href = `/product/${productId}`;
        
        // Remove the click effect after a short delay
        setTimeout(() => {
          this.classList.remove('card-clicked');
        }, 300);
      });
    });
  });

    // Product Card Click
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function () {
            const productName = this.querySelector('.product-name').textContent;
            console.log(`Produk dipilih: ${productName}`);
            // Di sini bisa ditambahkan navigasi ke halaman detail produk
        });
    });

 
    // Animasi elemen saat scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.slide-up, .fade-in, .bounce-in');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Inisialisasi animasi scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on load

 

    // Simulasi loading data
    function simulateDataLoading() {
        const productGrid = document.querySelector('.products-grid');
        productGrid.innerHTML = '<div class="spinner" style="margin: 40px auto;"></div>';

        setTimeout(() => {
            // Restore konten awal (untuk demo)
            productGrid.innerHTML = document.querySelector('.products-grid').innerHTML;

            // Inisialisasi ulang event listener
            initProductCardListeners();
        }, 1500);
    }

    function initProductCardListeners() {
        const productCards = document.querySelectorAll('.product-card');
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');

        productCards.forEach(card => {
            card.addEventListener('click', function () {
                const productName = this.querySelector('.product-name').textContent;
                console.log(`Produk dipilih: ${productName}`);
            });
        });

        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                this.classList.toggle('active');

                if (this.classList.contains('active')) {
                    this.innerHTML = '<i class="fas fa-heart"></i>';
                } else {
                    this.innerHTML = '<i class="far fa-heart"></i>';
                }
            });
        });
    }

   

    // See All buttons
    const seeAllBtns = document.querySelectorAll('.see-all');
    seeAllBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.closest('.section-header').querySelector('h2')
                .textContent;
            console.log(`Lihat semua untuk: ${section}`);
            // Implementasi navigasi ke halaman kategori/produk
        });
    });

});