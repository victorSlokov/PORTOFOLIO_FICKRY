const textToType = "FICKRY   ABDI   RABBANI.";
const typedTextElement = document.getElementById("typed-text");

let index = 0;
let isDeleting = false;
const typingSpeed = 100;   // Kecepatan ketik (ms)
const deletingSpeed = 50;  // Kecepatan menghapus (ms)
const pauseTime = 2000;    // Jeda saat teks selesai diketik (ms)

function typeEffect() {
  if (!isDeleting) {
    // Efek Mengetik
    typedTextElement.textContent = textToType.substring(0, index + 1);
    index++;

    if (index === textToType.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }
  } else {
    // Efek Menghapus
    typedTextElement.textContent = textToType.substring(0, index - 1);
    index--;

    if (index === 0) {
      isDeleting = false;
    }
  }

  const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeEffect, currentSpeed);
}

// Jalankan efek ketika halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});





/* ============================================================
   SLIDE 2 — ABOUT ME
   Animasi ilustrasi hanya diputar sekali, saat slide About Me
   pertama kali terlihat di layar (bukan setiap kali di-scroll).
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const aboutImg = document.getElementById("aboutImg");

  if (aboutImg && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutImg.classList.add("in-view");
          observer.unobserve(entry.target); // hanya sekali
        }
      });
    }, { threshold: 0.3 });

    observer.observe(aboutImg);
  } else if (aboutImg) {
    // fallback jika IntersectionObserver tidak didukung
    aboutImg.classList.add("in-view");
  }
});
