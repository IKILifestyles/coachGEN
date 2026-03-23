/* ================================================
   TRUST Coaching & Consulting – Interactive Scripts
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Sticky Header ---------- */
    const header = document.getElementById('header');
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile Menu ---------- */
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* ---------- Scroll-triggered Animations ---------- */
    const animEls = document.querySelectorAll('.animate-on-scroll');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        animEls.forEach(el => observer.observe(el));
    } else {
        animEls.forEach(el => el.classList.add('visible'));
    }

    /* ---------- Counter Animation ---------- */
    const counters = document.querySelectorAll('.stat-card__number');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 60));
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = current;
                }, 25);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));

    /* ---------- FAQ Accordion ---------- */
    document.querySelectorAll('.faq-item__q').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close all
            document.querySelectorAll('.faq-item__q').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling.classList.remove('open');
            });

            // Toggle current
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            }
        });
    });

    /* ---------- Smooth Scroll ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = header.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ---------- Contact Form ---------- */
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            // Basic validation
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            if (!name || !email) return;

            // Show success
            success.classList.add('show');
            form.reset();

            setTimeout(() => {
                success.classList.remove('show');
            }, 5000);
        });
    }

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveNav, { passive: true });

});
