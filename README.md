# 🧠 NeuroNav (Neuro Navigation)
> **Model Komputasi DWT-MSCNN-ViT untuk Klasifikasi Multivariabel Imajinasi Gerak & Tingkat Fokus Berbasis EEG pada Kendali Kursi Roda Disabilitas Motorik**

Penelitian Program Kreativitas Mahasiswa Bidang Riset Eksakta (**PKM-RE**) tahun 2026 dari **Fakultas Sains dan Informatika, Universitas Jenderal Achmad Yani (UNJANI)**.

---

## 🌟 Ringkasan Penelitian
Penyandang disabilitas motorik berat seperti paska stroke dan ALS (mencapai 4,6 juta jiwa di Indonesia) mengalami kesulitan dalam mengoperasikan kursi roda elektrik fisik. *Brain-Computer Interface* (BCI) berbasis *Motor Imagery* (Imajinasi Gerak) menawarkan solusi kendali pikiran, namun **keamanan pengguna sangat bergantung pada tingkat fokus**.

NeuroNav mengintegrasikan 3 arsitektur unggulan:
1. **Discrete Wavelet Transform (DWT)**: Ekstraksi pita frekuensi Mu (8–13 Hz), Beta (14–30 Hz), Alfa (8–13 Hz), dan Gamma (>30 Hz).
2. **Multi-Scale Convolutional Neural Network (MSCNN)**: Ekstraksi fitur spasial-temporal multi-skala dinamis melalui 3 cabang paralel (kernel 16, 32, 64).
3. **Vision Transformer (ViT)**: Pemetaan patch citra sinyal dan *multi-head self-attention* untuk menangkap hubungan global spasial-temporal simultan.

---

## 📊 Kinerja & Hasil Uji
- **Akurasi Uji Data Pembanding (Offline)**: **90%** (Precision 90%, Recall 90%, F1-Score 90%)
- **Akurasi Uji Data Rekaman**: **87%** (Generalisasi stabil, selisih 3%)
- **Akurasi Uji Real-Time**: **85%** dengan waktu respon hanya **0.4 detik** (Emotiv Epoc+ 14-Channel)
- **Uji Ablasi**:
  - Tanpa ViT: Akurasi turun drastis hingga **23%** (↓66%)
  - Tanpa MSCNN: Akurasi turun menjadi **59%** (↓31%)
  - Tanpa DWT: Akurasi turun menjadi **82%** (↓8%)

---

## 📜 Luaran Resmi Riset
- **Hak Cipta Program Komputer**: Nomor Pencatatan Resmi Kemenkumham **EC002026165597**
- **Publikasi Jurnal**: Disubmit ke *Jurnal Rekayasa Sistem dan Teknologi Informasi (RESTI)* **Sinta 2**
- **Media Sosial Edukasi**: Instagram [@pkmre.neuronav](https://www.instagram.com/pkmre.neuronav) (1.260+ pengikut, 34.200+ tayangan)
- **Supervisi Medis**: Dr. Daswara Djajasasmita, Sp.N., M.Kes. (Neurolog) | Persetujuan Etik KEPK No: `M3.2607.035`

---

## 🚀 Panduan Deployment

### 1. Deploy ke GitHub Pages
Repositori ini adalah static website murni (HTML5, Vanilla CSS, Vanilla JS):
1. Buka repositori di GitHub: `https://github.com/fl111x/PKMRE-NeuroNav`
2. Masuk ke menu **Settings** > **Pages**.
3. Pada bagian **Build and deployment > Source**, pilih branch `main` (atau `master`) dan folder `/ (root)`.
4. Klik **Save**. Dalam 1-2 menit, landing page akan aktif di:
   ```
   https://fl111x.github.io/PKMRE-NeuroNav/
   ```

### 2. Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **Add New Project** > **Import Git Repository**.
3. Pilih repositori `fl111x/PKMRE-NeuroNav`.
4. Klik **Deploy** (Pengaturan framework otomatis terdeteksi dengan file `vercel.json`).

---

## 👥 Tim Peneliti
- **Ketua Peneliti**: Ammar Bagas Fathurrahman Wantoro
- **Supervisor Neurolog**: Dr. Daswara Djajasasmita, Sp.N., M.Kes.
- **Institusi**: Program Studi Informatika, Fakultas Sains dan Informatika, Universitas Jenderal Achmad Yani
