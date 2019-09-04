"use strict";

let cat = new Cat();
let menu = {
    'back': {
        mood: ['stare', 'inform'],
        prompt: ['What brings you here?', 'What did you want to do?'],
        action: function() {
            setContent();
            loadColor();
        },
        buttons: ['Color', 'Data', 'Chat', 'About']
    },
    'Color': {
        mood: ['excited', 'happy'],
        prompt: ['Pick a color, any color!', 'Change the background color'],
        action: function() {
            setContent(`
                <input id="input-color" type="range" min="0" max="360" step="1"/>
                <button id="save-color">Save?</button>
            `)

            chrome.storage.sync.get('color', function (data) {
                if (data['color'] !== undefined) {
                    $('#input-color').val(data['color'])
                }
            });

            $('#input-color').on('input', function() {
                $('#save-color').text('Save?')
                $('body').css('--hue', $('#input-color').val());
            });

            $('#save-color').click(function() {
                let hue = $('#input-color').val();
                chrome.storage.sync.set({color: hue}, function() {
                    console.log(`Saved color hue: ${hue}`);
                });

                $('#save-color').text('Saved!')
            });
        },
        buttons: ['back']
    },
    'Data': {
        mood: ['happy'],
        prompt: ['View data'],
        action: function() {
            
        },
        buttons: ['back']
    },
    'Chat': {
        mood: ['happy'],
        prompt: ['Talk to me'],
        action: function() {
            
        },
        buttons: ['back']
    },
    'About': {
        mood: ['happy', 'excited'],
        prompt: ['About ProductivePet', 'All about me!'],
        action: function() {
            setContent(`
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
    menu.action();
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

function setContent(content) {
    $('#content').empty();
    $('#content').append(content);
}

setMenu(menu.back);

