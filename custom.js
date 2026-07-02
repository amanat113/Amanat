// ====== CUSTOM FEATURES + PREMIUM DYNAMIC ISLAND + READY PICKUP (FINAL) ======
(function() {
    console.log('✅ custom.js v4.0 – Final Professional Edition');

    // ---------- DYNAMIC ISLAND UI (White, JioHotstar curve, premium lighting) ----------
    function injectDynamicIslandUI() {
        // Inject CSS
        var style = document.createElement('style');
        style.textContent = `
            body {
                background: #FFFFFF !important;
                padding-bottom: 100px !important;
            }
            body::after {
                content: '';
                position: fixed;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                max-width: 500px;
                height: 150px;
                background: radial-gradient(ellipse at bottom, rgba(135,206,250,0.15) 0%, transparent 70%);
                pointer-events: none;
                z-index: -1;
            }
            .bottom-nav { display: none !important; }
            .dynamic-island-container {
                position: fixed;
                bottom: 12px;
                left: 50%;
                transform: translateX(-50%);
                width: 92%;
                max-width: 440px;
                z-index: 150;
            }
            .curve-decoration {
                position: absolute;
                bottom: -6px;
                left: -3%;
                width: 106%;
                height: 70px;
                background: #FFFFFF;
                border-radius: 50% 50% 0 0 / 70% 70% 0 0;
                box-shadow: 0 -4px 20px rgba(198,153,99,0.15), 0 -2px 10px rgba(135,206,250,0.2);
                z-index: -1;
            }
            .curve-decoration::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 40%, transparent 100%);
                pointer-events: none;
            }
            .curve-glow-line {
                position: absolute;
                top: -2px;
                left: 15%;
                width: 70%;
                height: 6px;
                background: linear-gradient(90deg, transparent, #C69963, #F5E1CE, #C69963, transparent);
                filter: blur(4px);
                border-radius: 50%;
                z-index: 1;
            }
            .dynamic-island {
                display: flex;
                align-items: center;
                justify-content: space-around;
                background: #FFFFFF;
                border-radius: 34px;
                padding: 6px 18px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.08), 0 0 20px rgba(198,153,99,0.1), inset 0 1px 0 rgba(255,255,255,0.8);
                position: relative;
                height: 68px;
                border: 1px solid rgba(198,153,99,0.15);
            }
            .dynamic-island::after {
                content: '';
                position: absolute;
                top: -4px;
                left: 10%;
                width: 80%;
                height: 10px;
                background: radial-gradient(ellipse at center, rgba(198,153,99,0.5) 0%, transparent 70%);
                filter: blur(6px);
                border-radius: 50%;
                z-index: -1;
            }
            .nav-pill-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2px;
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
                user-select: none;
                min-width: 44px;
            }
            .nav-pill-icon {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1rem;
                background: transparent;
                color: #B0A090;
                transition: 0.3s;
            }
            .nav-pill-item.active .nav-pill-icon {
                background: #C69963;
                color: #fff;
                box-shadow: 0 0 18px rgba(198,153,99,0.6);
            }
            .nav-pill-label {
                font-size: 0.55rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: #A09080;
                transition: 0.3s;
            }
            .nav-pill-item.active .nav-pill-label {
                color: #C69963;
            }
            .fab-pill {
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background: linear-gradient(135deg, #C69963, #A67B4A);
                color: #fff;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 6px 20px rgba(198,153,99,0.4);
                transition: 0.25s;
                margin-top: -24px;
                position: relative;
                z-index: 5;
            }
            .fab-pill:active { transform: scale(0.9); }
        `;
        document.head.appendChild(style);

        // Build island HTML
        var islandContainer = document.createElement('div');
        islandContainer.className = 'dynamic-island-container';
        islandContainer.innerHTML = `
            <div class="curve-decoration"></div>
            <div class="curve-glow-line"></div>
            <div class="dynamic-island" id="dynamicIsland">
                <div class="nav-pill-item active" data-page="home">
                    <div class="nav-pill-icon">🏠</div>
                    <span class="nav-pill-label">Home</span>
                </div>
                <div class="nav-pill-item" data-page="progress">
                    <div class="nav-pill-icon">📊</div>
                    <span class="nav-pill-label">Progress</span>
                </div>
                <button class="fab-pill" id="fabPillBtn">+</button>
                <div class="nav-pill-item" data-page="delivery">
                    <div class="nav-pill-icon">🚚</div>
                    <span class="nav-pill-label">Delivery</span>
                </div>
                <div class="nav-pill-item" data-page="designs">
                    <div class="nav-pill-icon">🎨</div>
                    <span class="nav-pill-label">Designs</span>
                </div>
            </div>
        `;
        document.body.appendChild(islandContainer);
        console.log('✅ Dynamic Island injected');

        // Bind navigation events (wait for TailorApp)
        function bindNavEvents() {
            var app = window.TailorApp;
            document.querySelectorAll('.nav-pill-item').forEach(function(item) {
                item.addEventListener('click', function() {
                    var pageMap = { home:'homePage', progress:'progressPage', delivery:'deliveryPage', designs:'designsPage' };
                    var pageId = pageMap[this.dataset.page];
                    if (app && app.navigate) {
                        app.navigate(pageId);
                    } else if (typeof navigate === 'function') {
                        navigate(pageId);
                    }
                    document.querySelectorAll('.nav-pill-item').forEach(function(n) { n.classList.remove('active'); });
                    this.classList.add('active');
                });
            });
            var fabBtn = document.getElementById('fabPillBtn');
            if (fabBtn) {
                fabBtn.addEventListener('click', function() {
                    if (app && app.openModal) {
                        // call prep function if available
                        if (app.prepNewOrder) app.prepNewOrder();
                        else if (typeof prepNewOrder === 'function') prepNewOrder();
                        app.openModal('newOrderModalOverlay');
                    } else {
                        if (typeof prepNewOrder === 'function') prepNewOrder();
                        if (typeof openModal === 'function') openModal('newOrderModalOverlay');
                    }
                    // blank advance field
                    setTimeout(function() {
                        var adv = document.getElementById('noAdvance');
                        if (adv && adv.value === '0') adv.value = '';
                    }, 100);
                });
            }
        }

        if (window.TailorApp) {
            bindNavEvents();
        } else {
            var retryNav = setInterval(function() {
                if (window.TailorApp) {
                    clearInterval(retryNav);
                    bindNavEvents();
                }
            }, 200);
        }
    }

    // ---------- READY FOR PICKUP (Fully reliable implementation) ----------
    function initReadyPickupFeature() {
        function setupWhenReady() {
            var app = window.TailorApp;
            if (!app) {
                setTimeout(setupWhenReady, 100);
                return;
            }
            console.log('🔧 Setting up Ready for Pickup...');

            // Add drawer item (avoid duplicates)
            var drawer = document.getElementById('drawer');
            if (drawer && !document.querySelector('.drawer-item[data-action="readyPickup"]')) {
                var newItem = document.createElement('div');
                newItem.className = 'drawer-item';
                newItem.setAttribute('data-action', 'readyPickup');
                newItem.textContent = '📦 Ready for Pickup';
                newItem.addEventListener('click', function() {
                    console.log('📦 Ready Pickup clicked');
                    // Close drawer
                    drawer.classList.remove('open');
                    var overlay = document.getElementById('drawerOverlay');
                    if (overlay) overlay.classList.remove('open');
                    // Show custom page directly (bypassing navigation)
                    showReadyPickupPage(app);
                });
                drawer.appendChild(newItem);
                console.log('✅ Drawer item added');
            }

            // Add page HTML if not already present
            ensurePageExists();

            // Also bind the original navigate to handle our custom page in case something else calls navigate('readyPickupPage')
            var originalNavigate = app.navigate;
            app.navigate = function(pageId) {
                if (pageId === 'readyPickupPage') {
                    showReadyPickupPage(app);
                    return;
                }
                originalNavigate(pageId);
            };
            console.log('✅ Navigate overridden');
        }

        function ensurePageExists() {
            if (document.getElementById('readyPickupPage')) return;
            var page = document.createElement('div');
            page.className = 'page';
            page.id = 'readyPickupPage';
            page.innerHTML = '<h3 style="margin-bottom:12px;font-weight:800;">📦 Ready for Pickup</h3><p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:12px;">Orders that are ready but not yet delivered</p><div id="readyPickupList"></div><div class="empty-state" id="emptyReady"><div class="icon">📭</div><p>No orders waiting for pickup</p></div>';
            // Insert after the last existing page
            var lastPage = document.querySelector('.page:last-of-type');
            if (lastPage) {
                lastPage.parentNode.insertBefore(page, lastPage.nextSibling);
            } else {
                document.body.appendChild(page);
            }
            console.log('✅ Ready Pickup page created');
        }

        function showReadyPickupPage(app) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
            var page = document.getElementById('readyPickupPage');
            if (!page) {
                ensurePageExists();
                page = document.getElementById('readyPickupPage');
            }
            page.classList.add('active');
            window.scrollTo(0,0);
            renderReadyPickup(app);
        }

        function renderReadyPickup(app) {
            console.log('🎨 renderReadyPickup called, total orders:', app.orders.length);
            var cont = document.getElementById('readyPickupList');
            if (!cont) {
                console.error('❌ readyPickupList missing');
                return;
            }
            var readyOrders = app.orders.filter(function(o) {
                var st = app.status(o);
                console.log('  ➡️ ' + o.slipNumber + ' status: ' + st);
                return st === 'ready';
            });
            console.log('🔢 Ready orders count:', readyOrders.length);

            var emptyEl = document.getElementById('emptyReady');
            if (emptyEl) emptyEl.style.display = readyOrders.length ? 'none' : 'block';

            if (!readyOrders.length) {
                cont.innerHTML = '';
                return;
            }

            cont.innerHTML = readyOrders.map(function(o) {
                var due = o.totalBill - (o.advancePayment + (o.payments||[]).reduce(function(s,p){ return s + p.amount; }, 0));
                var slipEsc = app.esc(o.slipNumber);
                return '<div class="card order-card">' +
                    '<div class="flex-row"><span class="slip-number">#' + slipEsc + '</span><span class="badge badge-ready">READY</span></div>' +
                    '<div class="info-row mt-2"><span>👤 ' + app.esc(o.customerName) + '</span><span>📱 ' + app.esc(o.mobile) + '</span></div>' +
                    '<div class="info-row"><span>Items: ' + o.items.length + '</span><span>Done: ' + app.cntCompleted(o) + '</span><span>Delivered: ' + app.cntDelivered(o) + '</span></div>' +
                    '<div class="info-row"><span>💰 Bill: ₹' + o.totalBill.toFixed(2) + '</span><span>Adv: ₹' + (o.advancePayment||0).toFixed(2) + '</span></div>' +
                    '<div class="info-row"><span>Due Balance:</span><span style="color:var(--danger);">₹' + due.toFixed(2) + '</span></div>' +
                    '<button class="btn btn-primary btn-sm btn-block mt-2 goto-delivery" data-slip="' + slipEsc + '">🚚 Go to Delivery</button>' +
                    '</div>';
            }).join('');

            // Attach delivery button events
            cont.querySelectorAll('.goto-delivery').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var slip = this.getAttribute('data-slip');
                    document.getElementById('deliverySearch').value = slip;
                    app.navigate('deliveryPage');
                    setTimeout(function() {
                        var searchBtn = document.getElementById('deliverySearchBtn');
                        if (searchBtn) searchBtn.click();
                    }, 100);
                });
            });
            console.log('✅ Ready list rendered');
        }

        setupWhenReady();
    }

    // ---------- START EVERYTHING ----------
    injectDynamicIslandUI();
    initReadyPickupFeature();
})();
