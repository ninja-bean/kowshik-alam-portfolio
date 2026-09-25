/**
 * main.js — Navigation, Theme Toggle, Rotating Words, Filters & Interactivity
 * Md. Kowshik Alam | Finance & Accounts Portfolio
 */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1. Theme Management (Strictly Monochrome: Dark Default / Light Option)
     --------------------------------------------------------------------- */
  const THEME_KEY = 'kowshik-portfolio-theme';
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // Dark mode is the primary corporate portfolio default
    return 'dark';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    if (themeIconSun && themeIconMoon) {
      if (theme === 'light') {
        themeIconSun.style.display = 'none';
        themeIconMoon.style.display = 'block';
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        themeIconSun.style.display = 'block';
        themeIconMoon.style.display = 'none';
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      }
    }
  };

  // Initial theme application
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* ---------------------------------------------------------------------
     2. Hero Rotating Specialty Cycle
     --------------------------------------------------------------------- */
  const rotatingEl = document.getElementById('rotating-specialty');
  if (rotatingEl) {
    const specialties = [
      'Fixed Asset Management',
      'Financial Planning & Reporting',
      'Lease Accounting (IFRS 16)',
      'Statutory & Internal Audit',
      'SAP & SOx Compliance'
    ];
    let currentIndex = 0;

    setInterval(() => {
      rotatingEl.style.opacity = '0';
      rotatingEl.style.transform = 'translateY(6px)';

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % specialties.length;
        rotatingEl.textContent = specialties[currentIndex];
        rotatingEl.style.opacity = '1';
        rotatingEl.style.transform = 'translateY(0)';
      }, 250);
    }, 3200);
  }

  /* ---------------------------------------------------------------------
     3. Header Scroll State & Scrollspy Active Navigation
     --------------------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = Array.from(navLinks).map((link) => {
    const id = link.getAttribute('href').substring(1);
    return document.getElementById(id);
  }).filter(Boolean);

  const handleScroll = () => {
    // Header scrolled class
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scrollspy
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------------------------------------------------------------------
     4. Mobile Navigation Drawer
     --------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileCloseBtn = document.getElementById('mobile-menu-close-btn');
  const navMenu = document.getElementById('nav-menu');

  const openMobileMenu = () => {
    if (!navMenu) return;
    navMenu.classList.add('open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    // Close on link click
    navMenu.querySelectorAll('.nav-link, .nav-menu-cv-link').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== mobileToggle) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ---------------------------------------------------------------------
     5. Timeline Accordion Expansion
     --------------------------------------------------------------------- */
  const timelineCards = document.querySelectorAll('.timeline-card');
  timelineCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('collapsed');
      const isCollapsed = card.classList.contains('collapsed');
      const toggleText = card.querySelector('.timeline-accordion-toggle span');
      if (toggleText) {
        toggleText.textContent = isCollapsed ? 'View Key Responsibilities' : 'Collapse Details';
      }
    });

    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'true');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ---------------------------------------------------------------------
     6. Portfolio Filter Tabs
     --------------------------------------------------------------------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterTabs.length && portfolioCards.length) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');

        portfolioCards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     7. Toast & Clipboard Copy Actions
     --------------------------------------------------------------------- */
  const toast = document.getElementById('toast');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  };

  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  const fallbackCopy = (text) => {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(`Copied: ${text}`);
  };

  /* ---------------------------------------------------------------------
     8. Contact Form Handling (Free Direct In-Browser Email Delivery)
     --------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const statusMsg = document.getElementById('contact-status');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim() || 'Professional Inquiry for Kowshik Alam';
      const message = document.getElementById('contact-message').value.trim();
      const honey = contactForm.querySelector('input[name="_honey"]')?.value;

      if (honey) {
        // Honeypot caught spam bot — quietly exit
        return;
      }

      if (!name || !email || !message) {
        showToast('Please complete all required fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.');
        return;
      }

      // Button loading state
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Sending Message...</span>
      `;

      try {
        const response = await fetch('https://formsubmit.co/ajax/kowshik3066@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
            _template: 'table',
            message: message
          })
        });

        const data = await response.json();

        if (data.success === 'true' || data.success === true) {
          showToast('✓ Thank you! Your message was sent to Kowshik.');
          if (statusMsg) {
            statusMsg.style.display = 'block';
            statusMsg.style.background = 'rgba(255, 255, 255, 0.06)';
            statusMsg.style.border = '1px solid var(--border)';
            statusMsg.style.color = 'var(--text-primary)';
            statusMsg.textContent = '✓ Message delivered successfully. Kowshik will get back to you shortly!';
          }
          contactForm.reset();
        } else if (data.message && data.message.includes('Activation')) {
          showToast('Activation email sent to kowshik3066@gmail.com. Check inbox!');
          if (statusMsg) {
            statusMsg.style.display = 'block';
            statusMsg.style.background = 'rgba(255, 255, 255, 0.06)';
            statusMsg.style.border = '1px solid var(--border)';
            statusMsg.style.color = 'var(--text-primary)';
            statusMsg.textContent = 'First-time setup: A one-time activation link was sent to kowshik3066@gmail.com. Please click "Activate Form" in your inbox to enable submissions.';
          }
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('Network submission fallback to mailto:', err);
        const mailtoUrl = `mailto:kowshik3066@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;
        showToast('Connecting via your email client...');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    });
  }

  /* ---------------------------------------------------------------------
     9. Back to Top Button
     --------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
