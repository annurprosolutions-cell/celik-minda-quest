# Celik Minda Quest 🏡📚🐲

Permainan pengembaraan (PWA) untuk murid PASTI 5 & 6 tahun. Ia berdasarkan kertas Ujian Celik Minda PASTI dan Latihan Little Steps Mumtaz (SET 1–4).

## Aliran permainan
1. **Cipta watak**: pilih lelaki atau perempuan, tulis nama, dan pilih warna kulit, rambut/hijab, baju, seluar/kain serta aksesori. Watak perempuan sentiasa berhijab.
2. **Jalan di kampung**: guna anak panah/WASD, klik/ketik, atau joystick di telefon. Bercakap dengan NPC (Cikgu Aminah, Abang Faris, Kak Sarah).
3. **Masuk Rumah 5 Tahun atau Rumah 6 Tahun.**
4. **📖 Belajar**: 10 modul bagi setiap rumah (BM, Arab, BI, Jawi, Matematik, Sains). Kanak-kanak lihat semua kad dan dengar sebutan, kemudian lulus *Uji Faham*.
5. **📝 Kuiz**: hanya terbuka bila semua modul selesai ("ilmu penuh"). Setiap set 100 markah.
   - Set Latihan: SET 1–4 (5 & 6 Tahun)
   - Kertas Sebenar PASTI: 2020, 2021, 2024 (5 Tahun) dan 2020, 2021, 2022, 2024 (6 Tahun), dalam `js/papers.js`
6. **🐲 Bos**: soalan campuran dari semua subjek. Jawapan betul menyerang bos, dan banyak salah akan menghilangkan ❤️.
7. **📊 Rekod**: markah, bintang dan analisis kelemahan ikut subjek, dengan butang terus ke modul yang perlu diulang kaji.
8. **📚 Rujukan**: semua soalan beserta jawapan. Rujukan setiap set dibuka selepas set itu dijawab sekali.

## Corak soalan (ikut PDF)
| Dalam kertas | Dalam permainan |
|---|---|
| Padankan / Suaikan | **Tarik garisan** dari titik ke titik (atau ketik kiri, kemudian ketik kanan) |
| Bulatkan / Tandakan (✓) / Warnakan / Lorekkan | Ketik untuk bulatkan, tanda ✓ atau warnakan |
| Bulatkan semua huruf "p" dalam gambar | Huruf bertaburan atas gambar, ketik setiap satu |
| Isi tempat kosong / Fill in the blanks | **Seret jubin** huruf/suku kata/perkataan ke kotak (atau ketik) |
| Tulis nombor / jawapan kira | Taip nombor dalam kotak |
| Susun dan tulis semula | Ketik perkataan mengikut susunan |
| Lukis bentuk bulat | Ketik kotak untuk lukis ○ |
| Silang kata Jawi | Grid silang kata, isi dengan jubin huruf Jawi |

**Suara:** BM disebut dalam BM, BI dalam BI, dan Arab dalam Arab (Web Speech API). Jawi disebut dalam BM.
- BM guna suara Melayu (Malaysia). Suara Indonesia hanya dipakai jika peranti langsung tiada suara Melayu, dan aplikasi akan beritahu.
- Huruf konsonan disebut ikut nama huruf Malaysia (H = "eic", Z = "zed"), bukan cara Indonesia ("ha", "zet"). Vokal a, e, i, o, u kekal bunyi BM.
- Nombor dibaca dalam BM Malaysia (8 = "lapan", RM2 = "dua ringgit").
- Gambar dalam soalan English disebut dalam English (senarai `ICON_EN` dalam `js/data.js`). Jubin huruf Arab disebut nama hurufnya dalam Arab, dan jubin huruf Jawi dalam BM.

## Cara jalankan

### Di komputer (paling mudah)
Perlu Node.js (tiada pakej tambahan):
```bash
node server.js
```
Buka http://localhost:8080. Klik **📲 Pasang Aplikasi** (Chrome/Edge) untuk pasang sebagai aplikasi.

