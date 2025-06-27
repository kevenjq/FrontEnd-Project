// File: js/chartloader.js (updated)
document.addEventListener('DOMContentLoaded', async function () {
  const ctx = document.getElementById('price-chart')?.getContext('2d');
  if (!ctx) return;

  const urlParams = new URLSearchParams(window.location.search);
  const symbol = urlParams.get('symbol') || 'AAPL';

  try {
    const res = await fetch(`http://api.marketstack.com/v1/eod?access_key=42fdd20dc4698fa44e10163ecd0bd55d&symbols=${symbol}&limit=30`);
    const json = await res.json();
    const data = json.data.reverse();

    const labels = data.map(d => new Date(d.date).toLocaleDateString());
    const prices = data.map(d => d.close);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `${symbol} Price`,
          data: prices,
          borderColor: 'var(--primary)',
          backgroundColor: 'var(--chart-up)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              color: 'var(--text-secondary)'
            }
          },
          x: {
            ticks: {
              color: 'var(--text-secondary)'
            }
          }
        }
      }
    });
  } catch (err) {
    console.error('Error fetching stock chart data:', err);
  }
});