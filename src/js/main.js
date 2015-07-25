/*global MashupPlatform*/

(function () {

    "use strict";

    var MP = MashupPlatform;

    var repaint = function () {
        var height, width, message, next;

        height = MashupPlatform.widget.context.get('heightInPixels');
        width = MashupPlatform.widget.context.get('widthInPixels');
        message = document.getElementById('message');

        document.body.style.fontSize = (height * 0.7) + 'px';
        document.body.style.lineHeight = height + 'px';

        message.style.height = height + 'px';
        next = 0.6;
        while ((message.offsetWidth > width || message.offsetHeight > height) && next > 0.2) {
            document.body.style.fontSize = (height * next) + 'px';
            next -= 0.1;
        }
    };

    MP.wiring.registerCallback('textinput', function (data) {
        var message, unit;

        data = JSON.parse(data);

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
