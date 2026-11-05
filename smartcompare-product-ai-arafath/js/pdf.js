/**
 * pdf.js — SmartCompare AI
 * Exports comparison report as PDF using jsPDF + html2canvas.
 */

const PDF_EXPORT = (() => {

  async function exportReport(specA, specB, scoresA, scoresB, totalA, totalB, mode) {
    const { jsPDF } = window.jspdf;

    if (!jsPDF) {
      alert('jsPDF not loaded. Check your internet connection.');
      return;
    }

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210; // A4 width mm
    const MARGIN = 16;
    let y = MARGIN;

    /* ── Palette ────────────────────────────────── */
    const COL_BG     = [17, 17, 17];
    const COL_CARD   = [26, 26, 26];
    const COL_ACCENT = [224, 32, 32];
    const COL_ACCENT2 = [200, 200, 200];
    const COL_TEXT   = [240, 242, 255];
    const COL_MUTED  = [139, 143, 168];
    const COL_BORDER = [40, 43, 65];

    function setFill(rgb)   { doc.setFillColor(...rgb); }
    function setDraw(rgb)   { doc.setDrawColor(...rgb); }
    function setTxt(rgb)    { doc.setTextColor(...rgb); }
    function rect(x, cx, cy, cw, ch) { doc.rect(cx, cy, cw, ch, 'F'); }

    /* ── Background ─────────────────────────────── */
    setFill(COL_BG);
    doc.rect(0, 0, W, 297, 'F');

    /* ── Header ─────────────────────────────────── */
    setFill(COL_CARD);
    doc.rect(0, 0, W, 28, 'F');

    setFill(COL_ACCENT);
    doc.rect(0, 0, 4, 28, 'F');

    setTxt(COL_ACCENT);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('⚡ SmartCompare AI', MARGIN, 12);

    setTxt(COL_MUTED);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Comparison Report  •  Mode: ${capitalize(mode)}  •  ${new Date().toLocaleDateString()}`, MARGIN, 22);
    y = 38;

    /* ── Product names ───────────────────────────── */
    const nameA = specA.name || 'Product A';
    const nameB = specB.name || 'Product B';

    const colW = (W - MARGIN * 2 - 8) / 2;
    function drawProductHeader(name, score, accentRgb, cx) {
      setFill(COL_CARD);
      doc.roundedRect(cx, y, colW, 22, 3, 3, 'F');
      setDraw(accentRgb);
      doc.setLineWidth(0.5);
      doc.roundedRect(cx, y, colW, 22, 3, 3, 'S');

      setTxt(accentRgb);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(truncate(name, 26), cx + 8, y + 9);

      setTxt(COL_MUTED);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`Score: ${score}/100`, cx + 8, y + 17);
    }

    drawProductHeader(nameA, totalA, COL_ACCENT, MARGIN);
    drawProductHeader(nameB, totalB, COL_ACCENT2, MARGIN + colW + 8);
    y += 28;

    /* ── Winner label ────────────────────────────── */
    const winner     = totalA >= totalB ? nameA : nameB;
    const winnerAcc  = totalA >= totalB ? COL_ACCENT : COL_ACCENT2;
    setFill(winnerAcc.map(v => Math.min(255, v * 0.2)));
    doc.roundedRect(MARGIN, y, W - MARGIN * 2, 12, 2, 2, 'F');
    setTxt(winnerAcc);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`🏆  Recommended for ${capitalize(mode)}: ${winner}`, MARGIN + 6, y + 8);
    y += 18;

    /* ── Spec comparison table ───────────────────── */
    const specFields = [
      { label: 'Price',      keyA: specA.price,     keyB: specB.price,     fmt: v => v ? `$${v}` : '—' },
      { label: 'RAM',        keyA: specA.ram,        keyB: specB.ram,       fmt: v => v ? `${v}GB` : '—' },
      { label: 'Storage',    keyA: specA.storage,    keyB: specB.storage,   fmt: v => v ? (v>=1024?`${v/1024}TB`:`${v}GB`) : '—' },
      { label: 'Battery',    keyA: specA.battery,    keyB: specB.battery,   fmt: v => v ? `${v}mAh` : '—' },
      { label: 'Camera',     keyA: specA.camera,     keyB: specB.camera,    fmt: v => v ? `${v}MP` : '—' },
      { label: 'Display',    keyA: specA.display,    keyB: specB.display,   fmt: v => v ? `${v}"` : '—' },
      { label: 'Rating',     keyA: specA.rating,     keyB: specB.rating,    fmt: v => v ? `${v}/5` : '—' },
      { label: 'Processor',  keyA: specA.processor,  keyB: specB.processor, fmt: v => v ? truncate(v,20) : '—' },
    ];

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    setTxt(COL_TEXT);
    doc.text('Specifications', MARGIN, y);
    y += 6;

    const labelW = 36, valW = (W - MARGIN * 2 - labelW) / 2;

    // Table header
    setFill(COL_CARD);
    doc.rect(MARGIN, y, W - MARGIN * 2, 7, 'F');
    setTxt(COL_MUTED);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Spec', MARGIN + 2, y + 5);
    doc.text(truncate(nameA, 18), MARGIN + labelW + 2, y + 5);
    doc.text(truncate(nameB, 18), MARGIN + labelW + valW + 2, y + 5);
    y += 7;

    specFields.forEach((f, i) => {
      if (i % 2 === 0) { setFill([14, 16, 26]); } else { setFill(COL_CARD); }
      doc.rect(MARGIN, y, W - MARGIN * 2, 7, 'F');

      setTxt(COL_MUTED);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(f.label, MARGIN + 2, y + 5);

      // Highlight winner cell
      const valA = f.keyA, valB = f.keyB;
      const fmtA = f.fmt(valA), fmtB = f.fmt(valB);

      // For numeric fields, determine winner
      const isNumeric = typeof valA === 'number' && typeof valB === 'number';
      const higherIsWin = f.label !== 'Price';
      const aWins = isNumeric && (higherIsWin ? valA > valB : valA < valB);
      const bWins = isNumeric && (higherIsWin ? valB > valA : valB < valA);

      if (aWins) setTxt(COL_ACCENT2); else setTxt(COL_TEXT);
      doc.text(fmtA, MARGIN + labelW + 2, y + 5);

      if (bWins) setTxt(COL_ACCENT2); else setTxt(COL_TEXT);
      doc.text(fmtB, MARGIN + labelW + valW + 2, y + 5);

      y += 7;
    });
    y += 6;

    /* ── Score breakdown table ───────────────────── */
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    setTxt(COL_TEXT);
    doc.text('Scores by Metric', MARGIN, y);
    y += 6;

    const scoreMetrics = ['performance', 'battery', 'camera', 'storage', 'value', 'rating'];
    setFill(COL_CARD);
    doc.rect(MARGIN, y, W - MARGIN * 2, 7, 'F');
    setTxt(COL_MUTED);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Metric', MARGIN + 2, y + 5);
    doc.text(truncate(nameA, 18), MARGIN + 50, y + 5);
    doc.text(truncate(nameB, 18), MARGIN + 100, y + 5);
    y += 7;

    scoreMetrics.forEach((metric, i) => {
      if (i % 2 === 0) { setFill([14, 16, 26]); } else { setFill(COL_CARD); }
      doc.rect(MARGIN, y, W - MARGIN * 2, 7, 'F');

      setTxt(COL_MUTED);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(capitalize(metric), MARGIN + 2, y + 5);

      const sA = Math.round(scoresA[metric] ?? 0);
      const sB = Math.round(scoresB[metric] ?? 0);

      if (sA >= sB) setTxt(COL_ACCENT2); else setTxt(COL_TEXT);
      doc.text(`${sA}/100`, MARGIN + 50, y + 5);

      if (sB > sA) setTxt(COL_ACCENT2); else setTxt(COL_TEXT);
      doc.text(`${sB}/100`, MARGIN + 100, y + 5);

      y += 7;
    });
    y += 8;

    /* ── Charts screenshot ───────────────────────── */
    const chartsRow = document.getElementById('charts-row');
    if (chartsRow && window.html2canvas) {
      try {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        setTxt(COL_TEXT);
        doc.text('Visual Analysis', MARGIN, y);
        y += 6;

        const canvas = await html2canvas(chartsRow, {
          backgroundColor: '#0a0b12',
          scale: 1.5,
          logging: false,
          useCORS: true
        });
        const imgData = canvas.toDataURL('image/png');
        const imgH = Math.min(70, (canvas.height / canvas.width) * (W - MARGIN * 2));
        doc.addImage(imgData, 'PNG', MARGIN, y, W - MARGIN * 2, imgH);
        y += imgH + 8;
      } catch (e) {
        console.warn('Chart screenshot failed:', e);
      }
    }

    /* ── Footer ─────────────────────────────────── */
    setFill(COL_CARD);
    doc.rect(0, 285, W, 12, 'F');
    setTxt(COL_MUTED);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Generated by SmartCompare AI — data stays in your browser', MARGIN, 292);
    doc.text(`Page 1`, W - MARGIN, 292, { align: 'right' });

    /* ── Save ────────────────────────────────────── */
    const filename = `smartcompare-${sanitizeFilename(nameA)}-vs-${sanitizeFilename(nameB)}.pdf`;
    doc.save(filename);
  }

  /* ── Helpers ─────────────────────────────────── */
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
  function truncate(s, n) { return s && s.length > n ? s.substring(0, n) + '…' : s || ''; }
  function sanitizeFilename(s) {
    return (s || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 20);
  }

  return { exportReport };
})();
