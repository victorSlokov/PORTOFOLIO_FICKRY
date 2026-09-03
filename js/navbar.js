
    // 1. Simpan data gambar kamu di sini
    const myArtworks = [
        { title: "Ibis Paint X Art", image: "img/kaiju.jpeg" },
        { title: "Coloring Project", image: "img/MLBB.jpeg" },
        { title: "Character Design", image: "img/orang 1.png" },
        { title: "Manga Sketch", image: "img/komik.jpeg" },
        // Kamu tinggal tambah baris baru di sini kalau ada karya baru!
    ];

    const gridContainer = document.getElementById('gallery-grid');

    // 2. Loop untuk merender setiap item
    myArtworks.forEach(art => {
        const cardHTML = `
            <div class="group relative overflow-hidden rounded-xl shadow-md bg-white border border-gray-200">
                <img src="${art.image}" alt="${art.title}" class="w-full h-64 object-cover transition transform group-hover:scale-110">
                <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white p-4">
                    <p class="font-bold text-center">${art.title}</p>
                    <button class="mt-2 text-xs bg-white text-black px-4 py-1 rounded-full shadow-sm">View Details</button>
                </div>
            </div>
        `;
        
        gridContainer.innerHTML += cardHTML;
    });
