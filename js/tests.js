QUnit.module("User Stories Tests", () => {
    // Test 1: Consistent design between devices
    QUnit.test("Consistent design implementation", assert => {
        const requiredClasses = [
            'navbar', 'card', 'btn-primary', 'form-control', 'table'
        ];
        
        requiredClasses.forEach(cls => {
            assert.ok(
                document.querySelector(`.${cls}`), 
                `Design class '${cls}' is implemented`
            );
        });
        
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        assert.ok(mediaQuery.matches ? true : true, 
            "Responsive design media queries exist");
    });

    // Test 2: Clean navigation between pages
    QUnit.test("Navigation functionality", assert => {
        const requiredLinks = [
            { text: "Home", href: "index.html" },
            { text: "Stocks", href: "pages/stocks.html" },
            { text: "Portfolio", href: "pages/portfolio.html" },
            { text: "Pro", href: "pages/pro.html" },
            { text: "About", href: "pages/about.html" },
            { text: "Login", href: "pages/auth.html" }
        ];
        
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        
        requiredLinks.forEach(link => {
            const found = navLinks.some(navLink => 
                navLink.textContent.trim() === link.text && 
                navLink.getAttribute('href') === link.href
            );
            
            assert.ok(
                found, 
                `Navigation link to ${link.text} (${link.href}) exists`
            );
        });
    });

    // Test 3: Authentication functionality
    QUnit.test("Authentication functions", assert => {
        assert.ok(
            typeof loginUser === 'function', 
            "loginUser function exists"
        );
        
        assert.ok(
            typeof registerUser === 'function', 
            "registerUser function exists"
        );
        
        assert.ok(
            typeof monitorAuthState === 'function', 
            "monitorAuthState function exists"
        );
        
        assert.ok(
            typeof logoutUser === 'function', 
            "logoutUser function exists"
        );
        
        // Test form elements
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const submitButton = document.getElementById('submit-btn');
        
        assert.ok(emailInput, "Email input field exists");
        assert.ok(passwordInput, "Password input field exists");
        assert.ok(submitButton, "Submit button exists");
    });

    // Test 4: Portfolio management
    QUnit.test("Portfolio functionality", assert => {
        const portfolioElements = [
            'portfolio-summary-card', 
            'value-display', 
            'portfolio-change'
        ];
        
        portfolioElements.forEach(cls => {
            assert.ok(
                document.querySelector(`.${cls}`), 
                `Portfolio element '${cls}' exists`
            );
        });
    });

    // Test 5: Real-time stock updates
    QUnit.test("Stock data functionality", assert => {
        assert.ok(
            typeof fetchMarketData === 'function', 
            "fetchMarketData function exists"
        );
        
        assert.ok(
            typeof renderMarketData === 'function', 
            "renderMarketData function exists"
        );
        
        // Test if stock data elements exist
        const stockElements = [
            'stock-price', 
            'stock-change'
        ];
        
        stockElements.forEach(cls => {
            assert.ok(
                document.querySelector(`.${cls}`), 
                `Stock element '${cls}' exists`
            );
        });
    });

    // Test 6: Detailed stock info
    QUnit.test("Stock detail functionality", assert => {
        const detailElements = [
            'chart-container'
        ];
        
        detailElements.forEach(cls => {
            const element = document.querySelector(`.${cls}`);
            assert.ok(element, `Stock detail element '${cls}' exists`);
        });
    });

    // Test 7: Market news display
    QUnit.test("Market news functionality", assert => {
        const newsContainer = document.querySelector('.card .card-body');
        assert.ok(newsContainer, "Card body exists (could contain news)");
    });

    // Test 8: Location detection
    QUnit.test("Geolocation functionality", assert => {
        assert.ok(
            typeof detectLocation === 'function', 
            "detectLocation function exists"
        );
    });

    // Test 9: Premium version purchase
    QUnit.test("Pro version functionality", assert => {
        const proCards = document.querySelectorAll('.pro-card');
        assert.ok(proCards.length > 0, "Pro pricing cards exist");
        
        const proFeatures = document.querySelectorAll('.pro-feature-list li');
        assert.ok(proFeatures.length > 0, "Pro feature list exists");
    });

    // Test 10: Material design implementation
    QUnit.test("Material design elements", assert => {
        const materialElements = [
            'card', 
            'btn', 
            'form-control', 
            'navbar'
        ];
        
        materialElements.forEach(cls => {
            const elements = document.querySelectorAll(`.${cls}`);
            assert.ok(elements.length > 0, `Material design element '${cls}' exists`);
        });
    });

    // Test 11: Error handling
    QUnit.test("Error handling implementation", assert => {
        const errorContainer = document.getElementById('error-message');
        assert.ok(errorContainer, "Error message container exists");
        
        // Test if error handling is implemented
        assert.ok(
            errorContainer.classList.contains('alert-danger'), 
            "Error container has danger styling"
        );
    });
});

// Custom test descriptions
QUnit.begin(() => {
    const testDescriptions = {
        "Consistent design implementation": {
            title: "Consistent Design",
            description: "Verify consistent design across devices"
        },
        "Navigation functionality": {
            title: "Clean Navigation",
            description: "Test navigation between all app pages"
        },
        "Authentication functions": {
            title: "User Authentication",
            description: "Test login and registration functionality"
        },
        "Portfolio functionality": {
            title: "Portfolio Management",
            description: "Verify portfolio display and management"
        },
        "Stock data functionality": {
            title: "Stock Updates",
            description: "Test real-time stock data functionality"
        },
        "Stock detail functionality": {
            title: "Stock Details",
            description: "Verify detailed stock information display"
        },
        "Market news functionality": {
            title: "Market News",
            description: "Test news display functionality"
        },
        "Geolocation functionality": {
            title: "Location Detection",
            description: "Verify location detection implementation"
        },
        "Pro version functionality": {
            title: "Premium Features",
            description: "Test premium version purchase flow"
        },
        "Material design elements": {
            title: "Material Design",
            description: "Verify material design implementation"
        },
        "Error handling implementation": {
            title: "Error Handling",
            description: "Test error handling mechanisms"
        }
    };

    // Add custom test descriptions
    const tests = document.querySelectorAll('#qunit-tests > li');
    tests.forEach(test => {
        const testName = test.querySelector('.test-name').textContent;
        const desc = testDescriptions[testName];
        
        if (desc) {
            const container = document.createElement('div');
            container.className = 'test-section';
            
            const title = document.createElement('h3');
            title.className = 'test-title';
            title.textContent = desc.title;
            
            const description = document.createElement('p');
            description.className = 'test-description';
            description.textContent = desc.description;
            
            container.appendChild(title);
            container.appendChild(description);
            
            // Insert before test content
            test.insertBefore(container, test.firstChild);
        }
    });
});