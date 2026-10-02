/* Kertas sebenar Ujian Celik Minda PASTI (2020, 2021, 2022, 2024) sebagai set kuiz.
   Soalan yang tidak boleh dibuat sama 100% secara digital (cth. "sambung titik", gambar bersaiz)
   diubah suai sedikit tetapi kekal menguji kemahiran yang sama. */
'use strict';
Object.assign(ICON, {
  tugu: S('<rect x="14" y="44" width="36" height="12" rx="2" fill="#90a4ae"/><rect x="20" y="36" width="24" height="8" fill="#b0bec5"/><g fill="#546e7a"><circle cx="26" cy="22" r="4"/><rect x="23" y="26" width="6" height="10"/><circle cx="38" cy="24" r="4"/><rect x="35" y="28" width="6" height="8"/></g><line x1="32" y1="6" x2="32" y2="30" stroke="#5d4037" stroke-width="2"/><path d="M32 6 h14 v8 h-14z" fill="#e53935"/><path d="M32 10 h14" stroke="#fff" stroke-width="2"/>'),
  zip: S('<path d="M22 4 h20 v56 h-20z" fill="#b0bec5"/><g fill="#546e7a">' + Array.from({ length: 9 }, (_, i) => `<rect x="${i % 2 ? 32 : 26}" y="${8 + i * 5}" width="6" height="3"/>`).join('') + '</g><rect x="27" y="50" width="10" height="8" rx="2" fill="#37474f"/>'),
  manggis: S('<circle cx="32" cy="38" r="20" fill="#6a1b9a"/><path d="M20 20 q12 -10 24 0 q-6 8 -12 6 q-6 2 -12 -6z" fill="#558b2f"/><ellipse cx="25" cy="32" rx="5" ry="3" fill="#9c4dcc" opacity=".7"/>'),
  jambu: '🍐', datuk: '👴', nenek: '👵', 'kapal terbang': '✈️', 'rama-rama': '🦋', 'surat khabar': '📰', botol: '🧴',
  kapak: '🪓', 'burung hantu': '🦉', dakwat: '🖋️', payung: '☂️', emas: '🪙', kubis: '🥬', 'kacang panjang': '🫛',
  terung: '🍆', brokoli: '🥦', 'bunga matahari': '🌻', daisi: '🌼', kayu: '🪵', monyet: '🐒', kucing: '🐈', anggur: '🍇',
  cat: '🎨', nat: '🔩', kambing: '🐐', angsa: '🦢', telefon: '📱', 'komputer riba': '💻', surat: '✉️', merpati: '🕊️',
  'musim bunga': '🌸', 'musim luruh': '🍂', 'musim sejuk': '⛄', 'bola pantai': '🏐', rumput: '🌿', tangan: '✋',
  tiga3: '3️⃣', mop: '🧹', bas: '🚌', biri: '🐑', 'pokok bunga': '🌷', buai: '🛝', bangku: '🪑', segi4: '⬜', bulatan: '⚪', segi3: '🔺',
});
ICON.ibu = '👩‍👦'; // bezakan "ibu" daripada "kakak" (🧕)

const S5 = SETS[5][3].qs, S6 = SETS[6][2].qs;   // SET 4 (5T) & SET 3 (6T) dibina daripada kertas 2024
const big = (e, w) => ({ e, w, sz: 1.5 }), small = (e, w) => ({ e, w, sz: 0.8 });

