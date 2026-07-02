// ====== CUSTOM FEATURES + PREMIUM WHITE DYNAMIC ISLAND UI ======
(function() {
    console.log('✅ custom.js loaded (White Island + Ready Pickup)');

    // ---------- DYNAMIC ISLAND UI (White, JioHotstar curve, lighting) ----------
    function injectDynamicIslandUI() {
        // 1. Inject required CSS
        var style = document.createElement('style');
        style.textContent = `
            /* ── White background, sky-blue bottom glow ── */
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

            /* Hide old bottom nav */
            .bottom-nav { display: none !important; }

            /* ── Dynamic Island Container ── */
            .dynamic-island-container {
                position: fixed;
                bottom: 12px;
                left: 50%;
                transform: translateX(-50%);
                width: 92%;
                max-width: 440px;
                z-index: 150;
            }

            /* ── JioHotstar-style Curve (white, glowing) ── */
            .curve-decoration {
                position: absolute;
                bottom: -6px;
                left: -3%;
                width: 106%;
                height: 70px;
                background: #FFFFFF;
                border-radius: 50% 50% 0 0 / 70% 70% 0 0;
                box-shadow: 
                    0 -4px 20px rgba(198,153,99,0.15),   /* gold glow */
                    0 -2px 10px rgba(135,206,250,0.2);   /* subtle blue */
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
            /* Lighting effect (like JioHotstar) on top edge of curve */
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

            /* ── White Dynamic Island (the pill) ── */
            .dynamic-island {
                display: flex;
                align-items: center;
                justify-content: space-around;
                background: #FFFFFF;
                border-radius: 34px;
                padding: 6px 18px;
                box-shadow: 
                    0 8px 30px rgba(0,0,0,0.08),
                    0 0 20px rgba(198,153,99,0.1),
                    inset 0 1px 0 rgba(255,255,255,0.8);
                position: relative;
                height: 68px;
                border: 1px solid rgba(198,153,99,0.15);
            }

            /* Premium gold glow on island */
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

            /* Navigation Pill Items */
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

            /* FAB inside island (gold) */
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

        // 2. Build and inject dynamic island HTML
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

        // 3. Attach navigation events (wait for TailorApp)
        function bindNavEvents() {
            var app = window.TailorApp;
            document.querySelectorAll('.nav-pill-item').forEach(item => {
                item.addEventListener('click', function() {
                    var pageId = this.dataset.page;
                    var pageMap = { home:'homePage', progress:'progressPage', delivery:'deliveryPage', designs:'designsPage' };
                    if (app) {
                        app.navigate(pageMap[pageId]);
                        document.querySelectorAll('.nav-pill-item').forEach(n => n.classList.remove('active'));
                        this.classList.add('active');
                    } else {
                        // fallback (rare)
                        if (typeof navigate === 'function') navigate(pageMap[pageId]);
                    }
                });
            });
            document.getElementById('fabPillBtn').addEventListener('click', function() {
                if (app) {
                    // Trigger new order modal
                    app.openModal('newOrderModalOverlay');
                    // Ensure prep happens
                    if (typeof prepNewOrder === 'function') prepNewOrder();
                } else {
                    // fallback
                    if (typeof prepNewOrder === 'function') prepNewOrder();
                    if (typeof openModal === 'function') openModal('newOrderModalOverlay');
                }
            });
        }
        // Try immediately, else retry
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

    // ---------- READY FOR PICKUP FEATURE ----------
    function initReadyPickupFeature() {
        var app = window.TailorApp;
        if (!app) { setTimeout(initReadyPickupFeature, 150); return; }

        // Drawer item
        var drawer = document.getElementById('drawer');
        if (drawer && !document.querySelector('.drawer-item[data-action="readyPickup"]')) {
            var newItem = document.createElement('div');
            newItem.className = 'drawer-item';
            newItem.setAttribute('data-action', 'readyPickup');
            newItem.textContent = '📦 Ready for Pickup';
            newItem.addEventListener('click', function() {
                drawer.classList.remove('open');
                document.getElementById('drawerOverlay').classList.remove('open');
                app.navigate('readyPickupPage');
            });
            drawer.appendChild(newItem);
        }

        // Page HTML
        if (!document.getElementById('readyPickupPage')) {
            var lastPage = document.querySelector('.page:last-of-type');
            if (lastPage) {
                var newPage = document.createElement('div');
                newPage.className = 'page';
                newPage.id = 'readyPickupPage';
                newPage.innerHTML = '<h3 style="margin-bottom:12px;font-weight:800;">📦 Ready for Pickup</h3><p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:12px;">Orders that are ready but not yet delivered</p><div id="readyPickupList"></div><div class="empty-state" id="emptyReady"><div class="icon">📭</div><p>No orders waiting for pickup</p></div>';
                lastPage.parentNode.insertBefore(newPage, lastPage.nextSibling);
            }
        }

        // Navigate override
        var originalNavigate = app.navigate;
        app.navigate = function(pageId) {
            if (pageId === 'readyPickupPage') {
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                var pg = document.getElementById('readyPickupPage');
                if (pg) pg.classList.add('active');
                window.scrollTo(0,0);
                renderReadyPickup();
                return;
            }
            originalNavigate(pageId);
        };

        function renderReadyPickup() {
            var cont = document.getElementById('readyPickupList');
            if (!cont) return;
            var readyOrders = app.orders.filter(o => app.status(o) === 'ready');
            var emptyEl = document.getElementById('emptyReady');
            if (emptyEl) emptyEl.style.display = readyOrders.length ? 'none' : 'block';
            if (!readyOrders.length) { cont.innerHTML = ''; return; }

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
    injectDynamicIslandUI();
    initReadyPickupFeature();
})();
