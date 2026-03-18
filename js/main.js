document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 1.1 Set Hero Video Speed
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.playbackRate = 0.8;
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    mobileBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');

        // Toggle icon between menu and x
        const iconNode = mobileBtn.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            iconNode.setAttribute('data-lucide', 'x');
        } else {
            iconNode.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons(); // re-render icons
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileBtn.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // 4. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-item');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Trigger immediately for elements already in viewport (like hero)
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // =============================================
    // 5. Contact Form → Google Sheets + Email
    // =============================================
    // ⚠️ URL Web App Google Apps Script
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_S4rbpC8yGGbFHZ1yHT6oSl6RIwguVweyd4lxPqVpVPS2OQh0vHoWhInnvbbWHE2u/exec';

    const coachingForm = document.getElementById('coaching-form');
    const submitBtn = coachingForm ? coachingForm.querySelector('button[type="submit"]') : null;

    if (coachingForm) {
        coachingForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Lấy dữ liệu form
            const formData = new FormData(coachingForm);
            const formObj = Object.fromEntries(formData.entries());

            // Đổi trạng thái nút bấm
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Đang gửi... <i data-lucide="loader-2" style="margin-left:8px;width:18px;height:18px;animation:spin 1s linear infinite;"></i>';
            submitBtn.disabled = true;

            try {
                // Gửi dữ liệu đến Google Apps Script
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formObj)
                });

                // Thông báo thành công
                submitBtn.innerHTML = '✅ Đã gửi thành công!';
                submitBtn.style.background = '#22c55e';
                coachingForm.reset();

                // Reset nút sau 3 giây
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    lucide.createIcons();
                }, 3000);

            } catch (error) {
                console.error('Lỗi gửi form:', error);
                submitBtn.innerHTML = '❌ Có lỗi, thử lại';
                submitBtn.style.background = '#ef4444';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    lucide.createIcons();
                }, 3000);
            }
        });
    }

});