SETS[5].push(
  /* ======================= 5 TAHUN · 2020 ======================= */
  { id: '5-2020', past: true, name: 'Kertas 2020', src: 'Ujian Celik Minda PASTI · Akhir Tahun 2020 · 5 Tahun', qs: [
    { s: 'BM', title: 'Bulatkan huruf b.', type: 'scatter', bg: '🍎', letters: ['b', 'b', 'd', 'b', 'b', 'b', 'd'], targets: ['b'] },
    { s: 'BM', title: 'Suaikan.', type: 'match',
      pairs: [[P('obor'), L('o')], [P('ubat'), L('u')], [P('itik'), L('i')], [P('awan'), L('a')], [T('6', { say: 'enam' }), L('e')]] },
    { s: 'BM', title: 'Bulatkan sukukata berdasarkan perkataan yang diberi.', type: 'pick', style: 'circle', rows: [
      { prompt: T('batu'), opts: [T('la'), T('ba'), T('tu'), T('da')], ans: [1, 2] }, { prompt: T('lili'), opts: [T('li'), T('li'), T('di'), T('gi')], ans: [0, 1] },
      { prompt: T('lagu'), opts: [T('ba'), T('ta'), T('la'), T('gu')], ans: [2, 3] }, { prompt: T('sisi'), opts: [T('sa'), T('si'), T('si'), T('su')], ans: [1, 2] },
      { prompt: T('gula'), opts: [T('gu'), T('la'), T('ba'), T('ru')], ans: [0, 1] }] },
    { s: 'BM', title: 'Isikan tempat kosong dengan jawapan betul.', type: 'fill', tile: 'syll', once: true, bank: ['sa', 'gu', 'bu', 'ta', 'li'], bankFixed: true, rows: [
      { p: P('labu'), parts: ['la', null], ans: ['bu'] }, { p: P('tali'), parts: [null, 'li'], ans: ['ta'] },
      { p: P('tugu'), parts: ['tu', null], ans: ['gu'] }, { p: P('guli'), parts: ['gu', null], ans: ['li'] },
      { p: T('1', { say: 'satu' }), parts: [null, 'tu'], ans: ['sa'] }] },
    { s: 'BA', title: 'Bahasa Arab', parts: [
      { label: '1', title: 'Isi tempat kosong dengan huruf yang betul.', jawi: 'إِمْلَاءُ الْفَرَاغِ بِالْحُرُوفِ الصَّحِيحَةِ', marks: 4, type: 'fill', tile: 'letter', dir: 'rtl', bank: ['س', 'ا', 'ل', 'م'], rows: [
        { p: T('السلام'), parts: ['ا', 'ل', null, 'ل', null, 'م'], ans: ['س', 'ا'] }, { p: T('عليكم'), parts: ['ع', null, 'ي', 'ك', null], ans: ['ل', 'م'] }] },
      { label: '2', title: 'Bulatkan gambar yang betul.', jawi: 'دَوِّرِ الصُّورَةَ الصَّحِيحَةَ', marks: 2, type: 'pick', style: 'circle', rows: [
        { prompt: T('عَيْنٌ'), opts: [P('mata'), P('rambut'), P('bibir')], ans: 0 }, { prompt: T('رِجْلٌ'), opts: [P('rambut'), P('hidung'), P('kaki')], ans: 2 }] },
      { label: '3', title: 'Suaikan.', jawi: 'وَفِّقْ', marks: 4, type: 'match', pairs: [[T('أَخٌ'), P('abang')], [T('أُمٌّ'), P('ibu')], [T('جَدٌّ'), P('datuk')], [T('أُخْتٌ'), P('kakak')]] }] },
    { s: 'BI', title: 'Bahasa Inggeris', parts: [
      { label: '1', title: 'Cross (X) the capital letter G.', marks: 3, type: 'scatter', bg: '🍄', letters: ['a', 'g', 'G', 'G', 'g', 'a', 'G', 'a'], targets: ['G'] },
      { label: '2', title: 'Colour two butterflies in the picture.', marks: 2, type: 'pick', style: 'colour', layout: 'scene', rows: [
        { opts: [P('rama-rama'), P('ayam'), P('awan'), P('rama-rama'), P('rumput')], ans: [0, 3] }] },
      { label: '3', title: 'Find the letter a. (asal: sambung titik huruf a)', marks: 5, type: 'pick', style: 'circle', rows: [
        { opts: [L('a'), L('o')], ans: 0 }, { opts: [L('d'), L('a')], ans: 1 }, { opts: [L('a'), L('e')], ans: 0 }, { opts: [L('q'), L('a')], ans: 1 }, { opts: [L('a'), L('g')], ans: 0 }] }] },
    { s: 'JW', title: 'Jawi soalan 1', parts: [
      { label: '1', title: 'Bulatkan huruf yang sama dengan huruf yang diberi.', jawi: 'بولتكن حروف يڠ سام دڠن حروف يڠ دبري', marks: 4, type: 'pick', style: 'circle', rows: [
        { prompt: J('چ', 'ca'), opts: [J('ج', 'jim'), J('چ', 'ca'), J('ح', 'ha')], ans: 1 }, { prompt: J('ڠ', 'nga'), opts: [J('ڠ', 'nga'), J('ع', 'ain'), J('غ', 'ghain')], ans: 0 }] },
      { label: '2', title: 'Lorekkan pada jawapan yang sama.', jawi: 'لوريقكن ڤد جاوڤن يڠ سام', marks: 4, type: 'pick', style: 'colour', rows: [
        { prompt: J('س و', 'su'), opts: [J('ش و', 'syu'), J('س و', 'su')], ans: 1 }, { prompt: J('كي', 'ki'), opts: [J('ک ي', 'k, i'), J('كي', 'ki')], ans: 1 }] },
      { label: '3', title: 'Isikan huruf yang tertinggal.', jawi: 'ايسيكن حروف يڠ ترتيڠݢل', marks: 2, type: 'fill', tile: 'letter', dir: 'rtl', rows: [
        { p: J('باجو', 'baju'), parts: [null, 'ا', null, 'و'], ans: ['ب', 'ج'] }] }] },
    { s: 'JW', title: 'Jawi soalan 2', parts: [
      { label: '4', title: 'Tandakan (✓) pada jawapan yang betul.', jawi: 'تندأكن (✓) ڤد جاوڤن يڠ بتول', marks: 4, type: 'pick', style: 'tick', rows: [
        { prompt: T('mu'), opts: [J('مو', 'mu'), J('نو', 'nu')], ans: 0 }, { prompt: T('pa'), opts: [J('با', 'ba'), J('ڤا', 'pa')], ans: 1 }] },
      { label: '5', title: 'Suaikan suku kata dengan gambar.', jawi: 'سوايكن سوكو كات دڠن ݢمبر', marks: 6, type: 'match',
        pairs: [[P('cili', { label: '__ لي' }), J('چي', 'ci')], [P('ubi', { label: '__ بي' }), J('او', 'u')], [P('dadu', { label: '__ دو' }), J('دا', 'da')]] }] },
    { s: 'MT', title: 'Matematik', parts: [
      { label: '1', title: 'Tandakan (✓) objek yang lebih kecil.', marks: 4, type: 'pick', style: 'tick', rows: [
        { opts: [small('🐟', 'ikan kecil'), big('🐟', 'ikan besar')], ans: 0 }, { opts: [big('🍦', 'aiskrim besar'), small('🍦', 'aiskrim kecil')], ans: 1 },
        { opts: [small('🧁', 'kek kecil'), big('🧁', 'kek besar')], ans: 0 }, { opts: [big('☕', 'cawan besar'), small('☕', 'cawan kecil')], ans: 1 }] },
      { label: '2', title: 'Kira dan bulatkan jawapan yang betul.', marks: 3, type: 'pick', style: 'circle', rows: [
        { prompt: E('🚌🚌', 'bas'), opts: [T('1'), T('2')], ans: 1 }, { prompt: E('🚲🚲🚲', 'basikal'), opts: [T('3'), T('4')], ans: 0 },
        { prompt: E(rep('🐑', 5), 'biri-biri'), opts: [T('5'), T('6')], ans: 0 }] },
      { label: '3', title: 'Tuliskan nombor mengikut bilangan.', marks: 3, type: 'fill', num: true, rows: [
        { p: E(rep('🐇', 3), 'arnab'), parts: [null], ans: [3] }, { p: E(rep('🦆', 5), 'itik'), parts: [null], ans: [5] }, { p: E(rep('🐈', 7), 'kucing'), parts: [null], ans: [7] }] }] },
    { s: 'SN', title: 'Sains', parts: [
      { label: '1', title: 'Warnakan 3 peralatan di dalam kelas.', marks: 6, type: 'pick', style: 'colour', layout: 'scene', rows: [
        { opts: [P('jam'), P('matahari'), P('papan hitam'), P('pokok bunga'), P('meja'), P('batu'), P('tong sampah'), P('buai')], ans: [0, 2, 4, 6], need: 3 }] },
      { label: '2', title: 'Tandakan (✓) pada 2 gambar tumbuh-tumbuhan.', marks: 4, type: 'pick', style: 'tick', layout: 'scene', rows: [
        { opts: [P('awan'), P('pokok bunga'), P('ikan'), P('rumput'), P('batu')], ans: [1, 3] }] }] },
  ] },

  /* ======================= 5 TAHUN · 2021 ======================= */
  { id: '5-2021', past: true, name: 'Kertas 2021', src: 'Ujian Celik Minda PASTI · 2021 · 5 Tahun', qs: [
    { s: 'BM', title: 'Bulatkan semua huruf "p" pada gambar di bawah.', type: 'scatter', bg: '🟣', letters: ['p', 'b', 'p', 'b', 'p', 'b', 'p', 'b', 'b', 'p'], targets: ['p'] },
    { s: 'BM', title: 'Bulatkan gambar mengikut huruf vokal yang diberi.', type: 'pick', style: 'circle', rows: [
      { prompt: L('a'), opts: [P('oren'), P('atap')], ans: 1 }, { prompt: L('i'), opts: [P('ikan'), P('ayam')], ans: 0 },
      { prompt: L('u'), opts: [P('ubat'), P('emas')], ans: 0 }, { prompt: L('o'), opts: [P('obor'), T('6', { say: 'enam' })], ans: 0 },
      { prompt: L('e'), opts: [P('ibu dan bayi', { w: 'emak' }), P('itik')], ans: 0 }] },
    { s: 'BM', title: 'Bulatkan sukukata berdasarkan perkataan yang diberi.', type: 'pick', style: 'circle', rows: [
      { prompt: T('baju'), opts: [T('la'), T('ba'), T('ju'), T('da')], ans: [1, 2] }, { prompt: T('lalu'), opts: [T('la'), T('lu'), T('bu'), T('ga')], ans: [0, 1] },
      { prompt: T('tali'), opts: [T('na'), T('ba'), T('ta'), T('li')], ans: [2, 3] }, { prompt: T('satu'), opts: [T('ru'), T('sa'), T('tu'), T('la')], ans: [1, 2] },
      { prompt: T('labu'), opts: [T('la'), T('bu'), T('lu'), T('pa')], ans: [0, 1] }] },
    { s: 'BM', title: 'Isikan tempat kosong dengan jawapan yang betul.', type: 'fill', tile: 'syll', once: true, bank: ['sa', 'gu', 'bu', 'bo', 'li'], bankFixed: true, rows: [
      { p: T('1', { say: 'satu' }), parts: [null, 'tu'], ans: ['sa'] }, { p: P('bola'), parts: [null, 'la'], ans: ['bo'] },
      { p: P('tugu'), parts: ['tu', null], ans: ['gu'] }, { p: P('guli'), parts: ['gu', null], ans: ['li'] }, { p: P('labu'), parts: ['la', null], ans: ['bu'] }] },
    { s: 'BA', title: 'Bahasa Arab', parts: [
      { label: '1', title: 'Warnakan gambar mengikut kalimah.', jawi: 'لَوِّنِ الصُّورَةَ وَفْقًا لِلْكَلِمَةِ', marks: 2, type: 'pick', style: 'colour', rows: [
        { prompt: T('أَحْمَرُ'), opts: [{ sw: '#e53935', w: 'merah' }, { sw: '#43a047', w: 'hijau' }, { sw: '#fdd835', w: 'kuning' }], ans: 0 },
        { prompt: T('أَخْضَرُ'), opts: [{ sw: '#e53935', w: 'merah' }, { sw: '#43a047', w: 'hijau' }, { sw: '#fdd835', w: 'kuning' }], ans: 1 }] },
      { label: '2', title: 'Tandakan (✓) pada kalimah yang sama.', jawi: 'ضَعْ عَلَامَةَ (✓) عَلَى نَفْسِ الْكَلِمَةِ', marks: 4, type: 'pick', style: 'tick', rows: [
        { prompt: T('بَقَرَةٌ'), opts: [T('بَقَرَةٌ'), T('أَسَدٌ'), T('سَمَكٌ')], ans: 0 }, { prompt: T('نَامَ'), opts: [T('قَادَ'), T('نَامَ'), T('لَعِبَ')], ans: 1 }] },
      { label: '3', title: 'Suaikan jawapan yang betul.', jawi: 'وَفِّقْ فِي الْإِجَابَةِ الصَّحِيحَةِ', marks: 4, type: 'match', pairs: [[T('خُبْزٌ'), P('roti')], [T('أَرُزٌّ'), P('nasi')]] }] },
    { s: 'BI', title: 'Bahasa Inggeris', parts: [
      { label: '1', title: 'Circle the correct capital letter.', marks: 3, type: 'pick', style: 'circle', rows: [
        { prompt: L('f'), opts: [L('F'), L('K')], ans: 0 }, { prompt: L('g'), opts: [L('C'), L('G')], ans: 1 }, { prompt: L('n'), opts: [L('N'), L('H')], ans: 0 }] },
      { label: '2', title: 'Fill in the blanks.', marks: 2, type: 'fill', tile: 'letter', extra: ['k', 'w'], rows: [{ parts: ['g', null, 'i'], ans: ['h'] }, { parts: [null, 'y', 'z'], ans: ['x'] }] },
      { label: '3', title: 'Tick (✓) the correct letter.', marks: 5, type: 'pick', style: 'tick', rows: [
        { prompt: P('kapak', { label: 'axe' }), opts: [L('a'), L('s'), L('i')], ans: 0 }, { prompt: P('burung hantu', { label: 'owl' }), opts: [L('e'), L('c'), L('o')], ans: 2 },
        { prompt: P('telur', { label: 'egg' }), opts: [L('t'), L('e'), L('c')], ans: 1 }, { prompt: P('dakwat', { label: 'ink' }), opts: [L('p'), L('i'), L('k')], ans: 1 },
        { prompt: P('payung', { label: 'umbrella' }), opts: [L('n'), L('a'), L('u')], ans: 2 }] }] },
    { s: 'JW', title: 'Jawi', parts: [
      { label: '1', title: 'Tandakan (✓) pada jawapan yang betul.', jawi: 'تندأكن (✓) ڤد جاوڤن يڠ بتول', marks: 4, type: 'pick', style: 'tick', rows: [
        { prompt: J('س', 'sin'), opts: [J('ش', 'syin'), J('س', 'sin'), J('ص', 'sad')], ans: 1 }, { prompt: J('ظ', 'zo'), opts: [J('ظ', 'zo'), J('ط', 'to'), J('ض', 'dad')], ans: 0 }] },
      { label: '2', title: 'Suaikan jawapan yang sama.', jawi: 'سوايكن جاوڤن يڠ سام', marks: 2, type: 'match', fixed: true, L: [J('د', 'dal'), J('خ', 'kho')], R: [J('ذ', 'zal'), J('د', 'dal'), J('خ', 'kho'), J('چ', 'ca')], ans: [[0, 1], [1, 2]] },
      { label: '3', title: 'Ceraikan huruf.', jawi: 'چرايكن حروف', marks: 4, type: 'fill', tile: 'letter', dir: 'rtl', rows: [
        { p: J('تو', 'tu'), parts: [null, null], ans: ['ت', 'و'] }, { p: J('تا', 'ta'), parts: [null, null], ans: ['ت', 'ا'] }] }] },
    { s: 'JW', title: 'Jawi soalan 2', parts: [
      { label: '4', title: 'Isi tempat kosong.', jawi: 'ايسي تمڤت كوسوڠ', marks: 6, type: 'fill', tile: 'syll', once: true, dir: 'rtl', bank: ['تا', 'با', 'دا'], bankFixed: true, rows: [
        { p: P('dadu'), parts: [null, 'دو'], ans: ['دا'] }, { p: P('tali'), parts: [null, 'لي'], ans: ['تا'] }, { p: P('batu'), parts: [null, 'تو'], ans: ['با'] }] },
      { label: '5', title: 'Suaikan suku kata yang sama.', jawi: 'سوايكن سوكو كات يڠ سام', marks: 4, type: 'match',
        pairs: [[J('كي', 'ki'), J('كي', 'ki')], [J('چا', 'ca'), J('چا', 'ca')], [J('با', 'ba'), J('با', 'ba')], [J('دو', 'du'), J('دو', 'du')]] }] },
    { s: 'MT', title: 'Matematik', parts: [
      { label: '1', title: 'Tandakan (✓) pada bilangan yang sedikit.', marks: 2, type: 'pick', style: 'tick', rows: [
        { opts: [E('🍓🍓', 'dua'), E(rep('🍓', 5), 'lima')], ans: 0 }, { opts: [E(rep('🌹', 4), 'empat'), E('🌹', 'satu')], ans: 1 }] },
      { label: '2', title: 'Kira dan bulatkan jawapan yang betul.', marks: 2, type: 'pick', style: 'circle', rows: [
        { prompt: E('🍒🍒', 'ceri'), opts: [T('3'), T('2')], ans: 1 }, { prompt: E(rep('🍒', 4), 'ceri'), opts: [T('5'), T('4')], ans: 1 }] },
      { label: '3', title: 'Lengkapkan susunan nombor menaik. (Pilihan: 7, 9, 6)', marks: 3, type: 'fill', num: true, rows: [{ parts: ['5', null, null, '8', null], ans: [6, 7, 9] }] },
      { label: '4', title: 'Selesaikan operasi tambah dan tolak.', marks: 3, type: 'fill', num: true, rows: [
        { parts: ['3 + 1 =', null], ans: [4] }, { parts: ['3 − 3 =', null], ans: [0] }, { parts: ['5 + 4 =', null], ans: [9] }] }] },
    { s: 'SN', title: 'Sains', parts: [
      { label: '1', title: 'Warnakan dua haiwan yang bertelur.', marks: 4, type: 'pick', style: 'colour', layout: 'scene', rows: [
        { opts: [P('itik'), P('singa'), P('burung'), P('monyet')], ans: [0, 2] }] },
      { label: '2', title: 'Bulatkan tiga sayuran berwarna hijau.', marks: 6, type: 'pick', style: 'circle', layout: 'scene', rows: [
        { opts: [P('kubis'), P('tomato'), P('kacang panjang'), P('terung'), P('lobak'), P('brokoli')], ans: [0, 2, 5] }] }] },
  ] },

  /* ======================= 5 TAHUN · 2024 ======================= */
  { id: '5-2024', past: true, name: 'Kertas 2024', src: 'Ujian Celik Minda Murid PASTI 2024 · 5 Tahun', qs: [
    S5[0],
    { s: 'BM', title: 'Suaikan huruf kecil dengan huruf besar.', type: 'match', fixed: true, groupR: 2,
      L: [L('b'), L('d'), L('g'), L('r'), L('e')], R: [L('B'), L('D'), L('D'), L('B'), L('G'), L('Q'), L('K'), L('R'), L('E'), L('F')],
      ans: [[0, 0], [1, 2], [2, 4], [3, 7], [4, 8]] },
    Object.assign({}, S5[2], { title: 'Warnakan sukukata awal yang mewakili gambar.', rows: S5[2].rows.map((r, i) => i === 4 ? { prompt: P('tupai'), opts: [T('tu'), T('li'), T('ta')], ans: 0 } : r) }),
    Object.assign({}, S5[3], { title: 'Tulis perkataan berdasarkan gambar yang betul.', bank: ['ayam', 'epal', 'awan', 'ulat', 'atap'] }),
    Object.assign({}, S5[4], { title: 'Suaikan.' }),
    { s: 'BI', title: 'Fill in the blanks.', type: 'fill', tile: 'letter', rows: [
      { p: P('pen', { label: 'pen' }), parts: [null, null, null], ans: ['p', 'e', 'n'] }, { p: P('kereta', { label: 'car' }), parts: [null, null, null], ans: ['c', 'a', 'r'] },
      { p: P('kunci', { label: 'key' }), parts: [null, 'e', null], ans: ['k', 'y'] }, { p: P('kotak', { label: 'box' }), parts: ['b', null, 'x'], ans: ['o'] },
      { p: P('tikar', { label: 'mat' }), parts: ['m', null, 't'], ans: ['a'] }] },
    Object.assign({}, S5[6], { parts: [Object.assign({}, S5[6].parts[0], { title: 'Tandakan (✓) pada 3 pasangan gambar yang bunyi awalnya sama.', rows: [
      { opts: [{ pp: [P('ayam'), P('awan')] }, { pp: [P('labu'), P('pasu')] }, { pp: [P('tiga3', { w: 'tiga' }), P('tikus')] },
        { pp: [P('jari'), P('jala')] }, { pp: [P('batu'), P('tayar')] }], ans: [0, 2, 3] }] }), S5[6].parts[1]] }),
    S5[7],
    { s: 'MT', title: 'Selesaikan.', parts: [
      { label: 'A', title: 'Lengkapkan nombor (contoh: 1 2 3 4).', marks: 2, type: 'fill', num: true, rows: [{ parts: [null, '2', '3', null], ans: [1, 4] }] },
      { label: 'B', title: 'Lukis bentuk bulat mengikut angka.', marks: 2, type: 'draw', rows: [{ n: 2, example: true }, { n: 5 }, { n: 7 }] },
      { label: 'C', title: 'Kira dan tulis jawapan.', marks: 6, type: 'fill', num: true, rows: [
        { p: E(rep('🍰', 8) + ' + 🍰🍰', 'kek'), parts: [null, '+', null, '=', null], ans: [8, 2, 10] },
        { p: E('🍦🍦🍦❌❌❌', 'aiskrim'), parts: [null, '−', null, '=', null], ans: [6, 3, 3] }] }] },
    { s: 'SN', title: 'Suaikan jawapan yang betul.', type: 'match', pairs: [[P('radio'), P('telinga')], [P('televisyen'), P('mata')], [P('bunga'), P('hidung')]] },
  ] },
);

