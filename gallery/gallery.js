document.addEventListener("DOMContentLoaded", function () {
  const totalFoto = 22;
  const folderPath = "gallery/ttb/";
  const fileNamePrefix = "page_";
  const fileExtension = ".webp";

  const container = document.querySelector(".gallery-container");
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModalBtn = document.querySelector(".modal-close");

  // Map file khusus pop-up untuk page 10, 11, dan 12
  // Sesuaikan nama file berikut dengan file asli di folder gallery/ttb/
  const customPopups = {
    10: "popup_10.webp", // File khusus pop-up page 10
    11: "popup_11.webp",  // File khusus pop-up page 11
    12: "popup_12.webp"     // File khusus pop-up page 12
  };

  if (!container) return;

  const layoutPattern = [
    "item-square", "item-tall",   "item-wide",
    "item-square", "item-square", "item-square",
    "item-wide",   "item-square", "item-square",
    "item-tall",   "item-tall",   "item-tall",
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
        // Cek apakah angka 'i' memiliki file gambar khusus di objek customPopups
        if (customPopups[i]) {
          modalImg.src = `${folderPath}${customPopups[i]}`;
        } else {
          // Gambar standar untuk page lainnya
          modalImg.src = this.src;
        }

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