// API PLACEHOLDER: Replace with actual stock API integration
const fetchMarketData = () => {
  return new Promise((resolve) => {
    // Simulated API delay
    setTimeout(() => {
      resolve({
        market: "NASDAQ",
        index: 14234.56,
        change: 234.12,
        changePercent: 1.67,
        topStocks: [
          { symbol: "AAPL", name: "Apple Inc.", price: 172.35, change: 2.45, changePercent: 1.44 },
          { symbol: "MSFT", name: "Microsoft Corp.", price: 289.12, change: -1.23, changePercent: -0.42 },
          { symbol: "GOOGL", name: "Alphabet Inc.", price: 125.78, change: 3.21, changePercent: 2.62 }
        ]
      });
    }, 1500);
  });
};

// Render market data
const renderMarketData = (data) => {
  const container = document.getElementById('market-overview');
  if (!container) return;
  
  // Market summary card
  const trendClass = data.change >= 0 ? 'stock-up' : 'stock-down';
  const trendIcon = data.change >= 0 ? '▲' : '▼';
  
  container.innerHTML = `
    <div class="col-md-6 mb-4">
      <div class="card h-100">
        <div class="card-body">
          <h3 class="card-title">${data.market}</h3>
          <div class="d-flex align-items-end mb-3">
            <span class="display-4 fw-bold me-3">${data.index.toFixed(2)}</span>
            <span class="fs-5 ${trendClass}">
              ${trendIcon} ${data.change.toFixed(2)} (${data.changePercent.toFixed(2)}%)
            </span>
          </div>
          <a href="pages/stocks.html" class="btn btn-primary">View All Stocks</a>
        </div>
      </div>
    </div>
  `;
  
  // Top stocks cards
  data.topStocks.forEach(stock => {
    const stockTrendClass = stock.change >= 0 ? 'stock-up' : 'stock-down';
    const stockTrendIcon = stock.change >= 0 ? '▲' : '▼';
    
    container.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${stock.symbol}</h5>
            <p class="card-text text-secondary">${stock.name}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="fs-4 fw-bold">$${stock.price.toFixed(2)}</span>
              <span class="${stockTrendClass}">
                ${stockTrendIcon} ${Math.abs(stock.change.toFixed(2))}%
              </span>
            </div>
            <a href="pages/stock-detail.html?symbol=${stock.symbol}" class="stretched-link"></a>
          </div>
        </div>
      </div>
    `;
  });
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchMarketData();
  renderMarketData(data);
});