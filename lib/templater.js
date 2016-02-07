module.exports = function () {
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
        return '<div class="vr-tr__buttons"> ' +
                   '<div class="vr-tr__button _next js-next"></div>' +
                   '<div class="vr-tr__button _prev js-prev"></div>' +
               '</div>';

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
};