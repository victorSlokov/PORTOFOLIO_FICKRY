document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. EFEK TYPING TEXT COVER
  // ==========================================
  const textToType = "FICKRY   ABDI   RABBANI.";
  const typedTextElement = document.getElementById("typed-text");

  if (typedTextElement) {
    let index = 0;
    let isDeleting = false;
    const typingSpeed = 100;   // Kecepatan ketik (ms)
    const deletingSpeed = 50;  // Kecepatan menghapus (ms)
    const pauseTime = 2000;    // Jeda saat teks selesai diketik (ms)

    function typeEffect() {
      if (!isDeleting) {
        typedTextElement.textContent = textToType.substring(0, index + 1);
        index++;

        if (index === textToType.length) {
          isDeleting = true;
          setTimeout(typeEffect, pauseTime);
          return;
        }
      } else {
        typedTextElement.textContent = textToType.substring(0, index - 1);
        index--;

        if (index === 0) {
          isDeleting = false;
        }
      }

      const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
      setTimeout(typeEffect, currentSpeed);
    }

    typeEffect();
  }


  // ==========================================
  // CEK DUKUNGAN INTERSECTION OBSERVER
  // ==========================================
  if (!("IntersectionObserver" in window)) {
    // Fallback jika browser sangat lama/tidak mendukung Observer
    document.querySelectorAll("[data-animate], #aboutImg, .stack-slide-1")
      .forEach((el) => el.classList.add("in-view"));
  } else {

    // ==========================================
    // 2. OBSERVER UNTUK ANIMASI DATA-ANIMATE (2-WAY SCROLL)
    // ==========================================
    const animateObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => animateObserver.observe(el));


    // ==========================================
    // 3. OBSERVER SLIDE ABOUT ME (HANYA SEKALI RUN)
    // ==========================================
    const aboutImg = document.getElementById("aboutImg");

    if (aboutImg) {
      const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutImg.classList.add("in-view");
            aboutObserver.unobserve(entry.target); // Hentikan pemantauan setelah muncul
          }
        });
      }, { threshold: 0.3 });

      aboutObserver.observe(aboutImg);
    }


    // ==========================================
    // 4. OBSERVER STACK SLIDE & SCATTER ANIMATION
    // ==========================================
    const stackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;

          if (entry.isIntersecting) {
            target.classList.remove("slide-hidden");
            target.classList.add("in-view");
          } else {
            target.classList.remove("in-view");
            target.classList.add("slide-hidden");
          }
        });
      },
      { threshold: 0.2 } // Pemicu saat 20% slide masuk/keluar
    );

    document.querySelectorAll(".stack-slide-1").forEach((slide) => stackObserver.observe(slide));
  }

});


// ==========================================
// 5. PRELOADER HILANG SAAT SEMUA GAMBAR/ASSET READY
// ==========================================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("preloader-hidden");

      // Refresh kalkulasi posisi GSAP ScrollTrigger jika dipakai di file lain
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 300);
  }
});

// Fungsi Membuka Zoom & Mengunci Scroll
function openZoom(element) {
  const modal = document.getElementById("imageZoomModal");
  const modalImg = document.getElementById("zoomedImage");

  if (modal && modalImg) {
    modalImg.src = element.src;
    modal.classList.add("active");
    document.body.classList.add("no-scroll"); // Mengunci scroll halaman
  }
}

// Fungsi Menutup Zoom & Membuka Kunci Scroll
function closeZoom() {
  const modal = document.getElementById("imageZoomModal");

  if (modal) {
    modal.classList.remove("active");
    document.body.classList.remove("no-scroll"); // Mengembalikan scroll halaman
  }
}

// Menutup modal dengan tombol ESC di keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeZoom();
  }
});