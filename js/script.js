// js/script.js

// Company details mapping
const companyDetails = {
  'AAPL': {
    name: 'Apple Inc.',
    marketCap: '2.87T',
    volume: '54.3M',
    high: '$182.94',
    low: '$124.17',
    pe: '29.34'
  },
  'MSFT': {
    name: 'Microsoft Corporation',
    marketCap: '2.23T',
    volume: '28.5M',
    high: '$343.11',
    low: '$219.35',
    pe: '33.76'
  },
  'GOOG': {
    name: 'Alphabet Inc.',
    marketCap: '1.75T',
    volume: '25.1M',
    high: '$149.84',
    low: '$88.91',
    pe: '24.56'
  },
  'AMZN': {
    name: 'Amazon.com Inc.',
    marketCap: '1.56T',
    volume: '45.2M',
    high: '$145.86',
    low: '$81.43',
    pe: '58.72'
  },
  'META': {
    name: 'Meta Platforms Inc.',
    marketCap: '1.08T',
    volume: '22.3M',
    high: '$384.33',
    low: '$88.09',
    pe: '31.45'
  },
  'TSLA': {
    name: 'Tesla Inc.',
    marketCap: '0.67T',
    volume: '98.4M',
    high: '$299.29',
    low: '$101.81',
    pe: '68.91'
  },
  'NFLX': {
    name: 'Netflix Inc.',
    marketCap: '0.25T',
    volume: '8.3M',
    high: '$485.00',
    low: '$285.33',
    pe: '42.15'
  },
  'NVDA': {
    name: 'NVIDIA Corporation',
    marketCap: '1.12T',
    volume: '45.7M',
    high: '$502.66',
    low: '$138.84',
    pe: '64.83'
  },
  'JPM': {
    name: 'JPMorgan Chase & Co.',
    marketCap: '0.51T',
    volume: '12.8M',
    high: '$172.96',
    low: '$126.01',
    pe: '11.23'
  },
  'V': {
    name: 'Visa Inc.',
    marketCap: '0.49T',
    volume: '9.1M',
    high: '$250.78',
    low: '$170.69',
    pe: '31.56'
  }
};

// Fetch market data from API
async function fetchMarketData(symbols) {
  const API_KEY = '42fdd20dc4698fa44e10163ecd0bd55d';
  const baseUrl = 'https://api.marketstack.com/v1/eod/latest';
  const url = `${baseUrl}?access_key=${API_KEY}&symbols=${symbols.join(',')}`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    if (!json.data || !Array.isArray(json.data)) {
      throw new Error('Invalid response from Marketstack');
    }

    return json.data.map(stock => {
      const change = stock.close - stock.open;
      const changePercent = (change / stock.open) * 100;
      return {
        symbol: stock.symbol,
        name: companyDetails[stock.symbol]?.name || stock.symbol,
        price: stock.close,
        open: stock.open,
        change,
        changePercent,
        date: stock.date,
        details: companyDetails[stock.symbol] || {}
      };
    });
  } catch (err) {
    console.error('Error fetching market data:', err);
    return [];
  }
}

// Load stocks data for stocks page
async function loadStocksData() {
  const tableBody = document.getElementById('stocks-table');
  
  try {
    const symbols = Object.keys(companyDetails);
    const stocks = await fetchMarketData(symbols);
    
    if (stocks.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-5">
            <div class="empty-state">
              <div class="empty-state-icon">⚠️</div>
              <h4>Failed to load stock data</h4>
              <p class="text-secondary">Please try again later</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }
    
    // Clear loading spinner
    tableBody.innerHTML = '';
    
    // Populate table rows
    stocks.forEach(stock => {
      const trendClass = stock.change >= 0 ? 'stock-up' : 'stock-down';
      const trendIcon = stock.change >= 0 ? '▲' : '▼';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <a href="stock-detail.html?symbol=${stock.symbol}" class="stock-symbol text-decoration-none">
            ${stock.symbol}
          </a>
        </td>
        <td>${stock.name}</td>
        <td>$${stock.price.toFixed(2)}</td>
        <td class="${trendClass}">${trendIcon} ${Math.abs(stock.change).toFixed(2)}</td>
        <td class="${trendClass}">${trendIcon} ${Math.abs(stock.changePercent).toFixed(2)}%</td>
      `;
      tableBody.appendChild(row);
    });
    
  } catch (error) {
    console.error('Error loading market data:', error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-5">
          <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <h4>Error loading data</h4>
            <p class="text-secondary">Please check your connection</p>
          </div>
        </td>
      </tr>
    `;
  }
}

// Setup search functionality for stocks page
function setupStocksSearch() {
  const searchInput = document.getElementById('stock-search');
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#stocks-table tr');
    
    rows.forEach(row => {
      const symbol = row.cells[0].textContent.toLowerCase();
      const name = row.cells[1].textContent.toLowerCase();
      
      if (symbol.includes(searchTerm) || name.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// Load stock details for stock detail page
async function loadStockDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const symbol = urlParams.get('symbol');
  
  if (!symbol) {
    console.error('No stock symbol provided');
    return;
  }
  
  try {
    const stocks = await fetchMarketData([symbol]);
    
    if (stocks.length === 0) {
      console.error('Stock not found');
      return;
    }
    
    const stock = stocks[0];
    
    // Update stock details
    document.getElementById('stock-symbol').textContent = stock.symbol;
    document.getElementById('stock-name').textContent = stock.name;
    document.getElementById('stock-price').textContent = `$${stock.price.toFixed(2)}`;
    
    const changeElement = document.getElementById('stock-change');
    const isPositive = stock.change >= 0;
    const changeSign = isPositive ? '▲' : '▼';
    changeElement.textContent = `${changeSign} ${Math.abs(stock.change).toFixed(2)} (${Math.abs(stock.changePercent).toFixed(2)}%)`;
    changeElement.className = isPositive ? 'fs-4 stock-up' : 'fs-4 stock-down';
    
    // Update key information
    if (stock.details) {
      document.getElementById('market-cap').textContent = stock.details.marketCap || 'N/A';
      document.getElementById('volume').textContent = stock.details.volume || 'N/A';
      document.getElementById('high').textContent = stock.details.high || 'N/A';
      document.getElementById('low').textContent = stock.details.low || 'N/A';
      document.getElementById('pe').textContent = stock.details.pe || 'N/A';
    }
    
  } catch (error) {
    console.error('Error loading stock details:', error);
  }
}

// Initialize stocks page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Stocks page
  if (document.getElementById('stocks-table')) {
    loadStocksData();
    setupStocksSearch();
  }
  
  // Stock detail page
  if (document.getElementById('stock-symbol')) {
    loadStockDetail();
  }
});