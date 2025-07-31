document.addEventListener('DOMContentLoaded', function () {
    // Get all elements
    const productItems = document.querySelectorAll('.product-item, .diamond-item');
    const orderModal = document.getElementById('orderModal');
    const closeModal = document.getElementById('closeModal');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductType = document.getElementById('modalProductType');
    const modalProductLogo = document.getElementById('modalProductLogo');
    const showRisks = document.getElementById('showRisks');
    const riskModal = document.getElementById('riskModal');
    const closeRiskModal = document.getElementById('closeRiskModal');
    const acceptRisksBtn = document.getElementById('acceptRisksBtn');
    const acceptRisksCheckbox = document.getElementById('acceptRisks');
    const orderForm = document.getElementById('orderForm');
    const successNotification = document.getElementById('successNotification');
    const qrisPaymentBtn = document.getElementById('qrisPaymentBtn');
    const qrisModal = document.getElementById('qrisModal');
    const closeQrisModal = document.getElementById('closeQrisModal');
    const qrisProductName = document.getElementById('qrisProductName');
    const qrisProductPrice = document.getElementById('qrisProductPrice');
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    const orderDate = document.getElementById('orderDate');
    const infoModal = document.getElementById('infoModal');
    const infoModalTitle = document.getElementById('infoModalTitle');
    const infoModalContent = document.getElementById('infoModalContent');
    const closeInfoModal = document.getElementById('closeInfoModal');

    // Set current date
    const today = new Date();
    const formattedDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    orderDate.value = formattedDate;

    // Package types and their explanations
    const packageInfo = {
        "Weekly Daily Pass": {
            "title": "WEEKLY DAILY PASS",
            "description": "I <b>WDP PO</b>: Proses jam 4 sore - 12 malam (Rp 24.500)<br>I <b>Fast</b>: Proses langsung 10-15 menit (Rp 27.500)<br><br>Proses jam 4 sore - 12 malam maximal selesai dalam 2x24 jam"
        },
        "Diamond": {
            "title": "MOBILE LEGENDS DIAMOND",
            "description": "<b>INFO PENTING:</b><br>Diamond adalah mata uang virtual di Mobile Legends<br><br>• Proses otomatis dan cepat (5-15 menit)<br>• Pastikan ID dan Server sudah benar<br>• Harga sudah termasuk pajak<br>• Tidak ada refund untuk kesalahan input ID/Server"
        }
    };

    // Current selected product data
    let currentProduct = {
        name: '',
        price: '',
        type: ''
    };

    // Add info icons to each section header
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const titleText = header.querySelector('h2').textContent;
        if (packageInfo[titleText]) {
            const infoIcon = document.createElement('i');
            infoIcon.className = 'fas fa-question-circle info-icon';
            infoIcon.setAttribute('data-package', titleText);
            header.appendChild(infoIcon);

            // Add click event to info icon
            infoIcon.addEventListener('click', function () {
                const packageName = this.getAttribute('data-package');
                const info = packageInfo[packageName];

                if (info) {
                    infoModalTitle.textContent = info.title;
                    infoModalContent.innerHTML = info.description;
                    infoModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });

    // Product item click handler
    productItems.forEach(item => {
        item.addEventListener('click', function () {
            // Store the product data
            currentProduct.name = this.dataset.productName;
            currentProduct.price = this.dataset.productPrice;
            currentProduct.type = this.dataset.productType;

            // Set modal content
            modalProductName.textContent = currentProduct.name;
            modalProductPrice.textContent = currentProduct.price;
            modalProductType.textContent = currentProduct.type;

            // Set logo based on product type
            if (currentProduct.type === 'Mobile Legends') {
                modalProductLogo.src = "../assets/image/logo/apk/mlbb.png";
            }

            // Show the modal with animation
            orderModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close order modal
    closeModal.addEventListener('click', function () {
        orderModal.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling again
    });

    // Show risk modal when link is clicked
    showRisks.addEventListener('click', function (e) {
        e.preventDefault();
        riskModal.classList.add('active');
    });

    // Close risk modal
    closeRiskModal.addEventListener('click', function () {
        riskModal.classList.remove('active');
    });

    // Close info modal
    if (closeInfoModal) {
        closeInfoModal.addEventListener('click', function () {
            infoModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Accept risks button handler
    acceptRisksBtn.addEventListener('click', function () {
        acceptRisksCheckbox.checked = true;
        riskModal.classList.remove('active');
    });

    // QRIS Payment button handler
    qrisPaymentBtn.addEventListener('click', function () {
        const customerName = document.getElementById('customerName').value;
        const gameId = document.getElementById('gameId').value;
        const gameServer = document.getElementById('gameServer').value;

        // Validate form
        if (!customerName || !gameId || !gameServer || !acceptRisksCheckbox.checked) {
            alert('Silakan lengkapi semua data dan setujui syarat & ketentuan');
            return;
        }

        // Set QRIS modal content
        qrisProductName.textContent = currentProduct.name;
        qrisProductPrice.textContent = currentProduct.price;

        // Hide order modal and show QRIS modal
        orderModal.classList.remove('active');
        qrisModal.classList.add('active');
    });

    // Close QRIS modal
    closeQrisModal.addEventListener('click', function () {
        qrisModal.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling again
    });

    // Confirm payment button handler
    confirmPaymentBtn.addEventListener('click', function () {
        const customerName = document.getElementById('customerName').value;
        const gameId = document.getElementById('gameId').value;
        const gameServer = document.getElementById('gameServer').value;

        // Prepare WhatsApp message
        const whatsappNumber = '6289519301487';
        const message = encodeURIComponent(
            `*TOPUP MOBILE LEGENDS*\n\n` +
            `*Produk:* ${currentProduct.name}\n` +
            `*Harga:* ${currentProduct.price}\n\n` +
            `*Data Pembeli:*\n` +
            `Nama: ${customerName}\n` +
            `Game ID: ${gameId}\n` +
            `Server: ${gameServer}\n` +
            `Tanggal: ${formattedDate}\n\n` +
            `*"Produk akan dikirim setelah pembayaran kamu berhasil diselesaikan. Terima kasih!"*\n\n` +
            `*NOTE:* _Mohon sertakan screenshot bukti pembayaran QRIS._`
        );

        // Open WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

        // Close QRIS modal
        qrisModal.classList.remove('active');
        document.body.style.overflow = '';

        // Show success notification
        successNotification.classList.add('active');

        // Hide success notification after 5 seconds
        setTimeout(() => {
            successNotification.classList.remove('active');
        }, 5000);

        // Reset form
        orderForm.reset();
        orderDate.value = formattedDate; // Reset date field to current date
    });

    // Close modals when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.target === qrisModal) {
            qrisModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.target === riskModal) {
            riskModal.classList.remove('active');
        }
        if (e.target === infoModal) {
            infoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add swipe functionality for modals on touch devices
    const modals = [orderModal, qrisModal, riskModal, infoModal];
    modals.forEach(modal => {
        if (!modal) return;

        let startY = 0,
            endY = 0;

        modal.addEventListener('touchstart', function (e) {
            startY = e.touches[0].clientY;
        }, {
            passive: true
        });

        modal.addEventListener('touchmove', function (e) {
            endY = e.touches[0].clientY;
        }, {
            passive: true
        });

        modal.addEventListener('touchend', function () {
            if (endY - startY > 100) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
            startY = 0;
            endY = 0;
        }, {
            passive: true
        });
    });

    // Show products with staggered animation
    const animateElements = document.querySelectorAll('.slide-up');
    animateElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 50 * index);
    });
});