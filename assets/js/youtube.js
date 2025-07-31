document.addEventListener('DOMContentLoaded', function () {
    // Get all elements
    const productItems = document.querySelectorAll('.product-item');
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

    // Set current date
    const today = new Date();
    const formattedDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    orderDate.value = formattedDate;

    // Current selected product data
    let currentProduct = {
        name: '',
        price: '',
        type: ''
    };

    // Product item click handler
    productItems.forEach(item => {
        // Only add click listeners to product items, not FAQ items
        if (item.dataset.productName) {
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
                if (currentProduct.type === 'YouTube Premium') {
                    modalProductLogo.src =
                        "../assets/image/logo/apk/youtube.png";
                }

                // Show the modal with animation
                orderModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        }
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

    // Accept risks button handler
    acceptRisksBtn.addEventListener('click', function () {
        acceptRisksCheckbox.checked = true;
        riskModal.classList.remove('active');
    });

    // QRIS Payment button handler
    qrisPaymentBtn.addEventListener('click', function () {
        const customerName = document.getElementById('customerName').value;

        // Validate form
        if (!customerName || !acceptRisksCheckbox.checked) {
            alert('Silakan lengkapi nama Anda dan setujui syarat & ketentuan');
            return;
        }

        // Set QRIS modal content
        qrisProductName.textContent = currentProduct.name;
        qrisProductPrice.textContent = currentProduct.price;

        // Hide order modal and show QRIS modal
        orderModal.classList.remove('active');
        qrisModal.classList.add('active');
    });

    // Confirm payment button handler
    confirmPaymentBtn.addEventListener('click', function () {
        const customerName = document.getElementById('customerName').value;

        // Prepare WhatsApp message
        const whatsappNumber = '6289519301487';
        const message = encodeURIComponent(
            `*TOPUP YOUTUBE PREMIUM*\n\n` +
            `*Produk:* ${currentProduct.name}\n` +
            `*Harga:* ${currentProduct.price}\n\n` +
            `*Data Pembeli:*\n` +
            `Nama: ${customerName}\n` +
            `Tanggal: ${formattedDate}\n\n` +
            `Setelah Melakukan pembayaran Tunggu admin menanggapi pesanan mu \n` +
            `*Admin akan membalas chat dari bawah , di usahakan jangan spam ya !*\n\n` +
            `*NOTE:* _Mohon sertakan screenshot bukti pembayaran QRIS._`
        );

        // Try to use the device-specific direct method first
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Direct to WhatsApp app on mobile
            window.location.href = `whatsapp://send?phone=${whatsappNumber}&text=${message}`;
        } else {
            // For desktop, use the web version
            window.open(`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${message}`, '_self');
        }

        // Show success notification immediately
        qrisModal.classList.remove('active');
        document.body.style.overflow = '';
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
    });

    // Add touchstart swipe down to close capability
    let startY = 0;
    let endY = 0;

    orderModal.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    }, false);

    orderModal.addEventListener('touchmove', function (e) {
        endY = e.touches[0].clientY;
    }, false);

    orderModal.addEventListener('touchend', function (e) {
        if (endY - startY > 100) { // If swiped down more than 100px
            orderModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        startY = 0;
        endY = 0;
    }, false);

    // Same swipe functionality for QRIS modal
    qrisModal.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    }, false);

    qrisModal.addEventListener('touchmove', function (e) {
        endY = e.touches[0].clientY;
    }, false);

    qrisModal.addEventListener('touchend', function (e) {
        if (endY - startY > 100) {
            qrisModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        startY = 0;
        endY = 0;
    }, false);
});

document.addEventListener('DOMContentLoaded', function () {
    // Package types and their explanations
    const packageInfo = {
        "YOUTUBE LIST": {
            "title": "FAMILY HEAD",
            "description": "I Private<br>I No Garansi<br>I Tidak bisa ganti email dan password"
        },
        "FAMILY PLAN": {
            "title": "FAMILY PLAN",
            "description": "I Acc cust only, acc store +2k<br>I Udah join famp 2x = harus pake akun/gmail fresh<br>I Tidak bisa ganti email dan password"
        },
        "INDIVIDU PLAN": {
            "title": "INDIVIDU PLAN",
            "description": "I Private<br>I Garansi sesuai paket yang dipilih<br>I Full durasi sesuai paket<br>I Tidak bisa ganti email dan password"
        }
    };

    // Add info icons to each section header
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const titleText = header.querySelector('h2').textContent;
        const infoIcon = document.createElement('i');
        infoIcon.className = 'fas fa-question-circle info-icon';
        infoIcon.setAttribute('data-package', titleText);
        header.appendChild(infoIcon);
    });

    // Create the info modal HTML
    const infoModalHTML = `
    <div class="modal-overlay" id="infoModal">
        <div class="modal-container">
            <div class="drag-indicator"></div>

            <div class="modal-header">
                <h2 id="infoModalTitle">Informasi Paket</h2>
                <button class="close-modal" id="closeInfoModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="info-content" id="infoModalContent">
                <!-- Content will be inserted here -->
            </div>
        </div>
    </div>
    `;

    // Add the modal to the body
    document.body.insertAdjacentHTML('beforeend', infoModalHTML);

    // Get modal elements
    const infoModal = document.getElementById('infoModal');
    const infoModalTitle = document.getElementById('infoModalTitle');
    const infoModalContent = document.getElementById('infoModalContent');
    const closeInfoModal = document.getElementById('closeInfoModal');

    // Add click event listeners to info icons
    const infoIcons = document.querySelectorAll('.info-icon');
    infoIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const packageName = this.getAttribute('data-package');
            const info = packageInfo[packageName];

            if (info) {
                infoModalTitle.textContent = info.title;
                infoModalContent.innerHTML = info.description;
                infoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close info modal
    closeInfoModal.addEventListener('click', function () {
        infoModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === infoModal) {
            infoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add swipe down to close
    let startY = 0;
    let endY = 0;

    infoModal.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    }, false);

    infoModal.addEventListener('touchmove', function (e) {
        endY = e.touches[0].clientY;
    }, false);

    infoModal.addEventListener('touchend', function (e) {
        if (endY - startY > 100) {
            infoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        startY = 0;
        endY = 0;
    }, false);
});