SETS[6].push(
  /* ======================= 6 TAHUN · 2020 ======================= */
  { id: '6-2020', past: true, name: 'Kertas 2020', src: 'Ujian Celik Minda PASTI · Akhir Tahun 2020 · 6 Tahun', qs: [
    { s: 'BM', title: 'Tuliskan huruf mengikut turutan yang betul.', type: 'fill', tile: 'letter', extra: ['m', 'z'], rows: [
      { parts: ['a', null, 'c', 'd'], ans: ['b'] }, { parts: ['i', 'j', null, 'l'], ans: ['k'] }, { parts: ['r', 's', 't', null], ans: ['u'] }, { parts: [null, 'w', null, 'y'], ans: ['v', 'x'] }] },
    { s: 'BM', title: 'Isikan sukukata awal yang betul.', type: 'fill', tile: 'syll', once: true, bank: ['po', 'bu', 'ba', 'ci', 'la'], bankFixed: true, rows: [
      { p: P('baju'), parts: [null, 'ju'], ans: ['ba'] }, { p: P('jambu'), parts: ['jam', null], ans: ['bu'] }, { p: P('kunci'), parts: ['kun', null], ans: ['ci'] },
      { p: P('laci'), parts: [null, 'ci'], ans: ['la'] }, { p: P('pokok'), parts: [null, 'kok'], ans: ['po'] }] },
    { s: 'BM', title: 'Suaikan perkataan dengan gambar.', sub: 'Contoh: baldi → 🪣', type: 'match',
      pairs: [[T('awan'), P('awan')], [T('kereta'), P('kereta')], [T('rumah'), P('rumah')], [T('bola'), P('bola pantai')], [T('batu'), P('batu')]] },
    { s: 'BM', title: 'Lengkapkan ayat di bawah berpandukan gambar.', type: 'fill', tile: 'word', once: true, bank: ['gajah', 'zip', 'baju', 'roti', 'mop'], bankFixed: true, rows: [
      { p: P('roti'), parts: ['Saya suka makan', null, '.'], ans: ['roti'] }, { p: P('baju'), parts: ['Ibu basuh', null, 'kakak.'], ans: ['baju'] },
      { p: P('zip'), parts: [null, 'beg itu rosak.'], ans: ['zip'] }, { p: P('mop'), parts: ['Siti beli', null, 'baru.'], ans: ['mop'] },
      { p: P('gajah'), parts: ['Badan', null, 'besar.'], ans: ['gajah'] }] },
    { s: 'BA', title: 'Bahasa Arab', parts: [
      { label: '1', title: 'Tandakan (✓) pada nombor yang sama dengan ٨.', jawi: 'ضَعْ عَلَامَةَ (✓) عَلَى نَفْسِ الرَّقْمِ ٨', marks: 3, type: 'pick', style: 'tick', layout: 'scene', rows: [
        { opts: [T('٢'), T('٨'), T('٧'), T('٨'), T('٦'), T('٨'), T('١')], ans: [1, 3, 5] }] },
      { label: '2', title: 'Suaikan.', jawi: 'وَفِّقْ', marks: 3, type: 'match', pairs: [[P('bapa'), T('أَبٌ')], [P('nenek'), T('جَدَّةٌ')], [P('kakak'), T('أُخْتٌ')]] },
      { label: '3', title: 'Isi tempat kosong.', jawi: 'اُكْتُبْ فِي كَلِمَاتٍ الْآتِيَةِ', marks: 4, type: 'fill', tile: 'letter', dir: 'rtl', rows: [
        { p: T('لِسَانٌ'), parts: ['ل', null, 'ا', 'ن'], ans: ['س'] }, { p: T('شَعْرٌ'), parts: ['ش', 'ع', null], ans: ['ر'] },
        { p: T('نَامَ'), parts: [null, 'ا', 'م'], ans: ['ن'] }, { p: T('دَخَلَ'), parts: [null, 'خ', 'ل'], ans: ['د'] }] }] },
    { s: 'BI', title: 'Bahasa Inggeris', parts: [
      { label: '1', title: 'Match.', marks: 3, type: 'match', pairs: [[P('segi4', { w: 'segi empat' }), T('square')], [P('bulatan'), T('circle')], [P('segi3', { w: 'segi tiga' }), T('triangle')]] },
      { label: '2', title: 'Colour the picture.', marks: 3, type: 'pick', style: 'colour', rows: [
        { prompt: P('pisang', { label: 'yellow' }), opts: [{ sw: '#fdd835', w: 'kuning' }, { sw: '#e53935', w: 'merah' }, { sw: '#1e88e5', w: 'biru' }], ans: 0 },
        { prompt: P('bola', { label: 'red' }), opts: [{ sw: '#fdd835', w: 'kuning' }, { sw: '#e53935', w: 'merah' }, { sw: '#1e88e5', w: 'biru' }], ans: 1 },
        { prompt: P('baju', { label: 'blue' }), opts: [{ sw: '#fdd835', w: 'kuning' }, { sw: '#e53935', w: 'merah' }, { sw: '#1e88e5', w: 'biru' }], ans: 2 }] },
      { label: '3', title: 'Label. (eye = contoh)', marks: 4, type: 'match', pairs: [[P('hidung'), T('nose')], [P('rambut'), T('hair')], [P('bibir'), T('mouth')], [P('telinga'), T('ear')]] }] },
    { s: 'JW', title: 'Jawi soalan 1', parts: [
      { label: '1', title: 'Tandakan (✓) huruf vokal و.', jawi: 'تندأكن (✓) ووكل و', marks: 4, type: 'scatter', letters: ['ز', 'و', 'و', 'و', 'ؤ', 'ز', 'ؤ', 'و'], targets: ['و'], bubble: true },
      { label: '2', title: 'Bulatkan suku kata yang sama.', jawi: 'بولتكن سوكو كات يڠ سام', marks: 4, type: 'pick', style: 'circle', rows: [
        { prompt: J('تا', 'ta'), opts: [J('با', 'ba'), J('نا', 'na'), J('تا', 'ta')], ans: 2 }, { prompt: J('كو', 'ku'), opts: [J('لو', 'lu'), J('كو', 'ku'), J('ݢو', 'gu')], ans: 1 }] },
      { label: '3', title: 'Isikan huruf yang tertinggal.', jawi: 'ايسيكن حروف يڠ ترتيڠݢل', marks: 2, type: 'fill', tile: 'letter', dir: 'rtl', extra: ['ا'], rows: [
        { p: J('كولي', 'kuli'), parts: ['ک', null, 'ل', null], ans: ['و', 'ي'] }] }] },
    { s: 'JW', title: 'Jawi soalan 2', parts: [
      { label: '1', title: 'Ceraikan.', jawi: 'چرايكن', marks: 6, type: 'fill', tile: 'letter', dir: 'rtl', rows: [
        { p: J('ڤي', 'pi'), parts: [null, null], ans: ['ڤ', 'ي'] }, { p: J('جا', 'ja'), parts: [null, null], ans: ['ج', 'ا'] }, { p: J('بو', 'bu'), parts: [null, null], ans: ['ب', 'و'] }] },
      { label: '2', title: 'Suaikan.', jawi: 'سوايكن', marks: 4, type: 'match',
        pairs: [[P('tali'), J('تالي', 'tali')], [P('bola'), J('بولا', 'bola')], [P('kaki'), J('كاكي', 'kaki')], [P('dadu'), J('دادو', 'dadu')]] }] },
    { s: 'MT', title: 'Matematik', parts: [
      { label: '1', title: 'Isikan tempat kosong.', marks: 4, type: 'fill', num: true, rows: [{ p: E('🚂', 'kereta api'), parts: ['1', null, null, '4', null, '6', null, '8'], ans: [2, 3, 5, 7] }] },
      { label: '2', title: 'Warnakan nombor lebih besar dengan merah dan nombor lebih kecil dengan biru.', marks: 4, type: 'pick', style: 'colour', rows: [
        { prompt: T('🔴 Lebih besar:'), opts: [T('2'), T('3')], ans: 1 }, { prompt: T('🔵 Lebih kecil:'), opts: [T('2'), T('3')], ans: 0 },
        { prompt: T('🔴 Lebih besar:'), opts: [T('9'), T('7')], ans: 0 }, { prompt: T('🔵 Lebih kecil:'), opts: [T('9'), T('7')], ans: 1 }] },
      { label: '3', title: 'Kira dan padankan.', marks: 2, type: 'match', pairs: [[T('3 + 2'), T('4 + 1')], [T('4 + 5'), T('6 + 3')]] }] },
    { s: 'SN', title: 'Sains', parts: [
      { label: 'a', title: 'Bulatkan haiwan yang boleh terbang.', marks: 4, type: 'pick', style: 'circle', layout: 'scene', rows: [
        { opts: [P('kapal terbang'), P('burung'), P('arnab'), P('rama-rama'), P('ular'), P('ikan')], ans: [1, 3] }] },
      { label: 'b', title: 'Tandakan (✓) 3 objek ciptaan manusia.', marks: 3, type: 'pick', style: 'tick', layout: 'scene', rows: [
        { opts: [P('kapal terbang'), P('bunga'), P('bangku'), P('ular'), P('basikal'), P('ikan')], ans: [0, 2, 4] }] },
      { label: 'c', title: 'Padankan objek dengan tong kitar semula yang betul.', marks: 3, type: 'match',
        pairs: [[P('surat khabar', { label: 'kertas' }), { sw: '#1e88e5', w: 'tong biru', label: 'biru' }], [P('botol', { label: 'plastik' }), { sw: '#fb8c00', w: 'tong jingga', label: 'jingga' }],
          [P('cawan', { label: 'kaca' }), { sw: '#6d4c41', w: 'tong coklat', label: 'coklat' }]] }] },
  ] },

  /* ======================= 6 TAHUN · 2021 ======================= */
  { id: '6-2021', past: true, name: 'Kertas 2021', src: 'Ujian Celik Minda PASTI · 2021 · 6 Tahun', qs: [
    { s: 'BM', title: 'Tuliskan huruf vokal dan huruf konsonan dalam kotak yang betul.', type: 'match', many: true,
      L: ['o', 'a', 's', 'e', 'f', 'u', 'b', 'p', 'x', 'i'].map(L), R: [T('🏠 Huruf vokal'), T('🏠 Huruf konsonan')],
      ans: [[0, 0], [1, 0], [2, 1], [3, 0], [4, 1], [5, 0], [6, 1], [7, 1], [8, 1], [9, 0]] },
    { s: 'BM', title: 'Bulatkan gambar berdasarkan perkataan yang diberi.', sub: 'bola · bunga · batu · pokok · kayu', type: 'pick', style: 'circle', layout: 'scene', rows: [
      { opts: [P('bola'), P('budak'), P('bunga'), P('kasut'), P('batu'), P('pokok'), P('kayu'), P('awan')], ans: [0, 2, 4, 5, 6] }] },
    { s: 'BM', title: 'Gabungkan sukukata menjadi perkataan.', type: 'fill', tile: 'word', once: true, bank: ['masjid', 'api', 'cili', 'rumah', 'sikat'], rows: [
      { p: P('masjid'), parts: ['mas + jid =', null], ans: ['masjid'] }, { p: E('🔥', 'api'), parts: ['a + pi =', null], ans: ['api'] },
      { p: P('cili'), parts: ['ci + li =', null], ans: ['cili'] }, { p: P('rumah'), parts: ['ru + mah =', null], ans: ['rumah'] },
      { p: E('🪮', 'sikat'), parts: ['si + kat =', null], ans: ['sikat'] }] },
    { s: 'BM', title: 'Lengkapkan ayat di bawah berdasarkan gambar.', type: 'fill', tile: 'word', once: true, bank: ['luka', 'jubah', 'ikan', 'Lampu', 'Nuri'], bankFixed: true, rows: [
      { p: P('ikan'), parts: ['Ibu beli', null, 'di pasar.'], ans: ['ikan'] }, { p: P('jubah'), parts: ['Ayah pergi ke masjid memakai', null, '.'], ans: ['jubah'] },
      { p: P('luka'), parts: ['Jari Ali', null, 'terkena pisau.'], ans: ['luka'] }, { p: P('nuri'), parts: ['Burung', null, 'itu cantik.'], ans: ['Nuri'] },
      { p: P('lampu'), parts: [null, 'bilik kakak itu terang.'], ans: ['Lampu'] }] },
    { s: 'BA', title: 'Bahasa Arab', parts: [
      { label: '1', title: 'Warnakan gambar mengikut kalimah (padankan).', jawi: 'لَوِّنِ الصُّورَةَ وَفْقًا لِلْكَلِمَةِ', marks: 3, type: 'match', pairs: [[P('manggis'), T('بَنَفْسَجِيٌّ')], [P('pisang'), T('أَصْفَرُ')], [P('strawberi'), T('أَحْمَرُ')]] },
      { label: '2', title: 'Bulatkan jawapan yang betul.', jawi: 'دَوِّرِ الْإِجَابَةَ الصَّحِيحَةَ', marks: 2, type: 'pick', style: 'circle', rows: [
        { prompt: P('abang'), opts: [T('أَخٌ'), T('جَدٌّ')], ans: 0 }, { prompt: P('ibu'), opts: [T('جَدَّةٌ'), T('أُمٌّ')], ans: 1 }] },
      { label: '3', title: 'Padankan kalimah dengan gambar.', jawi: 'وَفِّقِ الْكَلِمَاتِ بِالصُّورَةِ الصَّحِيحَةِ', marks: 5, type: 'match',
        pairs: [[T('شَعْرٌ'), P('rambut')], [T('عَيْنٌ'), P('mata')], [T('لِسَانٌ'), P('lidah')], [T('أَنْفٌ'), P('hidung')], [T('أُذُنٌ'), P('telinga')]] }] },
    { s: 'BI', title: 'Bahasa Inggeris', parts: [
      { label: '1', title: 'Rewrite: January', marks: 2, type: 'fill', tile: 'letter', rows: [{ p: T('January'), parts: ['J', null, null, null, null, null, null], ans: ['a', 'n', 'u', 'a', 'r', 'y'] }] },
      { label: '2', title: 'Circle the same words.', marks: 2, type: 'pick', style: 'circle', rows: [{ prompt: P('durian'), opts: [T('durian'), T('durian'), T('mangosteen')], ans: [0, 1] }] },
      { label: '3', title: 'Colour the picture: It is a red cup.', marks: 2, type: 'pick', style: 'colour', rows: [
        { prompt: P('cawan'), opts: [{ sw: '#1e88e5', w: 'blue' }, { sw: '#e53935', w: 'red' }, { sw: '#43a047', w: 'green' }], ans: 1 }] },
      { label: '4', title: 'Tick (✓) the correct answer.', marks: 2, type: 'pick', style: 'tick', rows: [{ prompt: P('stoking'), opts: [T('a pair of socks'), T('a pair of shoes')], ans: 0 }] },
      { label: '5', title: 'Rearrange the letters: a f t e h r', marks: 2, type: 'fill', tile: 'letter', rows: [{ p: P('bapa'), parts: [null, null, null, null, null, null], ans: ['f', 'a', 't', 'h', 'e', 'r'] }] }] },
    { s: 'JW', title: 'Jawi', parts: [
      { label: '1', title: 'Bulatkan huruf vokal.', jawi: 'بولتكن حروف ووكل', marks: 3, type: 'scatter', bg: '🍎', letters: ['ب', 'س', 'ا', 'ي', 'و'], targets: ['ا', 'ي', 'و'] },
      { label: '2', title: 'Tulis semula.', jawi: 'توليس سمولا', marks: 4, type: 'fill', tile: 'letter', dir: 'rtl', rows: [
        { p: J('نت', 'nat'), parts: [null, null], ans: ['ن', 'ت'] }, { p: J('بس', 'bas'), parts: [null, null], ans: ['ب', 'س'] }] },
      { label: '3', title: 'Bulatkan suku kata awal yang mewakili gambar.', jawi: 'بولتكن سوكو كات اول يڠ مواكيلي ݢمبر', marks: 3, type: 'pick', style: 'circle', rows: [
        { prompt: P('baju'), opts: [J('بو', 'bu'), J('بي', 'bi'), J('با', 'ba')], ans: 2 }, { prompt: P('kayu', { w: 'dahan' }), opts: [J('دو', 'du'), J('دي', 'di'), J('دا', 'da')], ans: 2 },
        { prompt: P('kakak', { w: 'Jinah', label: 'Jinah' }), opts: [J('جو', 'ju'), J('جي', 'ji'), J('جا', 'ja')], ans: 1 }] }] },
    { s: 'JW', title: 'Jawi soalan 2', parts: [
      { label: '4', title: 'Pilih perkataan yang TIDAK sama dengan ابو.', jawi: 'تندأكن X ڤد ڤركاتاءن يڠ تيدق سام', marks: 1, type: 'pick', style: 'tick', rows: [{ prompt: J('ابو', 'abu'), opts: [J('ابي', 'abi'), J('ابو', 'abu')], ans: 0 }] },
      { label: '5', title: 'Ceraikan.', jawi: 'چرايكن', marks: 6, type: 'fill', tile: 'letter', dir: 'rtl', rows: [
        { p: J('لا', 'la'), parts: [null, null], ans: ['ل', 'ا'] }, { p: J('جو', 'ju'), parts: [null, null], ans: ['ج', 'و'] }, { p: J('نت', 'nat'), parts: [null, null], ans: ['ن', 'ت'] }] },
      { label: '6', title: 'Suaikan.', jawi: 'سوايكن', marks: 3, type: 'match', pairs: [[J('روتي', 'roti'), P('roti')], [J('دادو', 'dadu'), P('dadu')], [J('سودو', 'sudu'), P('sudu')]] }] },
    { s: 'MT', title: 'Matematik', parts: [
      { label: '1', title: 'Pilih wang yang bernilai 70 sen.', marks: 2, type: 'pick', style: 'tick', rows: [{ opts: [E('🪙20 + 🪙10', '20 sen dan 10 sen'), E('🪙50 + 🪙20', '50 sen dan 20 sen')], ans: 1 }] },
      { label: '2', title: 'Kira dan tulis jawapan.', marks: 4, type: 'fill', num: true, rows: [
        { p: E(rep('✏️', 5) + ' + ' + rep('✏️', 9), 'pensel'), parts: ['5 +', null, '=', null], ans: [9, 14] },
        { p: E(rep('🧽', 4) + '❌❌❌❌❌❌', 'pemadam'), parts: [null, '−', null, '= 4'], ans: [10, 6] }] },
      { label: '3', title: 'Isikan tempat kosong.', marks: 4, type: 'fill', num: true, rows: [{ parts: [null, '14', null, '12', null, '10', null, '8'], ans: [15, 13, 11, 9] }] }] },
    { s: 'SN', title: 'Sains', parts: [
      { label: '1', title: 'Tandakan (✓) haiwan yang boleh terbang.', marks: 4, type: 'pick', style: 'tick', layout: 'scene', rows: [{ opts: [P('burung'), P('katak'), P('rama-rama'), P('siput')], ans: [0, 2] }] },
      { label: '2', title: 'Bulatkan tiga jenis bunga (bunga raya, bunga matahari dan bunga ros).', marks: 3, type: 'pick', style: 'circle', layout: 'scene', rows: [
        { opts: [P('bunga'), P('bunga matahari'), P('daisi'), P('bunga raya')], ans: [0, 1, 3] }] },
      { label: '3', title: 'Padankan anggota dan fungsinya.', marks: 3, type: 'match', pairs: [[P('telinga'), T('dengar')], [P('hidung'), T('hidu')], [P('mata'), T('lihat')]] }] },
  ] },

  /* ======================= 6 TAHUN · 2022 ======================= */
  { id: '6-2022', past: true, name: 'Kertas 2022', src: 'Ujian Celik Minda Murid PASTI 2022 · 6 Tahun', qs: [
    { s: 'BM', title: 'Padankan.', type: 'match', pairs: [[L('m'), L('M')], [L('p'), L('P')], [L('r'), L('R')], [L('t'), L('T')], [L('w'), L('W')]] },
    { s: 'BM', title: 'Isikan tempat kosong.', type: 'fill', tile: 'word', once: true, bank: ['susu', 'kek', 'kaki', 'baju', 'jala'], bankFixed: true, rows: [
      { p: P('kek'), parts: ['Ibu beli', null, '.'], ans: ['kek'] }, { p: P('susu'), parts: ['Adik minum', null, '.'], ans: ['susu'] },
      { p: P('kaki'), parts: [null, 'Ahmad luka.'], ans: ['kaki'] }, { p: P('baju'), parts: ['Jali ada', null, 'baru.'], ans: ['baju'] },
      { p: P('jala'), parts: ['Datuk', null, 'ikan keli.'], ans: ['jala'] }] },
    { s: 'BM', title: 'Bulatkan suku kata yang sama.', type: 'pick', style: 'circle', rows: [
      { prompt: T('batu'), opts: [T('batu'), T('buku'), T('biru')], ans: 0 }, { prompt: T('dadu'), opts: [T('kayu'), T('dadu'), T('bola')], ans: 1 },
      { prompt: T('ayam'), opts: [T('itik'), T('lembu'), T('ayam')], ans: 2 }, { prompt: T('bunga'), opts: [T('pokok'), T('bunga'), T('raya')], ans: 1 },
      { prompt: T('sikat'), opts: [T('sikat'), T('rumah'), T('botol')], ans: 0 }] },
    { s: 'BM', title: 'Warnakan jawapan yang betul.', sub: 'Lihat gambar: rumah Siti yang besar, ada pokok bunga, seekor lembu dan pagar.', type: 'pick', style: 'colour', rows: [
      { prompt: T('Ini ___ Siti.'), opts: [T('rumah'), T('sekolah')], ans: 0 }, { prompt: T('Rumah Siti ___.'), opts: [T('roboh'), T('besar')], ans: 1 },
      { prompt: T('Rumah Siti ada pokok ___.'), opts: [T('bunga'), T('batu')], ans: 0 }, { prompt: T('Siti ada seekor ___.'), opts: [T('lembu'), T('ayam')], ans: 0 },
      { prompt: T('Halaman rumah Siti ada ___.'), opts: [T('pagar'), T('titi')], ans: 0 }] },
    { s: 'BA', title: 'Suaikan jawapan yang betul.', ar: 'وَفِّقْ فِي الْإِجَابَةِ الصَّحِيحَةِ', type: 'match',
      pairs: [[P('mata'), T('عَيْنٌ')], [P('ibu'), T('أُمٌّ')], [P('tangan'), T('يَدٌ')], [T('٢'), T('اِثْنَانِ')], [P('pisang'), T('مَوْزٌ')], [P('pemadam'), T('مِمْحَاةٌ')]] },
    { s: 'BI', title: 'Tick (✓) the correct answers.', type: 'pick', style: 'tick', rows: [
      { prompt: T('6'), opts: [T('six'), T('one')], ans: 0 }, { prompt: E('🧸🧸', 'two teddy bears'), opts: [T('two'), T('five')], ans: 0 },
      { prompt: T('four'), opts: [E('⚽⚽', 'two balls'), E('🎁🎁🎁🎁', 'four presents')], ans: 1 }, { prompt: T('apple'), opts: [P('epal'), P('ikan')], ans: 0 },
      { prompt: P('pisang'), opts: [T('bananas'), T('grapes')], ans: 0 }] },
    { s: 'JW', title: 'Warnakan jawapan yang betul.', jawi: 'ورناکن جاوڤن يڠ بتول', words: [J('جم', 'jam'), J('سودو', 'sudu'), J('چت', 'cat'), J('لابو', 'labu'), J('نت', 'nat')],
      type: 'pick', style: 'colour', layout: 'scene', rows: [
        { opts: [P('kambing'), P('jam'), P('pokok'), P('sudu'), P('angsa'), P('cat'), P('arnab'), P('labu'), P('nat')], ans: [1, 3, 5, 7, 8] }] },
    { s: 'JW', title: 'Isikan tempat kosong.', jawi: 'ايسيكن تمڤت كوسوڠ', type: 'fill', tile: 'syll', once: true, dir: 'rtl', bank: ['رو', 'دا', 'بو', 'با', 'او'], rows: [
      { p: P('guru'), parts: ['ݢو', null], ans: ['رو'] }, { p: P('kuda'), parts: ['كو', null], ans: ['دا'] }, { p: P('bola'), parts: [null, 'لا'], ans: ['بو'] },
      { p: P('batu'), parts: [null, 'تو'], ans: ['با'] }, { p: P('ular'), parts: [null, 'لر'], ans: ['او'] }] },
    { s: 'MT', title: 'Selesaikan.', parts: [
      { label: '1', title: 'Papan kenyataan.', marks: 4, type: 'fill', num: true, rows: [{ parts: ['8 − 5 =', null], ans: [3] }, { parts: ['7 + 8 =', null], ans: [15] }] },
      { label: '2', title: 'Pukul berapa?', marks: 2, type: 'fill', num: true, rows: [{ p: { clock: 9, w: 'jam' }, parts: ['Pukul', null, 'pagi'], ans: [9] }] },
      { label: '3', title: 'Kira objek di rak.', marks: 4, type: 'fill', num: true, rows: [
        { p: E(rep('📕', 10), 'buku'), parts: ['📕 =', null], ans: [10] }, { p: E(rep('🧴', 8), 'botol'), parts: ['🧴 =', null], ans: [8] }] }] },
    { s: 'SN', title: 'Suaikan jawapan yang betul.', parts: [
      { label: '1', title: 'Padankan gambar dengan musim.', marks: 6, type: 'match', pairs: [[P('musim bunga'), T('musim bunga')], [P('musim luruh'), T('musim luruh')], [P('musim sejuk'), T('musim sejuk')]] },
      { label: '2', title: 'Tandakan alat teknologi.', marks: 4, type: 'pick', style: 'tick', layout: 'scene', rows: [{ opts: [P('komputer riba'), P('surat'), P('merpati'), P('telefon')], ans: [0, 3] }] }] },
  ] },

  /* ======================= 6 TAHUN · 2024 ======================= */
  { id: '6-2024', past: true, name: 'Kertas 2024', src: 'Ujian Celik Minda Murid PASTI 2024 · 6 Tahun', qs: [
    Object.assign({}, S6[0], { title: 'Padankan.' }), Object.assign({}, S6[1], { title: 'Warnakan.' }), Object.assign({}, S6[2], { title: 'Lengkapkan.' }),
    Object.assign({}, S6[3], { title: 'Isikan tempat kosong.' }),
    { s: 'BA', title: 'Suaikan.', ar: 'وَفِّقْ', sub: 'Lihat gambar ruang tamu: jam, datuk, anggur, kucing dan pensel.', type: 'match',
      pairs: [[P('anggur'), T('عِنَبٌ')], [P('pensel'), T('مِرْسَمٌ')], [P('kucing'), T('قِطٌّ')], [T('٩'), T('تِسْعَةٌ')], [P('datuk'), T('جَدٌّ')]] },
    S6[5], S6[6], S6[7], S6[8], S6[9],
  ] },
);
