var fitHeight = require('./fitHeight');

module.exports = {
    insertTable: function (referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    isIE: (function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        return msie > 0;
    })(),
    getRowAmount: function(params) {
        var windowWidth = window.innerWidth;
        var rowAmount = 3;
        for (var i = 0; i < params.amount.length; i += 1) {
            if (windowWidth >= params.amount[i][0] && windowWidth < params.amount[i][1]) {
                rowAmount = i + 1;
                break;
            }
        }
        return rowAmount;
    },
    addClasses: function(responsiveTable, rowAmount) {
        var cols = responsiveTable.querySelectorAll('.vr-tr__contentCol');
        var classes = cols[0].classList;
        classes.remove('_active');
        classes.remove('_last');

        var colsLen = cols.length;
        for (var i = 0; i < colsLen; i += 1) {
            cols[i].classList.remove('_active');
            cols[i].classList.remove('_last');

            if (i < rowAmount) {
                cols[i].classList.add('_active');
            }
            if (i == rowAmount - 1) {
                cols[i].classList.add('_last');
            }
        }
    },
    activateCol: function(originTable, responsiveTable, params) {
        var self = this;
        var rowAmount = this.getRowAmount(params);
        this.addClasses(responsiveTable, rowAmount);
        this.showTable(originTable, responsiveTable, params);


        window.onresize = function() {
            var newRowAmount = self.getRowAmount(params);
            if (newRowAmount != rowAmount) {
                rowAmount = newRowAmount;
                self.addClasses(responsiveTable, rowAmount);
            }
            fitHeight(responsiveTable);
            self.showTable(originTable, responsiveTable, params);
        };
    },
    showTable: function(originTable, responsiveTable, params) {
        if (window.innerWidth > params.maxWidth) {
            originTable.style.display = '';
            responsiveTable.style.display = 'none';
        } else {
            originTable.style.display = 'none';
            responsiveTable.style.display = '';
        }
    }
};