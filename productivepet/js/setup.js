"use strict";

let cat = new Cat();

let index = 0;
let menu = {
    0: {
        mood: 'happy',
        prompt: 'Hi! I\'m Cat. I just moved into this browser.',
        buttons: ['Nice to meet you']
    },
    1: {
        mood: 'inform',
        prompt: 'My job is to help you stay on task.',
        buttons: ['Great', 'Cool', 'Oh boy']
    },
    2: {
        mood: 'excited',
        prompt: 'Now let\'s get some things out of the way.',
        buttons: ['Alright']
    },
    3: {
        mood: 'excited',
        prompt: 'Pick a color!',
        action: function() {
            setContent(`
                <input id="input-color" type="range" min="0" max="360" step="1"/>
            `)

            Storage.get('color', function (hue) {
                $('#input-color').val(hue)
            });

            $('#input-color').on('input', function() {
                $('body').css('--hue', $('#input-color').val());
            });

            $('#input-color').change('input', function() {
                let hue = $('#input-color').val();
                Storage.set({color:hue});
            });
        },
        buttons: ['This one!']
    },
    4: {
        mood: 'happy',
        prompt: 'What sites should I be warning you on?',
        buttons: ['Done!']
    },
    5: {
        mood: 'happy',
        prompt: 'By the way, you can always change your settings later.',
        buttons: ['How?']
    },
    6: {
        mood: 'happy',
        prompt: 'Just right-click my icon and visit Options.',
        buttons: ['Ok']
    },
    7: {
        mood: 'excited',
        prompt: 'Alright, all done! Looking forward to working with you!',
        buttons: ['Bye!']
    }
}


function setMenu(menu) {
    cat.setMood(menu.mood);

    $('#prompt').text(menu.prompt);
    makeButtons(menu.buttons);

    setContent();
    if (menu.action !== undefined) {
        menu.action();
    }
}

function makeButtons(buttons) {
    $('#buttons').empty();
    for (let i in buttons) {
        let name = buttons[i];
        let id = name.replace(/[^A-Z0-9]/ig, '-').toLowerCase();

        $('#buttons').append(`<button id="${id}">${name}</button>`);
        $('#' + id).click(function() {
            nextMenu();
        });
    }
}

function nextMenu() {
    index++;
    if (index >= Object.keys(menu).length) {
        window.close();
    } else {
        setMenu(menu[index]);
    }
}

function setContent(content) {
    $('#content').empty();
    $('#content').append(content);
}

setMenu(menu[index]);

