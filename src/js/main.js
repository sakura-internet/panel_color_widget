/* globals MashupPlatform */

(function () {

    "use strict";

    const repaint = function () {
        var height, width, message, next, min;

        height = MashupPlatform.widget.context.get('heightInPixels');
        width = MashupPlatform.widget.context.get('widthInPixels');
        message = document.getElementById('message');

        document.body.style.fontSize = (height * 0.7) + 'px';
        document.body.style.lineHeight = height + 'px';

        message.style.height = height + 'px';
        next = Number(MashupPlatform.prefs.get('max-height')) / 100;
        min = Number(MashupPlatform.prefs.get('min-height')) / 100;
        while ((message.offsetWidth > width || message.offsetHeight > height) && next >= min) {
            document.body.style.fontSize = Math.floor(height * next) + 'px';
            next -= 0.05;
        }
        if ((message.offsetWidth > width || message.offsetHeight > height)) {
            document.body.style.fontSize = Math.floor(height * min) + 'px';
        }
    };

    const init = function () {
        MashupPlatform.wiring.registerCallback('textinput', function (data) {
            var message, unit, decimals, default_unit, pow;

            data = JSON.parse(data);
            decimals = parseInt(MashupPlatform.prefs.get('decimals'), 10);
            if (isNaN(decimals) || decimals < 0) {
                decimals = 0;
            }

            message = document.getElementById('message');
            if (data.value == null) {
                message.textContent = MashupPlatform.prefs.get('default-value');
            } else if (typeof data.value === 'number') {
                pow = Math.pow(10, decimals);
                data.value = Math.round((pow * data.value).toFixed(decimals)) / pow;
                message.textContent = data.value;
            }

            unit = document.createElement('span');
            default_unit = MashupPlatform.prefs.get('default-unit');
            if (data.unit != null) {
                unit.textContent = data.unit;
                message.appendChild(unit);
            } else if (default_unit.trim() != "") {
                unit.textContent = default_unit;
                message.appendChild(unit);
            }
            repaint();
        });

        MashupPlatform.widget.context.registerCallback(function (newValues) {
            if ("heightInPixels" in newValues || "widthInPixels" in newValues) {
                repaint();
            }
        }.bind(this));

        /* Initial content */

        var message = document.getElementById('message');
        message.textContent = MashupPlatform.prefs.get('default-value');

        var default_unit = MashupPlatform.prefs.get('default-unit');
        if (default_unit.trim() != "") {
            var unit = document.createElement('span');
            unit.textContent = default_unit;
            message.appendChild(unit);
        }
    };

    /* test-code */
    window.init = init;
    window.repaint = repaint;
    /* end-test-code */

    /* TODO
     * this if is required for testing, but we have to search a cleaner way
     */
    if (window.MashupPlatform != null) {
        init();
        repaint();
    }

})();
