// File: js/chart-loader.js
document.addEventListener('DOMContentLoaded', async function () {
  const ctx = document.getElementById('price-chart')?.getContext('2d');
  if (!ctx) return;

  const urlParams = new URLSearchParams(window.location.search);
  const symbol = urlParams.get('symbol') || 'AAPL';

  try {
    const res = await fetch(`https://api.marketstack.com/v1/eod?access_key=42fdd20dc4698fa44e10163ecd0bd55d&symbols=${symbol}&limit=30`);
    const json = await res.json();
    
    if (!json.data || !Array.isArray(json.data)) {
      throw new Error('Invalid response from Marketstack');
    }
    
    const data = json.data.reverse();

    const labels = data.map(d => new Date(d.date).toLocaleDateString());
    const prices = data.map(d => d.close);

    // Destroy existing chart if it exists
    if (window.stockChart) {
      window.stockChart.destroy();
    }

    window.stockChart = new Chart(ctx, {
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
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(15, 24, 32, 0.9)',
            titleColor: '#CBD5E0',
            bodyColor: '#FFFFFF',
            borderColor: '#316D60',
            borderWidth: 1,
            padding: 12,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'var(--text-secondary)',
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'var(--text-secondary)',
              callback: function(value) {
                return '$' + value;
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  } catch (err) {
    console.error('Error fetching stock chart data:', err);
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
      chartContainer.innerHTML = '<p class="text-danger">Failed to load chart data. Please try again later.</p>';
    }
  }
});