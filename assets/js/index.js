document.addEventListener('DOMContentLoaded', function () {
          
    // Add enhanced animations
    const style = document.createElement('style');
    style.textContent = `
.slide-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}
.slide-up.animated {
    opacity: 1;
    transform: translateY(0);
}
.product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
}
.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.product-card.hidden {
    display: none;
}
.fade-in {
    animation: fadeIn 0.5s ease forwards;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
.section-header.hidden {
    display: none;
}
.no-results {
    text-align: center;
    padding: 40px 20px;
    color: #666;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s ease, transform 0.4s ease;
}
.no-results.visible {
    opacity: 1;
    transform: translateY(0);
}
.no-results i {
    font-size: 50px;
    color: #ccc;
    margin-bottom: 15px;
    display: block;
}
`;
    document.head.appendChild(style);

    // Animate elements with improved sequence
    const animateElements = function (elements, delay = 80) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, delay * index);
        });
    };

    setTimeout(() => {
        animateElements([document.querySelector('.promo-banner')], 0);
        const productCards = document.querySelectorAll('.product-card');
        animateElements(productCards, 80);
    }, 800);

    // Enhanced banner slider with smoother transitions
    const promoBanner = document.getElementById('promoBanner');
    const promoBannerImage = document.getElementById('promoBannerImage');
    const promoButton = document.getElementById('promoButton');
    const dots = document.querySelectorAll('.dot');

    const bannerContent = [{
            title: 'Penawaran Eksklusif!',
            description: 'Dapatkan akses premium dengan harga spesial terbaik',
        
            image: 'assets/image/icon/banner/netflix.png',
            link: 'product/netflix-list.html'
        },
        {
            title: 'Spotify Premium',
            description: 'Nikmati musik tanpa batas dan tanpa iklan',
           
            image: 'assets/image/logo/apk/spotify.jpg',
            link: 'product/spotify-list.html'
        },
        {
            title: 'YouTube Premium',
            description: 'Tonton video tanpa gangguan iklan',
      
            image: 'assets/image/logo/apk/youtube.png',
            link: 'product/youtube-list.html'
        },
        {
            title: 'Mobile Legends',
            description: 'Top up diamond dengan harga termurah',
          
            image: 'assets/image/icon/banner/mlbb.png',
            link: 'product/mlbb-list.html'
        }
    ];

    let currentBannerIndex = 0;
    let bannerInterval;

    function updateBanner(index) {
        const content = bannerContent[index];

        // Improved fade transition
        promoBanner.style.opacity = '0';
        promoBanner.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Update content
            promoBanner.querySelector('h3').textContent = content.title;
            promoBanner.querySelector('p').textContent = content.description;
            promoButton.textContent = content.buttonText;
            promoBannerImage.src = content.image;

            // Update button link
            promoButton.onclick = function () {
                window.location.href = content.link;
            };

            // Apply fade in with transform
            promoBanner.style.opacity = '1';
            promoBanner.style.transform = 'translateY(0)';
        }, 300);

        // Update dots with animation
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
                dot.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    dot.style.transform = 'scale(1)';
                }, 300);
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Initialize banner with enhanced transitions
    promoBanner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    function startBannerRotation() {
        clearInterval(bannerInterval);
        bannerInterval = setInterval(() => {
            currentBannerIndex = (currentBannerIndex + 1) % bannerContent.length;
            updateBanner(currentBannerIndex);
        }, 5000);
    }

    startBannerRotation();

    // Improved dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentBannerIndex !== index) {
                currentBannerIndex = index;
                updateBanner(currentBannerIndex);
                startBannerRotation();
            }
        });
    });

    // Enhanced search and category filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('searchInput');
    const noResultsElement = document.getElementById('noResults');
    const featuredProductsSection = document.getElementById('featuredProducts');
   
    const featuredSectionHeader = document.querySelector('.section-header');
    const gameSectionHeader = document.querySelectorAll('.section-header')[1];

    let currentCategory = 'all';
    let currentSearchTerm = '';
    let searchTimeout;

    // Enhanced product filtering with section visibility control
    function filterProducts() {
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            const allProducts = document.querySelectorAll('.product-card');
            let visibleFeaturedProducts = 0;
            let visibleGameProducts = 0;

            allProducts.forEach(product => {
                const productName = product.querySelector('.product-name').textContent
                    .toLowerCase();
                const productDesc = product.querySelector('.product-desc').textContent
                    .toLowerCase();
                const productCategory = product.getAttribute('data-category');
                const isInFeaturedSection = product.parentElement.id ===
                    'featuredProducts';

                // Check if product matches both category filter and search term
                const matchesCategory = currentCategory === 'all' || productCategory ===
                    currentCategory;
                const matchesSearch = productName.includes(currentSearchTerm) ||
                    productDesc.includes(currentSearchTerm);

                if (matchesCategory && matchesSearch) {
                    product.style.opacity = '0';
                    product.style.transform = 'translateY(20px)';
                    product.style.display = '';

                    setTimeout(() => {
                        product.style.opacity = '1';
                        product.style.transform = 'translateY(0)';
                    }, 50);

                    if (isInFeaturedSection) {
                        visibleFeaturedProducts++;
                    } else {
                        visibleGameProducts++;
                    }
                } else {
                    product.style.opacity = '0';
                    product.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        product.style.display = 'none';
                    }, 300);
                }
            });

            // Manage section visibility based on results
            if (visibleFeaturedProducts === 0) {
                featuredSectionHeader.classList.add('hidden');
            } else {
                featuredSectionHeader.classList.remove('hidden');
            }

          

            // Show no results message with animation when needed
            if (visibleFeaturedProducts === 0 && visibleGameProducts === 0) {
                noResultsElement.style.display = 'block';
                setTimeout(() => {
                    noResultsElement.classList.add('visible');
                }, 10);
            } else {
                noResultsElement.classList.remove('visible');
                setTimeout(() => {
                    noResultsElement.style.display = 'none';
                }, 300);
            }
        }, 300); // Debounce search for better performance
    }

    // Enhanced category button handlers with animation
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.classList.contains('active')) return;

            // Update active button with animation
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = '';
            });

            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            // Update current category
            currentCategory = this.getAttribute('data-category');

            // Apply filters with animation
            filterProducts();
        });
    });

    // Improved search with visual feedback
    searchInput.addEventListener('input', function () {
        const searchIcon = this.nextElementSibling;
        currentSearchTerm = this.value.toLowerCase();

        // Add visual feedback when searching
        if (currentSearchTerm) {
            searchIcon.style.color = '#5c6bc0';
            searchIcon.classList.add('fa-spin');
            setTimeout(() => {
                searchIcon.classList.remove('fa-spin');
            }, 500);
        } else {
            searchIcon.style.color = '#888';
        }

        filterProducts();
    });

    // Reset search button
    const searchContainer = searchInput.parentElement;
    const resetButton = document.createElement('i');
    resetButton.className = 'fas fa-times';
    resetButton.style.position = 'absolute';
    resetButton.style.right = '35px';
    resetButton.style.top = '30%';

    resetButton.style.color = '#888';
    resetButton.style.cursor = 'pointer';
    resetButton.style.display = 'none';
    searchContainer.appendChild(resetButton);

    searchInput.addEventListener('input', function () {
        resetButton.style.display = this.value ? 'block' : 'none';
    });

    resetButton.addEventListener('click', function () {
        searchInput.value = '';
        currentSearchTerm = '';
        this.style.display = 'none';
        searchInput.nextElementSibling.style.color = '#888';
        filterProducts();
        searchInput.focus();
    });

    // Enhanced back to top button with smooth animation
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            if (backToTopBtn.style.display !== 'block') {
                backToTopBtn.style.display = 'block';
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.transform = 'translateY(0)';
                }, 10);
            }
        } else {
            if (backToTopBtn.style.display === 'block') {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    backToTopBtn.style.display = 'none';
                }, 300);
            }
        }
    });

    backToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    backToTopBtn.addEventListener('click', function () {
        this.style.transform = 'translateY(-5px)';

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setTimeout(() => {
            this.style.transform = 'translateY(0)';
        }, 200);
    });

    // Enhanced product card hover and loading effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // Enhanced lazy loading with fade-in
        const img = card.querySelector('.product-img');
        if (img) {
            const originalSrc = img.src;
            img.src = '';
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.4s ease';

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            img.src = originalSrc;
                            img.onload = () => {
                                img.style.opacity = '1';
                            };
                        }, 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            observer.observe(card);
        }

        // Add ripple effect on click
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            ripple.style.pointerEvents = 'none';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.style.transform = 'scale(0)';
            ripple.style.transition = 'transform 0.5s, opacity 0.5s';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.style.transform = 'scale(2)';
                ripple.style.opacity = '0';

                setTimeout(() => {
                    ripple.remove();
                }, 500);
            }, 10);
        });
    });

    // Improved pull-to-refresh functionality
    let touchStartY = 0;
    let touchEndY = 0;
    let refreshInProgress = false;
    let refreshIndicator = null;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, {
        passive: true
    });

    document.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;

        // Show visual feedback during pull
        if (window.scrollY <= 0 && touchEndY - touchStartY > 50 && !refreshInProgress) {
            if (!refreshIndicator) {
                refreshIndicator = document.createElement('div');
                refreshIndicator.style.position = 'fixed';
                refreshIndicator.style.top = '0';
                refreshIndicator.style.left = '0';
                refreshIndicator.style.width = '100%';
                refreshIndicator.style.padding = '15px';
                refreshIndicator.style.backgroundColor = '#f4f4f4';
                refreshIndicator.style.textAlign = 'center';
                refreshIndicator.style.zIndex = '1000';
                refreshIndicator.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                refreshIndicator.style.transform = 'translateY(-100%)';
                refreshIndicator.style.transition = 'transform 0.3s ease';
                refreshIndicator.innerHTML =
                    '<i class="fas fa-sync" style="margin-right: 8px;"></i> Tarik untuk menyegarkan';
                document.body.appendChild(refreshIndicator);

                setTimeout(() => {
                    refreshIndicator.style.transform = 'translateY(0)';
                }, 10);
            }

            // Update indicator based on pull distance
            const pullDistance = touchEndY - touchStartY;
            if (pullDistance > 150) {
                refreshIndicator.innerHTML =
                    '<i class="fas fa-sync" style="margin-right: 8px;"></i> Lepas untuk menyegarkan';
            } else {
                refreshIndicator.innerHTML =
                    '<i class="fas fa-sync" style="margin-right: 8px;"></i> Tarik untuk menyegarkan';
            }
        }
    }, {
        passive: true
    });

    document.addEventListener('touchend', () => {
        if (window.scrollY <= 0 && touchEndY - touchStartY > 150 && !refreshInProgress) {
            refreshInProgress = true;

            if (refreshIndicator) {
                refreshIndicator.innerHTML =
                    '<i class="fas fa-sync fa-spin" style="margin-right: 8px;"></i> Memperbarui...';
            }

            setTimeout(() => {
                location.reload();
            }, 1000);
        } else if (refreshIndicator) {
            refreshIndicator.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                if (refreshIndicator) {
                    refreshIndicator.remove();
                    refreshIndicator = null;
                }
            }, 300);
        }
    }, {
        passive: true
    });

    // Navigation active state with animation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add smooth transition animation
            this.style.transform = 'scale(1.1)';
            this.classList.add('active');

            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Optimize initial loading
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});