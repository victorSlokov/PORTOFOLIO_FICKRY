document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("dashboard-header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    // Mengambil jarak scroll dari atas
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Menghindari bug scroll negatif di perangkat iOS (bounce effect)
    if (currentScroll < 0) return;

    if (currentScroll > lastScrollTop && currentScroll > 50) {
      // Jika di-scroll KE BAWAH & sudah melewati 50px -> Sembunyikan
      header.classList.add("hide");
    } else {
      // Jika di-scroll KE ATAS -> Tampilkan kembali
      header.classList.remove("hide");
    }

    // Simpan posisi scroll terakhir
    lastScrollTop = currentScroll;
  });
});