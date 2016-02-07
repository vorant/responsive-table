module.exports = function (responsiveTable) {
    var maxHeight = 0;
    var cells = responsiveTable.querySelectorAll('.vr-tr__cell');
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

    var tableHeight = responsiveTable.querySelectorAll('.vr-tr__contentTable')[0].offsetHeight;

    responsiveTable.querySelectorAll('.vr-tr')[0].style.height = tableHeight + 'px';
};