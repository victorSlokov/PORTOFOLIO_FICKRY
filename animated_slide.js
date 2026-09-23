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