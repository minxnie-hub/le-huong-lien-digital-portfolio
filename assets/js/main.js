
(() => {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-button');
  if (menu && header) {
    menu.addEventListener('click', () => {
      const open = header.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded', String(open));
    });
    header.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      header.classList.remove('menu-open'); menu.setAttribute('aria-expanded','false');
    }));
  }

  const progress = document.querySelector('.reading-progress');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
  };
  addEventListener('scroll', updateProgress, {passive:true}); updateProgress();

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), {threshold:.08, rootMargin:'0px 0px -30px'});
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));
  setTimeout(() => reveals.forEach(el => el.classList.add('visible')), 1400);

  const toc = document.querySelector('.page-toc');
  const headings = [...document.querySelectorAll('.report h2[id], .report h3[id]')];
  if (toc && headings.length) {
    headings.forEach(h => {
      const a = document.createElement('a');
      a.href = '#' + h.id; a.textContent = h.textContent.replace(/^✦\s*/, '');
      a.className = 'level-' + h.tagName.slice(1);
      toc.appendChild(a);
    });
    const links = [...toc.querySelectorAll('a')];
    const mark = () => {
      let current = headings[0]?.id;
      headings.forEach(h => { if (h.getBoundingClientRect().top < 160) current = h.id; });
      links.forEach(a => a.classList.toggle('active', a.hash === '#' + current));
    };
    addEventListener('scroll', mark, {passive:true}); mark();
  }

  const box = document.querySelector('.lightbox');
  if (box) {
    const img = box.querySelector('img');
    const close = () => { box.classList.remove('open'); box.setAttribute('aria-hidden','true'); img.removeAttribute('src'); };
    document.querySelectorAll('[data-lightbox-src]').forEach(btn => btn.addEventListener('click', () => {
      img.src = btn.dataset.lightboxSrc; img.alt = btn.querySelector('img')?.alt || 'Ảnh phóng to';
      box.classList.add('open'); box.setAttribute('aria-hidden','false');
    }));
    box.querySelector('.lightbox-close').addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }
})();
