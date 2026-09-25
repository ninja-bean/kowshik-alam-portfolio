/**
 * cursor-glow.js — Subtle Monochrome Mouse-Follow Highlight on Glass Cards
 * Md. Kowshik Alam | Finance & Accounts Portfolio
 */

(function () {
  'use strict';

  // Only enable on devices with hover/pointer capability
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.glass-glow, .glass-interactive');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
})();
