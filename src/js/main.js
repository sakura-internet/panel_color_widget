/* globals MashupPlatform */

(function () {

    "use strict";

    var MP = MashupPlatform;

    var repaint = function () {
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

    MP.wiring.registerCallback('textinput', function (data) {
        var message, unit, decimals, pow;

        data = JSON.parse(data);
        decimals = parseInt(MashupPlatform.prefs.get('decimals'), 10);

        if (typeof data.value === 'number' && !isNaN(decimals) && decimals >= 0) {
            pow = Math.pow(10, decimals);
            data.value = Math.round((pow * data.value).toFixed(decimals)) / pow;
        }

        message = document.getElementById('message');
        message.textContent = data.value;
        if (data.unit != null) {
            unit = document.createElement('span');
            unit.textContent = data.unit;
            message.appendChild(unit);
        }
        repaint();
    });

    MP.widget.context.registerCallback(function (newValues) {
        if ("heightInPixels" in newValues || "widthInPixels" in newValues) {
            repaint();
        }
    }.bind(this));
})();
