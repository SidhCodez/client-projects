/**
 * charts.js — SmartCompare AI
 * Renders radar, bar, and price comparison charts using Chart.js.
 */

const CHARTS = (() => {

  let radarChart = null;
  let barChart   = null;
  let priceChart = null;

  /* ── Design tokens (mirror CSS vars) ───────────── */
  const COLOR_A     = 'rgba(224, 32, 32, 1)';
  const COLOR_A_BG  = 'rgba(224, 32, 32, 0.18)';
  const COLOR_B     = 'rgba(255, 255, 255, 0.85)';
  const COLOR_B_BG  = 'rgba(255, 255, 255, 0.10)';
  const TEXT_MUTED  = 'rgba(139, 143, 168, 0.8)';
  const BORDER_COL  = 'rgba(255, 255, 255, 0.08)';
  const FONT        = "'Space Grotesk', sans-serif";

  /* ── Chart defaults ─────────────────────────────── */
  Chart.defaults.color = TEXT_MUTED;
  Chart.defaults.font.family = FONT;
  Chart.defaults.font.size = 11;

  function destroyAll() {
    [radarChart, barChart, priceChart].forEach(c => c && c.destroy());
    radarChart = barChart = priceChart = null;
  }

  /* ── Radar Chart ────────────────────────────────── */
  function drawRadar(specA, specB, scoresA, scoresB, nameA, nameB) {
    const ctx = document.getElementById('chart-radar');
    if (!ctx) return;
    if (radarChart) radarChart.destroy();

    const labels = ['Performance', 'Battery', 'Camera', 'Storage', 'Value', 'Rating'];
    const dataA  = [
      scoresA.performance ?? 0,
      scoresA.battery     ?? 0,
      scoresA.camera      ?? 0,
      scoresA.storage     ?? 0,
      scoresA.value       ?? 0,
      scoresA.rating      ?? 0
    ];
    const dataB = [
      scoresB.performance ?? 0,
      scoresB.battery     ?? 0,
      scoresB.camera      ?? 0,
      scoresB.storage     ?? 0,
      scoresB.value       ?? 0,
      scoresB.rating      ?? 0
    ];

    radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: nameA,
            data: dataA,
            borderColor: COLOR_A,
            backgroundColor: COLOR_A_BG,
            pointBackgroundColor: COLOR_A,
            pointBorderColor: '#fff',
            pointRadius: 4,
            borderWidth: 2
          },
          {
            label: nameB,
            data: dataB,
            borderColor: COLOR_B,
            backgroundColor: COLOR_B_BG,
            pointBackgroundColor: COLOR_B,
            pointBorderColor: '#fff',
            pointRadius: 4,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 25,
              display: false
            },
            grid: { color: BORDER_COL },
            angleLines: { color: BORDER_COL },
            pointLabels: {
              color: TEXT_MUTED,
              font: { size: 11, family: FONT }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              boxWidth: 12,
              color: TEXT_MUTED
            }
          }
        }
      }
    });
  }

  /* ── Bar Chart ──────────────────────────────────── */
  function drawBar(scoresA, scoresB, nameA, nameB) {
    const ctx = document.getElementById('chart-bar');
    if (!ctx) return;
    if (barChart) barChart.destroy();

    const labels  = ['Performance', 'Battery', 'Camera', 'Storage', 'Value', 'Rating'];
    const keysA   = ['performance', 'battery', 'camera', 'storage', 'value', 'rating'];
    const dataA   = keysA.map(k => Math.round(scoresA[k] ?? 0));
    const dataB   = keysA.map(k => Math.round(scoresB[k] ?? 0));

    barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: nameA,
            data: dataA,
            backgroundColor: COLOR_A_BG,
            borderColor: COLOR_A,
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: nameB,
            data: dataB,
            backgroundColor: COLOR_B_BG,
            borderColor: COLOR_B,
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: BORDER_COL },
            ticks: { color: TEXT_MUTED, maxRotation: 30 }
          },
          y: {
            min: 0,
            max: 100,
            grid: { color: BORDER_COL },
            ticks: { color: TEXT_MUTED, stepSize: 25 }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 16, boxWidth: 12, color: TEXT_MUTED }
          },
          tooltip: {
            backgroundColor: 'rgba(17,19,31,0.95)',
            borderColor: BORDER_COL,
            borderWidth: 1,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}/100`
            }
          }
        }
      }
    });
  }

  /* ── Price vs Score Bubble Chart ────────────────── */
  function drawPriceChart(specA, specB, totalA, totalB, nameA, nameB) {
    const ctx = document.getElementById('chart-price');
    if (!ctx) return;
    if (priceChart) priceChart.destroy();

    const priceA = specA.price || 0;
    const priceB = specB.price || 0;

    priceChart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: nameA,
            data: [{ x: priceA, y: totalA, r: 18 }],
            backgroundColor: COLOR_A_BG,
            borderColor: COLOR_A,
            borderWidth: 2
          },
          {
            label: nameB,
            data: [{ x: priceB, y: totalB, r: 18 }],
            backgroundColor: COLOR_B_BG,
            borderColor: COLOR_B,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Price (USD)',
              color: TEXT_MUTED
            },
            grid: { color: BORDER_COL },
            ticks: {
              color: TEXT_MUTED,
              callback: v => v > 0 ? `$${v}` : '$0'
            }
          },
          y: {
            min: 0,
            max: 105,
            title: {
              display: true,
              text: 'Total Score',
              color: TEXT_MUTED
            },
            grid: { color: BORDER_COL },
            ticks: { color: TEXT_MUTED }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 16, boxWidth: 12, color: TEXT_MUTED }
          },
          tooltip: {
            backgroundColor: 'rgba(17,19,31,0.95)',
            borderColor: BORDER_COL,
            borderWidth: 1,
            callbacks: {
              label: ctx => {
                const d = ctx.raw;
                return ` ${ctx.dataset.label}: Score ${d.y} @ $${d.x}`;
              }
            }
          }
        }
      }
    });
  }

  /* ── Public API ─────────────────────────────────── */
  function renderAll(specA, specB, scoresA, scoresB, totalA, totalB, nameA, nameB) {
    destroyAll();
    drawRadar(specA, specB, scoresA, scoresB, nameA, nameB);
    drawBar(scoresA, scoresB, nameA, nameB);
    drawPriceChart(specA, specB, totalA, totalB, nameA, nameB);
  }

  return { renderAll, destroyAll };
})();
