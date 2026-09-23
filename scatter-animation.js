/**
 * Scatter Animation Module (Loop / 2-Way Scroll)
 * Elemen berkumpul saat masuk viewport, dan berpencar kembali saat keluar.
 */
(function initScatterAnimation() {
  document.addEventListener('DOMContentLoaded', () => {
    const scatterObserverOptions = {
      threshold: 0.25 // Terpicu saat 25% area slide terlihat
    };

    const scatterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Saat slide MASUK layar -> Tambah kelas (elemen berkumpul)
          entry.target.classList.add('in-view');
        } else {
          // Saat slide KELUAR layar -> Hapus kelas (elemen berpencar/tutup kembali)
          entry.target.classList.remove('in-view');
        }
      });
    }, scatterObserverOptions);

    // Ambil semua section atau slide pembungkus
    const scatterTargets = document.querySelectorAll('section, .stack-slide-1');
    scatterTargets.forEach((target) => {
      scatterObserver.observe(target);
    });
  });
})();