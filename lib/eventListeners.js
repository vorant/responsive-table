var fitHeight = require('./fitHeight');

module.exports = function (responsiveTable) {
    var nextButton = responsiveTable.querySelectorAll('.js-next')[0];
    nextButton.onclick = function() {
        var elements = responsiveTable.querySelectorAll('.vr-tr__contentCol');
        var activeElements = responsiveTable.querySelectorAll('.vr-tr__contentCol._active');
        var isLast = elements[elements.length - 1].classList.contains('_active');
        var indexLastActiveElement = 0;
        for (var i = 0; i < elements.length; i += 1) {
            if (elements[i].classList.contains('_active')) {
                indexLastActiveElement = i;
            }
        }

        var newElIndex = indexLastActiveElement + 1;

        if (!isLast) {
            var classes = activeElements[0].classList;
            classes.remove('_active');
            for (var i = 0; i < elements.length; i += 1) {
                elements[i].classList.remove('_last');
            }
            var elems = elements[newElIndex].classList;
            elems.add('_active');
            elems.add('_last');
        }
        fitHeight(responsiveTable);
    };

    var prevButton = responsiveTable.querySelectorAll('.js-prev')[0];

    prevButton.onclick = function() {
        var elements = responsiveTable.querySelectorAll('.vr-tr__contentCol');
        var activeElements = responsiveTable.querySelectorAll('.vr-tr__contentCol._active');

        var isFirst = elements[0].classList.contains('_active');
        var indexFirstActiveElement = 0;
        for (var i = 0; i < elements.length; i += 1) {
            if (elements[i].classList.contains('_active') && !indexFirstActiveElement) {
                indexFirstActiveElement = i;
            }
        }
        var newElIndex = indexFirstActiveElement - 1;

        if (!isFirst) {
            var classes = activeElements[activeElements.length - 1].classList;
            classes.remove('_active');
            for (var i = 0; i < elements.length; i += 1) {
                elements[i].classList.remove('_last');
            }
            var elems = elements[newElIndex].classList;
            elems.add('_active');
            activeElements[activeElements.length - 2].classList.add('_last');
        }
        fitHeight(responsiveTable);
    };
};