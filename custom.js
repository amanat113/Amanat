// ====== CUSTOM FEATURES + PREMIUM WHITE DYNAMIC ISLAND + READY PICKUP (DEBUGGED) ======
(function() {
    console.log('✅ custom.js loaded (v2.1)');

    // ---------- DYNAMIC ISLAND UI (White, JioHotstar curve, lighting) ----------
    function injectDynamicIslandUI() {
        // 1. Inject CSS (same as before, but I'll keep it for completeness)
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

        // 2. Build island HTML
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

        // 3. Navigation binding (with retry)
        function bindNavEvents() {
            var app = window.TailorApp;
            document.querySelectorAll('.nav-pill-item').forEach(item => {
                item.addEventListener('click', function() {
                    var pageMap = { home:'homePage', progress:'progressPage', delivery:'deliveryPage', designs:'designsPage' };
                    var pageId = pageMap[this.dataset.page];
                    console.log('🔄 Nav pill clicked: ' + pageId);
                    if (app) {
                        app.navigate(pageId);
                        document.querySelectorAll('.nav-pill-item').forEach(n => n.classList.remove('active'));
                        this.classList.add('active');
                    } else if (typeof navigate === 'function') {
                        navigate(pageId);
                    }
                });
            });
            var fabBtn = document.getElementById('fabPillBtn');
            if (fabBtn) {
                fabBtn.addEventListener('click', function() {
                    console.log('➕ FAB clicked');
                    if (app) {
                        app.openModal('newOrderModalOverlay');
                        // call prep if exists
                        if (typeof prepNewOrder === 'function') prepNewOrder();
                    } else {
                        if (typeof prepNewOrder === 'function') prepNewOrder();
                        if (typeof openModal === 'function') openModal('newOrderModalOverlay');
                    }
                    // also blank advance field
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
                    console.log('✅ Nav events bound');
                }
            }, 200);
        }
    }

    // ---------- READY FOR PICKUP FEATURE (with debugging) ----------
    function initReadyPickupFeature() {
        var app = window.TailorApp;
        if (!app) {
            console.warn('⏳ TailorApp not ready, retrying Ready Pickup...');
            setTimeout(initReadyPickupFeature, 150);
            return;
        }
        console.log('🔧 Setting up Ready for Pickup...');
        console.log('📦 Current orders:', app.orders.length);

        // Add drawer item
        var drawer = document.getElementById('drawer');
        if (drawer && !document.querySelector('.drawer-item[data-action="readyPickup"]')) {
            var newItem = document.createElement('div');
            newItem.className = 'drawer-item';
            newItem.setAttribute('data-action', 'readyPickup');
            newItem.textContent = '📦 Ready for Pickup';
            newItem.addEventListener('click', function() {
                console.log('📦 Ready Pickup drawer clicked');
                drawer.classList.remove('open');
                document.getElementById('drawerOverlay').classList.remove('open');
                app.navigate('readyPickupPage');
            });
            drawer.appendChild(newItem);
            console.log('✅ Drawer item added');
        }

        // Add page HTML if not present
        if (!document.getElementById('readyPickupPage')) {
            var lastPage = document.querySelector('.page:last-of-type');
            if (lastPage) {
                var newPage = document.createElement('div');
                newPage.className = 'page';
                newPage.id = 'readyPickupPage';
                newPage.innerHTML = '<h3 style="margin-bottom:12px;font-weight:800;">📦 Ready for Pickup</h3><p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:12px;">Orders that are ready but not yet delivered</p><div id="readyPickupList"></div><div class="empty-state" id="emptyReady"><div class="icon">📭</div><p>No orders waiting for pickup</p></div>';
                lastPage.parentNode.insertBefore(newPage, lastPage.nextSibling);
                console.log('✅ Ready Pickup page inserted');
            } else {
                console.error('❌ Cannot find last page to insert Ready Pickup page');
            }
        }

        // Override navigate
        var originalNavigate = app.navigate;
        app.navigate = function(pageId) {
            console.log('🚗 navigate called with: ' + pageId);
            if (pageId === 'readyPickupPage') {
                console.log('🎯 Ready Pickup override triggered');
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                var pg = document.getElementById('readyPickupPage');
                if (pg) {
                    pg.classList.add('active');
                    console.log('✅ readyPickupPage activated');
                } else {
                    console.error('❌ readyPickupPage element not found!');
                }
                window.scrollTo(0,0);
                renderReadyPickup();
                return;
            }
            originalNavigate(pageId);
        };
        console.log('✅ Navigate overridden');

        function renderReadyPickup() {
            console.log('🎨 renderReadyPickup called');
            var cont = document.getElementById('readyPickupList');
            if (!cont) {
                console.error('❌ readyPickupList not found in DOM');
                return;
            }
            var readyOrders = app.orders.filter(o => {
                var s = app.status(o);
                console.log('  ➡️ Order ' + o.slipNumber + ' status: ' + s);
                return s === 'ready';
            });
            console.log('🔢 Ready orders count: ' + readyOrders.length);
            var emptyEl = document.getElementById('emptyReady');
            if (emptyEl) emptyEl.style.display = readyOrders.length ? 'none' : 'block';
            if (!readyOrders.length) {
                cont.innerHTML = '';
                console.log('ℹ️ No ready orders, list cleared.');
                return;
            }

            cont.innerHTML = readyOrders.map(o => {
                var due = o.totalBill - (o.advancePayment + (o.payments||[]).reduce((s,p) => s + p.amount, 0));
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
            console.log('✅ Ready pickup list rendered');
            cont.querySelectorAll('.goto-delivery').forEach(btn => {
                btn.addEventListener('click', function() {
                    var slip = this.getAttribute('data-slip');
                    document.getElementById('deliverySearch').value = slip;
                    app.navigate('deliveryPage');
                    setTimeout(() => document.getElementById('deliverySearchBtn').click(), 100);
                });
            });
        }
    }

    // ---------- START EVERYTHING ----------
    console.log('🚀 Starting custom features');
    injectDynamicIslandUI();
    initReadyPickupFeature();
})();
