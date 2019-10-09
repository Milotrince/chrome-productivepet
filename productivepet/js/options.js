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

            Storage.get('color', function (hue) {
                $('#input-color').val(hue);
            });

            $('#input-color').on('input', function() {
                $('#save-color').text('Save?');
                $('body').css('--hue', $('#input-color').val());
            });

            $('#save-color').click(function() {
                let hue = $('#input-color').val();
                Storage.set({color:hue});
                $('#save-color').text('Saved!');
            });
        },
        buttons: ['back']
    },
    'Data': {
        mood: ['happy'],
        prompt: ['Data'],
        action: function() {
            setContent(`
                Here you can view your web history and other stuff I'm keeping track of.
                <br/> Memory used: <span id='memory'></span>
            `);
            setInfo(`<h1>Timeline</h1> <svg/>`)

            Storage.getMemoryUsed(function(bytes) {
                let i = Math.floor(Math.log(bytes) / Math.log(1024));
                let text = (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
                $('#memory').text(text);
            });

            Storage.get('webhistory', function (webhistory) {
                Storage.get('webicons', function (webicons) {
                    let timeline = new Timeline(webhistory, webicons)
                    timeline.draw()
                })
            })
        },
        buttons: ['Raw', 'back']
    },
    'Raw': {
        mood: ['confused'],
        prompt: ['Raw data'],
        action: function() {
            setContent(`
                <textarea id='data' cols=50 rows=20></textarea>
            `);
            Storage.getAll(function(data) {
                $('#data').text(JSON.stringify(data, null, 2));
            }, true);
        },
        buttons: ['Data', 'back']
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
    $('#info-space').empty();
    $('#content').empty();
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
    $('#content').append(content);
}

function setInfo(info) {
    $('#info-space').append(info)
}

setMenu(menu.back);

