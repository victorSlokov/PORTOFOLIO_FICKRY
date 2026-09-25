document.addEventListener("DOMContentLoaded", function () {
  const totalFoto = 11;
  const folderPath = "asset_pixel/ttb/"; // Ditambahkan '/' agar folder benar
  const fileNamePrefix = "asset_";
  const fileExtension = ".webp";

  const container = document.querySelector(".gallery-container-slide-2");
  const modal = document.getElementById("image-modal-slide-2");
  const modalImg = document.getElementById("modal-img-slide-2");
  const closeModalBtn = document.querySelector(".modal-close-slide-2");

  if (!container) return;

const layoutPattern = [
  // BARIS 1 & 2
  "item-extra-wide", // Foto 1: Poster utama (lebar 3 kolom)
  "item-square",       // Foto 2: Karakter sheriff berdiri di kanan (tinggi 2 baris)
  "item-square",     // Foto 3: Menu Pengaturan
  "item-square",     // Foto 4: Karakter tengah
  "item-square",     // Foto 5: Peta / dokumen

  // BARIS 3
  "item-square",     // Foto 6: In-game gameplay 1
  "item-square",     // Foto 7: In-game gameplay 2
  "item-square",     // Foto 8: In-game gameplay 3
  "item-square",     // Foto 9: Ilustrasi siluet kanan

  // BARIS 4
  "item-square", // Foto 10: Ilustrasi poster buronan (lebar 3 kolom)
  "item-square",     // Foto 11: Kotak teks informasi kanan


];

  for (let i = 1; i <= totalFoto; i++) {
    const itemDiv = document.createElement("div");
    const assignedClass = layoutPattern[(i - 1) % layoutPattern.length];
    itemDiv.className = `gallery-item ${assignedClass}`;

    const img = document.createElement("img");
    img.src = `${folderPath}${fileNamePrefix}${i}${fileExtension}`;
    img.alt = `Work ${i}`;
    img.loading = "lazy";
    img.style.cursor = "pointer";

    // Fallback jika file 2 digit (01, 02, dst)
    img.onerror = function() {
      if (!this.dataset.triedPad) {
        this.dataset.triedPad = "true";
        const pad2 = String(i).padStart(2, '0');
        this.src = `${folderPath}${fileNamePrefix}${pad2}${fileExtension}`;
      }
    };

    // EVENT CLICK: Buka Modal saat Gambar Diklik
    img.addEventListener("click", function () {
      if (modal && modalImg) {
        modalImg.src = this.src;
        modal.classList.add("active");
      }
    });

    itemDiv.appendChild(img);
    container.appendChild(itemDiv);
  }

  // EVENT CLOSE: Tutup saat tombol silang diklik
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      modal.classList.remove("active");
    });
  }

  // EVENT CLOSE: Tutup saat area luar gambar (overlay) diklik
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  // EVENT CLOSE: Tutup saat menekan tombol ESC di keyboard
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });
});