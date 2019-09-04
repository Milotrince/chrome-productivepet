"use strict";

function loadColor() {
    chrome.storage.sync.get('color', function (data) {
        let hue = data['color'];
        if (hue !== undefined) {
            $(':root').css('--hue', hue);
        }
    });
}

loadColor();