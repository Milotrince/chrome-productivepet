"use strict";

let cat = new Cat();
let menu = {
    'back': {
        mood: ['stare'],
        prompt: ['What brings you here?'],
        menu: function() {
            setMessage();
        },
        buttons: ['Display', 'Data', 'Chat', 'About']
    },
    'Display': {
        mood: ['happy'],
        prompt: ['Change display'],
        menu: function() {
            
        },
        buttons: ['back']
    },
    'Data': {
        mood: ['happy'],
        prompt: ['View data'],
        menu: function() {
            
        },
        buttons: ['back']
    },
    'Chat': {
        mood: ['happy'],
        prompt: ['Talk to me'],
        menu: function() {
            
        },
        buttons: ['back']
    },
    'About': {
        mood: ['happy', 'excited'],
        prompt: ['About ProductivePet', 'All about me!'],
        menu: function() {
            setMessage(`
                My purpose is to help you reduce unproductive time.
                Check me out on <a href="https://github.com/Milotrince/chrome-productivepet">
                GitHub</a>!
            `);
        },
        buttons: ['back']
    }
}

function setMenu(menu) {
    // i = random index of prompt
    let i = Math.floor(Math.random() * menu.prompt.length);
    cat.setMood(menu.mood[i]);

    $('#prompt').text(menu.prompt[i]);
    menu.menu();
    makeButtons(menu.buttons);
}

function makeButtons(buttons) {
    $('#buttons').empty();
    for (let i in buttons) {
        let name = buttons[i];
        $('#buttons').append(`<button id="${name}">${name}</button>`);
        $('#' + name).click(function() {
            setMenu(menu[name]);
        });
    }
}

function setMessage(message) {
    $('#message').empty();
    $('#message').append(message);
}

setMenu(menu.back);

