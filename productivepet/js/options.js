"use strict";

let catPage = new CatPage('navigate');
catPage.menu = {
    'back': {
        mood: ['stare', 'inform'],
        prompt: ['What brings you here?', 'What did you want to do?'],
        buttons: ['Data', 'Settings', 'About']
    },
    'Data': {
        mood: ['happy'],
        prompt: ['Data'],
        content: `Here you can view your web history and other stuff I'm keeping track of.
                <br/> Memory used: <span id='memory'></span>`,
        info: `<h1>Timeline</h1> <svg/>`,
        action: function() {
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
        mood: ['inform'],
        prompt: ['Raw data'],
        content: `Here is the raw data for everything I know!
                <textarea id='data' cols=50 rows=20 readonly></textarea>`,
        action: function() {
            Storage.getAll(function(data) {
                $('#data').text(JSON.stringify(data, null, 2));
            }, true);
        },
        buttons: ['Data', 'back']
    },
    'Settings': {
        mood: ['happy'],
        prompt: ['Settings'],
        content: `Change settings here.`,
        info: `<h2>Color</h2>
            <input id="input-color" type="range" min="0" max="360" step="1"/>
            <button id="save-color">Save?</button>`,
        action: function() {
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
        buttons: ['back'],
        onButton: function() {

        }
    },
    'About': {
        mood: ['happy', 'excited'],
        prompt: ['About ProductivePet', 'All about me!'],
        content: `My purpose is to help you reduce unproductive time.
            Check me out on <a href="https://github.com/Milotrince/chrome-productivepet">
            GitHub</a>!`,
        buttons: ['back']
    }
}
catPage.load('back')