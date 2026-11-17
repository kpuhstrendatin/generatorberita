# Generator Cover Berita KPU Kabupaten Hulu Sungai Tengah

Aplikasi web satu halaman untuk membuat cover berita dari template PNG.
Judul santai diubah menjadi judul formal dan narasi satu kalimat dibuat
otomatis menggunakan Gemini API.

## Fitur
- Pilih template dari folder `templates/`
- Upload foto, atur zoom dan posisi
- Tanggal otomatis hari ini atau manual
- Formalisasi judul dan pembuatan narasi dengan Gemini
- Riwayat judul di browser
- Unduh hasil dalam format PNG 1080×1350

## Struktur folder

```
kpu-cover-generator/
├── index.html
├── templates/
│   └── 1__Sampul_Judul-5.png
├── README.md
└── .gitignore
```

## Cara menjalankan

Buka folder ini di terminal, lalu jalankan server lokal:

```
python -m http.server 8000
```

Setelah itu buka http://localhost:8000 di Chrome atau Edge.

Membuka `index.html` langsung dari File Explorer tidak disarankan, karena
template tidak akan termuat dan unduhan PNG bisa gagal.

## Gemini API key

Masukkan API key di bagian Pengaturan AI. Key disimpan di localStorage
browser dan tidak pernah ditulis ke repositori. Gunakan key khusus dan
batasi penggunaannya di Google AI Studio.

## Menambah template

1. Letakkan file PNG berukuran 1080×1350 di folder `templates/`.
2. Tambahkan entri pada daftar `TEMPLATES` di `index.html`.

## Publikasi dengan GitHub Pages

Buka **Settings → Pages**, pilih branch `main` dan folder `/ (root)`.
Aplikasi akan tersedia di `https://USERNAME.github.io/kpu-cover-generator/`.
