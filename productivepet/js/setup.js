"use strict";

let catPage = new CatPage('linear');
catPage.menu = {
    0: {
        mood: ['happy'],
        prompt: ['Hi! I\'m Cat. I just moved into this browser.'],
        buttons: ['Nice to meet you']
    },
    1: {
        mood: ['inform'],
        prompt: ['My job is to help you stay on task.'],
        buttons: ['Great']
    },
    2: {
        mood: ['excited'],
        prompt: ['Now let\'s get some things out of the way.'],
        buttons: ['Alright']
    },
    3: {
        mood: ['excited'],
        prompt: ['Pick a color!'],
        content: `<input id="input-color" type="range" min="0" max="360" step="1"/>`,
        action: function() {
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
        mood: ['happy'],
        prompt: ['What sites should I be warning you on?'],
        content: `<textarea id="sites" cols=30 rows=10
            style="width:100%; height:100px;"
            placeholder="For example, I would put:\nreddit.com\nyoutube.com\n..."></textarea>`,
        buttons: ['Done!'],
        onButton: function() {
            let badSites = $('#sites').val().split(/[, \n]/g)
            Storage.set({'badSites':badSites}, true)
        }
    },
    5: {
        mood: ['happy'],
        prompt: ['By the way, you can always change your settings later.'],
        buttons: ['Nice']
    },
    6: {
        mood: ['excited'],
        prompt: ['Alright, all done! Looking forward to working with you!'],
        buttons: ['Bye!']
    }
}
catPage.load()