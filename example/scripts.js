(function() {
    var params = {
        query: 'table',
        amount: [
            [0,   480],   // 1
            [481, 568],   // 2
            [569, 768]    // 3
        ],
        maxWidth: 768
    };
    responsiveTable.init(params);
})();