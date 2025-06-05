// This file is for the stock-detail page to load the chart
document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('price-chart')?.getContext('2d');
  if (!ctx) return;
  
  // Mock data for the chart
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Stock Price',
      data: [150, 145, 160, 165, 170, 168, 172],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };
  
  new Chart(ctx, {
    type: 'line',
    data: data,
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
          beginAtZero: false
        }
      }
    }
  });
});