### Di telefon (PWA, boleh main tanpa internet)
PWA perlukan **HTTPS** untuk dipasang di telefon.

**Pilihan A — Netlify Drop (paling cepat, tiada Git):** seret folder `CelikMindaQuest` ke https://app.netlify.com/drop. Untuk kemas kini, seret semula folder ke laman projek (Deploys → drag & drop).

**Pilihan B — GitHub + Netlify (kemas kini automatik setiap kali push):**
```bash
git init
git add .
git commit -m "Celik Minda Quest v1.1"
git branch -M main
git remote add origin https://github.com/NAMA-ANDA/celik-minda-quest.git
git push -u origin main
```
Kemudian di Netlify: Add new site → Import from Git → pilih repo. Tiada build command, publish directory `.` (sudah ditetapkan dalam `netlify.toml`). Gunakan repo **Private**.

Selepas dibuka sekali, aplikasi disimpan dan boleh dimain tanpa internet.

> Suara datang daripada pelayar dan peranti. Di komputer, guna **Microsoft Edge** kerana ia ada suara Melayu (Malaysia) dan Arab; Chrome di Windows selalunya tiada kedua-duanya. Di Android: Tetapan → Pertuturan teks (Google) → muat turun Melayu (Malaysia) dan Arab. Di iPhone: Settings → Accessibility → Spoken Content → Voices. Status suara boleh dilihat dalam ⚙️ Tetapan.

## Struktur fail
```
index.html            Kerangka aplikasi
css/style.css         Reka bentuk
js/data.js            ★ Kandungan: ikon, modul pembelajaran, SET 1–4, NPC
js/papers.js          ★ Kertas sebenar PASTI 2020/2021/2022/2024
js/quiz.js            Enjin jenis soalan (padan, pilih, isi, susun, lukis, silang kata)
js/world.js           Dunia kampung (canvas)
js/avatar.js          Lukisan watak
js/sound.js           Sebutan + kesan bunyi
js/app.js             Aliran skrin, simpanan markah (localStorage), bos, rekod
sw.js                 Mod luar talian
manifest.webmanifest  Maklumat PWA
server.js             Pelayan tempatan
```

## Tambah set soalan baharu
Dalam `js/data.js`, tambah objek ke `SETS[5]` atau `SETS[6]`:
```js
{ id: '5-5', name: 'SET 5', src: 'Kertas 2025', qs: [
  { s: 'BM', title: 'Padankan…', type: 'match', pairs: [[P('awan'), L('a')], [P('epal'), L('e')]] },
  { s: 'MT', title: 'Kira.', type: 'fill', num: true, rows: [{ parts: ['3 + 2 =', null], ans: [5] }] },
  // … jumlah markah 100 (default 10 setiap soalan, atau guna `marks`/`parts`)
]}
```
- `P('nama')` = gambar (lihat senarai `ICON`), `T('teks')` = teks, `L('a')` = huruf, `J('جاوي','rumi')` = Jawi.
- Subjek: `BM`, `BA` (Arab), `BI`, `JW` (Jawi), `MT`, `SN`.

Selepas mengubah fail, naikkan `VERSION` dalam `sw.js` supaya peranti yang sudah memasang menerima kemas kini.

## Pembetulan daripada review PDF
- 6 Tahun SET 3 S2: huruf "labu" kini l, c, u, a, b (PDF tersilap cetak "i").
- Soalan Arab yang memadankan perkataan dengan perkataan yang sama (5T SET 1/2/4, 6T SET 2) kini diberi gambar.
- 6 Tahun SET 4 S10B: zebra diganti katak.
- 6 Tahun SET 4 S1: huruf guna fon Andika supaya **l** dan **I** jelas berbeza.

Markah disimpan dalam `localStorage` peranti sahaja. Tiada data dihantar ke mana-mana pelayan.
