// js/tests.js

// ----------------------------------------
// 1️⃣ Navigation Tests (with async injection)
// ----------------------------------------
QUnit.module('Navigation', hooks => {
  // Before any tests, fetch index.html and inject its <nav> into the fixture
  hooks.before(async () => {
    const res = await fetch('index.html');
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, 'text/html');
    const nav = doc.querySelector('nav');
    if (nav) {
      // clone into the qunit-fixture so tests can see it fresh each run
      document.getElementById('qunit-fixture').appendChild(nav.cloneNode(true));
    }
  });

  QUnit.test('Main navbar links exist and point correctly', assert => {
    const anchors = Array.from(document.querySelectorAll('#qunit-fixture nav a'));

    function hasLink(text, hrefEnd) {
      return anchors.some(a =>
        a.textContent.trim().toLowerCase() === text.toLowerCase() &&
        a.getAttribute('href').toLowerCase().endsWith(hrefEnd.toLowerCase())
      );
    }

    assert.ok(hasLink('Home', 'index.html'), 'Home → index.html');
    assert.ok(hasLink('Stocks', 'stocks.html'), 'Stocks → pages/stocks.html');
    assert.ok(hasLink('Portfolio', 'portfolio.html'), 'Portfolio → pages/portfolio.html');
  });
});

// ----------------------------------------
// 2️⃣ Real-time Stock Updates
// ----------------------------------------
QUnit.module('Real-time Stock Updates', hooks => {
  let clock;
  hooks.before(() => {
    clock = sinon.useFakeTimers();
  });
  hooks.after(() => {
    clock.restore();
  });

  QUnit.test('fetchMarketData returns a Promise that resolves with expected shape', assert => {
    const done = assert.async();
    const p = fetchMarketData();
    assert.ok(p instanceof Promise, 'fetchMarketData() is a Promise');
    p.then(data => {
      assert.ok(data.market, 'response.market exists');
      assert.ok(Array.isArray(data.topStocks), 'response.topStocks is an array');
      done();
    });
    // advance any timeouts inside fetchMarketData
    clock.tick(1500);
  });

  QUnit.todo('Integration with real API endpoint for live updates');
});

// ----------------------------------------
// 3️⃣ Portfolio Management
// ----------------------------------------
QUnit.module('Portfolio Management', () => {
  QUnit.test('Portfolio summary card shows Account Balance', assert => {
    const card = document.querySelector('.portfolio-summary-card');
    assert.ok(card, 'Found .portfolio-summary-card');
    assert.ok(card.textContent.includes('Account Balance'), 'Card contains "Account Balance"');
  });

  QUnit.todo('Add Funds / Trade buttons trigger modals');
});

// ----------------------------------------
// 4️⃣ Geolocation Detection
// ----------------------------------------
QUnit.module('Geolocation Detection', () => {
  QUnit.test('Location display is populated', assert => {
    const display = document.getElementById('location-display');
    assert.ok(display, '#location-display exists');
    assert.ok(/Showing data for:/.test(display.textContent), 'Text "Showing data for:" present');
  });

  QUnit.todo('loadMarketData called with correct country code');
});

// ----------------------------------------
// 5️⃣ Responsive Design
// ----------------------------------------
QUnit.module('Responsive Design', () => {
  QUnit.test('Viewport meta tag present', assert => {
    const meta = document.querySelector('meta[name="viewport"]');
    assert.ok(meta, 'Viewport <meta> tag is present');
  });

  QUnit.todo('Orientation change listener works');
});

// ----------------------------------------
// 6️⃣ Authentication UI
// ----------------------------------------
QUnit.module('Authentication UI', () => {
  QUnit.test('Auth form toggles sign-in/up', assert => {
    const toggle = document.getElementById('toggle-mode');
    const title  = document.getElementById('auth-title');
    toggle.click();
    assert.equal(title.textContent.trim(), 'Create Your Account', 'Switched to sign‑up');
    toggle.click();
    assert.equal(title.textContent.trim(), 'Sign In to Your Account', 'Switched back to sign‑in');
  });

  QUnit.todo('loginUser / registerUser fire API calls');
});

// ----------------------------------------
// 7️⃣ Stock News
// ----------------------------------------
QUnit.module('Stock News', () => {
  QUnit.test('Stock-detail page renders news cards', assert => {
    const cards = document.querySelectorAll('#stock-news .card');
    assert.ok(cards.length >= 1, 'At least one news .card present');
  });

  QUnit.todo('Fetch live news from API');
});

// ----------------------------------------
// 8️⃣ Pro Purchase Flow
// ----------------------------------------
QUnit.module('Pro Purchase Flow', () => {
  QUnit.todo('Clicking Upgrade to Pro triggers payment');
  QUnit.todo('Pro plan button styling correct');
});

// ----------------------------------------
// 9️⃣ Error Handling
// ----------------------------------------
QUnit.module('Error Handling', () => {
  QUnit.todo('Form validation errors display without crash');
  QUnit.todo('Global JS errors are caught/logged');
});

// ----------------------------------------
// 🔟 Stock Detail Info
// ----------------------------------------
QUnit.module('Stock Detail Info', () => {
  QUnit.test('Market Cap row exists', assert => {
    const row = document.querySelector('#market-cap');
    assert.ok(row, '#market-cap row is in the table');
  });

  QUnit.todo('Price chart instantiates on canvas');
});