// ====== CUSTOM FEATURES – Tailor Shop Pro ======
(function() {
    function initCustomFeatures() {
        var app = window.TailorApp;
        if (!app) {
            setTimeout(initCustomFeatures, 100);
            return;
        }

        // ----- 1. Add "Ready for Pickup" drawer item -----
        var drawer = document.getElementById('drawer');
        if (drawer) {
            // Avoid duplicate if already added
            if (!document.querySelector('.drawer-item[data-action="readyPickup"]')) {
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
        }

        // ----- 2. Add "Ready for Pickup" page HTML -----
        if (!document.getElementById('readyPickupPage')) {
            var lastPage = document.querySelector('.page:last-of-type');
            if (lastPage) {
                var newPage = document.createElement('div');
                newPage.className = 'page';
                newPage.id = 'readyPickupPage';
                newPage.innerHTML = `
                    <h3 style="margin-bottom:12px;font-weight:800;">📦 Ready for Pickup</h3>
                    <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:12px;">Orders that are ready but not yet delivered</p>
                    <div id="readyPickupList"></div>
                    <div class="empty-state" id="emptyReady"><div class="icon">📭</div><p>No orders waiting for pickup</p></div>
                `;
                lastPage.parentNode.insertBefore(newPage, lastPage.nextSibling);
            }
        }

        // ----- 3. Override navigate to handle the new page -----
        var originalNavigate = app.navigate;
        app.navigate = function(pageId) {
            if (pageId === 'readyPickupPage') {
                document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
                var page = document.getElementById('readyPickupPage');
                if (page) page.classList.add('active');
                window.scrollTo(0,0);
                renderReadyPickup();
                return;
            }
            originalNavigate(pageId);
        };

        // ----- 4. Render function (shows all ready orders) -----
        function renderReadyPickup() {
            var cont = document.getElementById('readyPickupList');
            if (!cont) return;
            var readyOrders = app.orders.filter(function(o) { return app.status(o) === 'ready'; });
            var emptyEl = document.getElementById('emptyReady');
            if (emptyEl) emptyEl.style.display = readyOrders.length ? 'none' : 'block';
            if (!readyOrders.length) {
                cont.innerHTML = '';
                return;
            }

            cont.innerHTML = readyOrders.map(function(o) {
                var due = o.totalBill - (o.advancePayment + (o.payments||[]).reduce(function(s,p) { return s + p.amount; }, 0));
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

            cont.querySelectorAll('.goto-delivery').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var slip = this.getAttribute('data-slip');
                    document.getElementById('deliverySearch').value = slip;
                    app.navigate('deliveryPage');
                    setTimeout(function() {
                        document.getElementById('deliverySearchBtn').click();
                    }, 100);
                });
            });
        }

        // ----- 5. Blank the Advance Payment field when New Order modal opens -----
        document.getElementById('fabBtn').addEventListener('click', function() {
            // Wait for modal to appear and prepNewOrder to run
            setTimeout(function() {
                var advInput = document.getElementById('noAdvance');
                if (advInput) advInput.value = '';   // remove default 0
            }, 50);
        });
    }

    initCustomFeatures();
})();
