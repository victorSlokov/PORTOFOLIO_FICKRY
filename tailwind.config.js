/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"], // Sesuaikan dengan struktur foldermu
  theme: {
    extend: {
      fontFamily: {
        // Nama key bebas, contoh di sini diberi nama 'vampyrish'
        'vam': ['DancingVampyrish', 'sans-serif'],
        'broken': ['BROKEN15', 'sans-serif'],
        'clash': ['clash', 'bold'],
      },
    },
  },
  plugins: [],
}