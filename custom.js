// ====== TAILOR SHOP PRO - CUSTOM FEATURES ======
(function() {
    console.log('✅ custom.js loaded successfully');

    // ----- WAIT FOR MAIN APP -----
    function waitForApp(callback) {
        if (window.TailorApp && window.TailorApp.orders) {
            callback(window.TailorApp);
        } else {
            setTimeout(function() { waitForApp(callback); }, 100);
        }
    }

    // ----- DYNAMIC ISLAND UI -----
    function buildDynamicIsland(app) {
        // CSS যোগ করুন
        var css = document.createElement('style');
        css.textContent = `
            body { background: #FFFFFF !important; padding-bottom: 100px !important; }
            .bottom-nav { display: none !important; }
            .dynamic-island-wrapper {
                position: fixed; bottom: 12px; left: 50%; transform: translateX(-50%);
                width: 92%; max-width: 440px; z-index: 150;
            }
            .jio-curve {
                position: absolute; bottom: -6px; left: -3%; width: 106%; height: 70px;
                background: #FFFFFF; border-radius: 50% 50% 0 0 / 70% 70% 0 0;
                box-shadow: 0 -4px 20px rgba(198,153,99,0.15), 0 -2px 10px rgba(135,206,250,0.2);
                z-index: -1;
            }
            .jio-curve::after {
                content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                border-radius: inherit;
                background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 40%, transparent 100%);
            }
            .glow-line {
                position: absolute; top: -2px; left: 15%; width: 70%; height: 6px;
                background: linear-gradient(90deg, transparent, #C69963, #F5E1CE, #C69963, transparent);
                filter: blur(4px); border-radius: 50%; z-index: 1;
            }
            .island-pill {
                display: flex; align-items: center; justify-content: space-around;
                background: #FFFFFF; border-radius: 34px; padding: 6px 18px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.08), 0 0 20px rgba(198,153,99,0.1);
                position: relative; height: 68px; border: 1px solid rgba(198,153,99,0.15);
            }
            .island-pill::after {
                content: ''; position: absolute; top: -4px; left: 10%; width: 80%; height: 10px;
                background: radial-gradient(ellipse at center, rgba(198,153,99,0.5) 0%, transparent 70%);
                filter: blur(6px); border-radius: 50%; z-index: -1;
            }
            .pill-btn {
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                gap: 2px; cursor: pointer; min-width: 44px; user-select: none;
            }
            .pill-icon {
                width: 34px; height: 34px; border-radius: 50%; display: flex;
                align-items: center; justify-content: center; font-size: 1.1rem;
                background: transparent; color: #B0A090; transition: 0.3s;
            }
            .pill-btn.active .pill-icon {
                background: #C69963; color: #fff; box-shadow: 0 0 18px rgba(198,153,99,0.6);
            }
            .pill-label {
                font-size: 0.55rem; font-weight: 700; text-transform: uppercase;
                letter-spacing: 0.5px; color: #A09080; transition: 0.3s;
            }
            .pill-btn.active .pill-label { color: #C69963; }
            .fab-island {
                width: 52px; height: 52px; border-radius: 50%;
                background: linear-gradient(135deg, #C69963, #A67B4A); color: #fff;
                border: none; font-size: 1.5rem; cursor: pointer; display: flex;
                align-items: center; justify-content: center;
                box-shadow: 0 6px 20px rgba(198,153,99,0.4); transition: 0.25s;
                margin-top: -24px; z-index: 5;
            }
            .fab-island:active { transform: scale(0.9); }
        `;
        document.head.appendChild(css);

        // HTML যোগ করুন
        var wrapper = document.createElement('div');
        wrapper.className = 'dynamic-island-wrapper';
        wrapper.innerHTML = `
            <div class="jio-curve"></div>
            <div class="glow-line"></div>
            <div class="island-pill" id="islandPill">
                <div class="pill-btn active" data-page="home">
                    <div class="pill-icon">🏠</div><span class="pill-label">Home</span>
                </div>
                <div class="pill-btn" data-page="progress">
                    <div class="pill-icon">📊</div><span class="pill-label">Progress</span>
                </div>
                <button class="fab-island" id="fabIslandBtn">+</button>
                <div class="pill-btn" data-page="delivery">
                    <div class="pill-icon">🚚</div><span class="pill-label">Delivery</span>
                </div>
                <div class="pill-btn" data-page="designs">
                    <div class="pill-icon">🎨</div><span class="pill-label">Designs</span>
                </div>
            </div>
        `;
        document.body.appendChild(wrapper);

        // ইভেন্ট লিসেনার
        var pageMap = { home: 'homePage', progress: 'progressPage', delivery: 'deliveryPage', designs: 'designsPage' };
        wrapper.querySelectorAll('.pill-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var pageId = pageMap[this.dataset.page];
                app.navigate(pageId);
                wrapper.querySelectorAll('.pill-btn').forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
            });
        });

        // FAB বাটন
        document.getElementById('fabIslandBtn').addEventListener('click', function() {
            // ফর্ম প্রস্তুত করুন
            if (app.prepNewOrder) {
                app.prepNewOrder();
            } else {
                // ম্যানুয়ালি ফর্ম রিসেট
                var form = document.getElementById('newOrderForm');
                if (form) form.reset();
                var numCloth = document.getElementById('noNumClothes');
                if (numCloth) numCloth.value = '';
                var adv = document.getElementById('noAdvance');
                if (adv) adv.value = '';
            }
            // মোডাল খুলুন
            app.openModal('newOrderModalOverlay');
            // অ্যাডভান্স ফাঁকা করুন
            setTimeout(function() {
                var adv = document.getElementById('noAdvance');
                if (adv && adv.value === '0') adv.value = '';
            }, 100);
        });

        console.log('✅ Dynamic Island ready');
    }

    // ----- READY FOR PICKUP -----
    function buildReadyPickup(app) {
        // ড্রয়ার আইটেম
        var drawer = document.getElementById('drawer');
        if (drawer && !document.querySelector('.drawer-item[data-action="readyPickup"]')) {
            var item = document.createElement('div');
            item.className = 'drawer-item';
            item.setAttribute('data-action', 'readyPickup');
            item.textContent = '📦 Ready for Pickup';
            item.addEventListener('click', function() {
                drawer.classList.remove('open');
                document.getElementById('drawerOverlay').classList.remove('open');
                showReadyPage(app);
            });
            drawer.appendChild(item);
        }

        // পেইজ HTML
        if (!document.getElementById('readyPickupPage')) {
            var page = document.createElement('div');
            page.className = 'page';
            page.id = 'readyPickupPage';
            page.innerHTML = `
                <h3 style="margin-bottom:12px;font-weight:800;">📦 Ready for Pickup</h3>
                <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:12px;">Orders that are ready but not yet delivered</p>
                <div id="readyPickupList"></div>
                <div class="empty-state" id="emptyReady"><div class="icon">📭</div><p>No orders waiting for pickup</p></div>
            `;
            document.body.appendChild(page);
        }

        // navigate ওভাররাইড
        var originalNav = app.navigate;
        app.navigate = function(pageId) {
            if (pageId === 'readyPickupPage') {
                showReadyPage(app);
                return;
            }
            originalNav(pageId);
        };

        function showReadyPage(app) {
            document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
            var pg = document.getElementById('readyPickupPage');
            if (pg) {
                pg.classList.add('active');
                window.scrollTo(0, 0);
                renderReadyList(app);
            }
        }

        function renderReadyList(app) {
            var list = document.getElementById('readyPickupList');
            if (!list) return;
            var readyOrders = app.orders.filter(function(o) { return app.status(o) === 'ready'; });
            var emptyEl = document.getElementById('emptyReady');
            if (emptyEl) emptyEl.style.display = readyOrders.length ? 'none' : 'block';
            if (readyOrders.length === 0) { list.innerHTML = ''; return; }

            list.innerHTML = readyOrders.map(function(o) {
                var due = o.totalBill - (o.advancePayment + (o.payments || []).reduce(function(s, p) { return s + p.amount; }, 0));
                var s = app.esc(o.slipNumber);
                return '<div class="card order-card">' +
                    '<div class="flex-row"><span class="slip-number">#' + s + '</span><span class="badge badge-ready">READY</span></div>' +
                    '<div class="info-row mt-2"><span>👤 ' + app.esc(o.customerName) + '</span><span>📱 ' + app.esc(o.mobile) + '</span></div>' +
                    '<div class="info-row"><span>Items: ' + o.items.length + '</span><span>Done: ' + app.cntCompleted(o) + '</span><span>Delivered: ' + app.cntDelivered(o) + '</span></div>' +
                    '<div class="info-row"><span>💰 Bill: ₹' + o.totalBill.toFixed(2) + '</span><span>Adv: ₹' + (o.advancePayment || 0).toFixed(2) + '</span></div>' +
                    '<div class="info-row"><span>Due Balance:</span><span style="color:var(--danger);">₹' + due.toFixed(2) + '</span></div>' +
                    '<button class="btn btn-primary btn-sm btn-block mt-2 go-del" data-slip="' + s + '">🚚 Go to Delivery</button>' +
                    '</div>';
            }).join('');

            list.querySelectorAll('.go-del').forEach(function(btn) {
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
        }

        console.log('✅ Ready for Pickup ready');
    }

    // ----- সব শুরু করুন -----
    waitForApp(function(app) {
        buildDynamicIsland(app);
        buildReadyPickup(app);
        console.log('🚀 All custom features activated!');
    });

})();
