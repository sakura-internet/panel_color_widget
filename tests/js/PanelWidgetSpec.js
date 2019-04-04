/*
 * Copyright (c) 2018 Future Internet Consulting and Development Solutions S.L.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

                    expect(repaint).not.toHaveBeenCalled();
                    expect(document.getElementById('message').textContent).toBe("--");
                });

                it("should work with other values", () => {
                    MashupPlatform.prefs.set("default-value", "n/a");
                    spyOn(window, "repaint");
                    init();

                    expect(repaint).not.toHaveBeenCalled();
                    expect(document.getElementById('message').textContent).toBe("n/a");
                });

            });

            describe("default-unit", () => {

                it("should work with the default value", () => {
                    spyOn(window, "repaint");
                    init();

                    expect(repaint).not.toHaveBeenCalled();
                    expect(document.getElementById('message').textContent).toBe("--");
                });

                it("should work with other values", () => {
                    MashupPlatform.prefs.set("default-unit", "ºC");
                    spyOn(window, "repaint");
                    init();

                    expect(repaint).not.toHaveBeenCalled();
                    expect(document.getElementById('message').textContent).toBe("--ºC");
                });

            });

            describe("decimals", () => {

                it("should work with the default value", () => {
                    spyOn(window, "repaint");
                    init();

                    processIncomingData(5.12);

                    expect(document.getElementById('message').textContent).toBe("5.1");
                });

                it("should work with other values", () => {
                    MashupPlatform.prefs.set("decimals", "2");
                    spyOn(window, "repaint");
                    init();

                    processIncomingData(5.12);

                    expect(document.getElementById('message').textContent).toBe("5.12");
                });

                it("should handle invalid decimal values", () => {
                    MashupPlatform.prefs.set("decimals", "-1");
                    spyOn(window, "repaint");
                    init();

                    processIncomingData(5.12);

                    expect(document.getElementById('message').textContent).toBe("5");
                });

            });

        });

        describe("wiring input", () => {

            describe("basic values (plain)", () => {

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

                it("null", () => {
                    init();
                    processIncomingData(null);

                    expect(document.getElementById('message').textContent).toBe("--");
                });

            });

            describe("basic values", () => {

                it("number", () => {
                    init();
                    processIncomingData({value: 5});

                    expect(document.getElementById('message').textContent).toBe("5");
                });

                it("string", () => {
                    init();
                    processIncomingData({value: "new content"});

                    expect(document.getElementById('message').textContent).toBe("new content");
                });

                it("boolean", () => {
                    init();
                    processIncomingData({value: true});

                    expect(document.getElementById('message').textContent).toBe("true");
                });

                it("null", () => {
                    MashupPlatform.prefs.set("default-unit", "ºC");
                    init();
                    processIncomingData({value: null});

                    expect(document.getElementById('message').textContent).toBe("--ºC");
                });

            });

            describe("unit override", () => {

                it("number", () => {
                    init();
                    processIncomingData({value: 5, unit: "km/h"});

                    expect(document.getElementById('message').textContent).toBe("5km/h");
                });

                it("string", () => {
                    MashupPlatform.prefs.set("default-unit", "ºC");
                    init();
                    processIncomingData({value: "new content", unit: ""});

                    expect(document.getElementById('message').textContent).toBe("new content");
                });

                it("boolean", () => {
                    MashupPlatform.prefs.set("default-unit", "ºC");
                    init();
                    processIncomingData({value: true, unit: null});

                    expect(document.getElementById('message').textContent).toBe("true");
                });

                it("null", () => {
                    init();
                    processIncomingData({value: null, unit: "km/h"});

                    expect(document.getElementById('message').textContent).toBe("--km/h");
                });

            });

        });

    });

})();
