"use strict";

let cat = new Cat();
let index = 0;
let menu = {
    0: {
        mood: 'happy',
        prompt: 'Hi! I\'m Cat. I just moved into this browser.',
        message: '',
        buttons: ['Nice to meet you']
    },
    1: {
        mood: 'excited',
        prompt: 'My job is to help you stay on task.',
        buttons: ['Great', 'Cool', 'Oh boy']
    },
    // 2: {
    //     mood: 'happy',
    //     prompt: 'First things first: pick a color!',
    //     buttons: ['Pink!', 'Yellow', 'Blue', 'Wait, let me actually choose!']
    // },
    2: {
        mood: 'happy',
        prompt: 'What sites should I be warning you on?',
        buttons: ['Done!']
    },
    3: {
        mood: 'happy',
        prompt: 'By the way, you can always change your settings later.',
        buttons: ['How?']
    },
    4: {
        mood: 'happy',
        prompt: 'Just right-click my icon and visit Options.',
        buttons: ['Ok']
    },
    5: {
        mood: 'excited',
        prompt: 'Alright, all done! Looking forward to working with you!',
        buttons: ['Bye!']
    }
}


function setMenu(menu) {
    cat.setMood(menu.mood);

    $('#prompt').text(menu.prompt);
    makeButtons(menu.buttons);
}

function makeButtons(buttons) {
    $('#buttons').empty();
    for (let i in buttons) {
        let name = buttons[i];
        let id = name.replace(/[^A-Z0-9]/ig, '-');

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

setMenu(menu[index]);

