document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            // Lepas class saat elemen keluar viewport,
            // supaya animasi otomatis keputer ulang pas balik kelihatan lagi
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        root: null, // Memantau layar utama (viewport)
        rootMargin: "0px",
        threshold: 0.1 // Berjalan saat 10% elemen terlihat
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback jika tidak didukung
    animatedElements.forEach((el) => el.classList.add("in-view"));
  }
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
