// ====== custom.js – Example Extension ======
(function() {
    console.log('✅ custom.js loaded');
    function waitForApp(cb) {
        if (window.TailorApp && window.TailorApp.orders) cb(window.TailorApp);
        else setTimeout(() => waitForApp(cb), 100);
    }
    waitForApp(function(app) {
        // আপনার কাস্টম ফিচার এখানে যোগ করুন
        console.log('🚀 TailorApp available, ready to extend!');
    });
})();
