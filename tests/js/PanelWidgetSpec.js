/*
 *   Copyright (c) 2018 Future Internet Consulting and Development Solutions S.L.
 */

/* global MashupPlatform, MockMP, init, processIncomingData, repaint */

(function () {

    "use strict";

    const HTML_FIXTURE_CODE = '<h1 id="message"><span id="unit"></span></h1>';

    const clearDocument = function clearDocument() {
        var elements = document.querySelectorAll('body > *:not(.jasmine_html-reporter)');

        for (var i = 0; i < elements.length; i++) {
            elements[i].parentElement.removeChild(elements[i]);
        }
    };

    describe("panel-widget", () => {

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'widget',
                prefs: {
                    'default-value': '--',
                    'default-unit': '',
                    'max-height': 60,
                    'min-height': 10,
                    'decimals': 1
                },
                inputs: ['textinput']
            });
        });

        beforeEach(() => {
            clearDocument();
            document.body.innerHTML += HTML_FIXTURE_CODE;
            MashupPlatform.reset();
        });

        describe("prefs", () => {

            describe("default-value", () => {

                it("should work with the default value", () => {
                    spyOn(window, "repaint");
                    init();
                });

            });

        });

        describe("wiring input", () => {

            describe("basic values", () => {

                it("number", () => {
                    init();
                    processIncomingData(5);

                    expect(document.getElementById('message').textContent).toBe("5");
                });

                it("string", () => {
                    init();
                    processIncomingData("new content");

                    expect(document.getElementById('message').textContent).toBe("new content");
                });

                it("boolean", () => {
                    init();
                    processIncomingData(true);

                    expect(document.getElementById('message').textContent).toBe("true");
                });

            });

        });

    });

})();
