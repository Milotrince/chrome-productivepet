"use strict";

function loadColor() {
    Storage.get('color', function (hue) {
        $(':root').css('--hue', hue);
    });
}

loadColor();