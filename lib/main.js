var eventListeners = require('./eventListeners');
var fitHeight = require('./fitHeight');
var helpers = require('./helpers');
var templater = require('./templater')();

module.exports = (function() {
    var module = {};

    function responsiveTableInstance(initParams) {
        var params;
        var originTable;
        var responsiveTable;

        params = initParams || {};

        params.amount = params.amount || [
            [0, 480], // 1
            [481, 568], // 2
            [569, 768] // 3
        ];

        params.maxWidth = params.maxWidth || 768;

        params.query = params.query || 'table';

        originTable = document.querySelectorAll(params.query);

        if (originTable.length) {
            originTable = originTable[0];

            responsiveTable = document.createElement('div');
            responsiveTable.innerHTML = templater.template(originTable);

            helpers.insertTable(originTable, responsiveTable);

            helpers.activateCol(originTable, responsiveTable, params);

            fitHeight(responsiveTable);
            eventListeners(responsiveTable);
        }
    }

    module.init = function(initParams) {
        if (!helpers.isIE) {
            responsiveTableInstance(initParams);
        }
    };

    return module;
})();