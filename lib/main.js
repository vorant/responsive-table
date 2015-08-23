module.exports = (function() {
    var module = {};
    var templater = (function() {
        var module = {};

        function giveHeaderTemplate(table) {
            var html = '<div class="vr-tr__headers">';
            var head = table.getElementsByTagName('thead');
            var thList = head[0].getElementsByTagName('th');
            for (var i = 0; i < thList.length; i++) {
                html += '<div class="vr-tr__cell">' +
                '<span class="vr-tr__headersText">' +
                thList[i].innerHTML +
                '</span>' +
                '</div>';
            }
            html += '</div>';
            return html;
        }

        function giveContentTemplate(table) {
            var html = '<div class="vr-tr__content"><table class="vr-tr__contentTable"><tr>';
            var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
            var len = rows.length;
            for (var i = 0; i < len; i += 1) {
                html += '<td class="vr-tr__contentCol">';
                var cells = rows[i].getElementsByTagName('td');
                var cellsLen = cells.length;

                for (var j = 0; j < cellsLen; j += 1) {
                    html += '<div class="vr-tr__cell">' + cells[j].innerHTML + '</div>';
                }
                html += '</td>';
            }
            html += '</tr></table></div>';
            return html;
        }

        function giveButtonsTemplate() {
            var html =
                '<div class="vr-tr__buttons"> ' +
                '<div class="vr-tr__button _next js-next"></div>' +
                '<div class="vr-tr__button _prev js-prev"></div>' +
                '</div>';
            return html;
        }
        module.template = function template(table) {
            var html = '<div class="vr-tr">';
            html += giveHeaderTemplate(table);
            html += giveContentTemplate(table);
            html += giveButtonsTemplate();
            html += '</div>';
            return html;
        };
        return module;
    })();

    function isIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        return msie > 0;
    }

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function responsiveTableInstance(initParams) {
        var params;
        var originTable;
        var responsiveTable;

        function getRowAmount() {
            var windowWidth = window.innerWidth;
            var rowAmount = 3;
            for (var i = 0; i < params.amount.length; i += 1) {
                if (windowWidth >= params.amount[i][0] && windowWidth < params.amount[i][1]) {
                    rowAmount = i + 1;
                    break;
                }
            }
            return rowAmount;
        }

        function activateCol() {
            var rowAmount = getRowAmount();
            var cols = responsiveTable.getElementsByClassName('vr-tr__contentCol');
            var colsLen = cols.length;
            for (var i = 0; i < colsLen; i += 1) {
                if (i < rowAmount) {
                    cols[i].classList.add('_active');
                }
            }
            showTable();

            window.onresize = function() {
                var newRowAmount = getRowAmount();
                if (newRowAmount != rowAmount) {
                    rowAmount = newRowAmount;
                    var cols = responsiveTable.getElementsByClassName('vr-tr__contentCol');
                    var colsLen = cols.length;
                    for (var i = 0; i < colsLen; i += 1) {
                        if (i < rowAmount) {
                            cols[i].classList.add('_active');
                        } else {
                            cols[i].classList.remove('_active');
                        }
                    }
                }
                fitHeight();
                showTable();
            };
        }

        function fitHeight() {
            var maxHeight = 0;
            var cells = responsiveTable.getElementsByClassName('vr-tr__cell');
            var cellsLen = cells.length;
            for (var i = 0; i < cellsLen; i += 1) {
                cells[i].style.height = '';
                var elHeight = cells[i].offsetHeight;
                if (elHeight > maxHeight) {
                    maxHeight = elHeight;
                }
            }

            for (var i = 0; i < cellsLen; i += 1) {
                cells[i].style.height = maxHeight + 'px';
            }

            var tableHeight = responsiveTable.getElementsByClassName('vr-tr__contentTable')[0].offsetHeight;

            responsiveTable.getElementsByClassName('vr-tr')[0].style.height = tableHeight + 'px';

        }

        function eventListeners() {
            var nextButton = responsiveTable.getElementsByClassName('js-next')[0];
            nextButton.onclick = function() {
                var elements = responsiveTable.getElementsByClassName('vr-tr__contentCol');
                var activeElements = responsiveTable.getElementsByClassName('vr-tr__contentCol _active');
                var isLast = elements[elements.length - 1].classList.contains('_active');
                var indexLastActiveElement = 0;
                for (var i = 0; i < elements.length; i += 1) {
                    if (elements[i].classList.contains('_active')) {
                        indexLastActiveElement = i;
                    }
                }

                var newElIndex = indexLastActiveElement + 1;

                if (!isLast) {
                    activeElements[0].classList.remove('_active');
                    elements[newElIndex].classList.add('_active');
                }
                fitHeight();
            };

            var prevButton = responsiveTable.getElementsByClassName('js-prev')[0];

            prevButton.onclick = function() {
                var elements = responsiveTable.getElementsByClassName('vr-tr__contentCol');
                var activeElements = responsiveTable.getElementsByClassName('vr-tr__contentCol _active');
                var isFirst = elements[0].classList.contains('_active');
                var indexFirstActiveElement = 0;
                for (var i = 0; i < elements.length; i += 1) {
                    if (elements[i].classList.contains('_active') && !indexFirstActiveElement) {
                        indexFirstActiveElement = i;
                    }
                }
                var newElIndex = indexFirstActiveElement - 1;

                if (!isFirst) {
                    activeElements[activeElements.length - 1].classList.remove('_active');
                    elements[newElIndex].classList.add('_active');
                }
                fitHeight();
            };
        }

        function showTable() {
            if (window.innerWidth > params.maxWidth) {
                originTable.style.display = '';
                responsiveTable.style.display = 'none';
            } else {
                originTable.style.display = 'none';
                responsiveTable.style.display = '';
            }
        }

        params = initParams || {};
        params.amount = params.amount || [
            [0, 480], // 1
            [481, 568], // 2
            [569, 768] // 3
        ];

        params.maxWidth = params.maxWidth || 768;

        params.class = params.class || 'table';

        originTable = document.getElementsByClassName(params.class);

        if (originTable.length) {
            originTable = originTable[0];
            var template = templater.template(originTable);
            responsiveTable = document.createElement('div');
            responsiveTable.innerHTML = template;
            insertAfter(originTable, responsiveTable);
            activateCol();
            fitHeight();
            eventListeners();
        }
    }

    module.init = function(initParams) {
        if (!isIE()) {
            new responsiveTableInstance(initParams);
        }
    };

    return module;
})();