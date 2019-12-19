"use strict";

function restrictInput(id) {
    let input = parseInt($(id).val())
    let max = parseInt($(id).attr('max'))
    let min = parseInt($(id).attr('min'))
    if (input > max) {
        $(id).val(max);
    } else if (input < min) {
        $(id).val(min);
    }
}

function setIdleIntervalFromStorage() {
    Storage.get('idleInterval', function (minutes) {
        chrome.idle.setDetectionInterval(60 * minutes);
    })
}

function setValueFromStorage(key, id) {
    Storage.get(key, function (value) {
        if (Array.isArray(value)) {
            value = value.join('\n')
        }
        $(id).val(value)
    })
}

let catPage = new DynamicCatPage();
catPage.menu = {
    'Main': {
        mood: ['stare', 'inform'],
        prompt: ['What brings you here?', 'What did you want to do?'],
        buttons: ['Data', 'Warnings', 'Settings', 'About']
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
        content: `Here is the raw data for everything I know! <br/>
                <textarea id='data' cols=40 rows=15 readonly></textarea>`,
        action: function() {
            Storage.getAll(function(data) {
                $('#data').text(JSON.stringify(data, null, 2));
            }, true);
        },
        buttons: ['back']
    },
    'Warnings': {
        mood: ['bored'],
        prompt: ['Warning System'],
        content: `I will remind you to get off unproductive sites.`,
        info: `
            <ul class="settings">
                <li>
                    <label for="bad-sites">Unproductive Sites</label>
                    <textarea id="bad-sites" cols=30 rows=10 resize=none placeholder="List of domains separated by comma/space/newline\n\nFor example, I would put:\n  reddit.com, youtube.com\n\nI will filter and validate them!"></textarea>
                </li>
            </ul>
            <button id="save">Save?</button>
            `,
        action: function() {
            setValueFromStorage('badSites', '#bad-sites')
            setValueFromStorage('idleInterval', '#idle-interval')

            $('#bad-sites').on('input', function() {
                $('#save').text('Save?');
            });

            $('#bad-sites').on('focusout', function() {
                let rawList = $('#bad-sites').val().split(/[\s|,]+/).filter(Boolean)
                let domains = []
                rawList.forEach(url => {
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        url = 'http://' + url;
                        try {
                            domains.push(WebHistory.extractDomain(url))
                        } catch {
                            console.log('Invalid url')
                        }

                    }
                })
                $('#bad-sites').val(domains.join('\n'))
            });

            $('#save').click(function() {
                let settings = {
                    badSites: $('#bad-sites').val().split(/[\s|,]+/),
                }
                Storage.set(settings);
                setIdleIntervalFromStorage();
                $('#save').text('Saved!');
            });
        },
        buttons: ['back']
    },
    'Settings': {
        mood: ['happy'],
        prompt: ['Settings'],
        content: `Change settings here. Don't forget to save!`,
        info: `
            <ul class="settings">
                <li>
                    <label for="input-color">Color</label>
                    <input id="input-color" type="range" min="0" max="360" step="1"/>
                </li>
                <li>
                    <label for="idle-interval">Idle Detection</label>
                    <input name="idle-interval" id="idle-interval" type="number" min="1" max="1440">minutes</input>
                </li>
            </ul>
            <button id="save">Save?</button>
            `,
        action: function() {
            setValueFromStorage('color', '#input-color')
            setValueFromStorage('idleInterval', '#idle-interval')

            $('#input-color').on('input', function() {
                $('#save').text('Save?');
                $('body').css('--hue', $('#input-color').val());
            });

            $('#idle-interval').on('focusout', function() {
                $('#save').text('Save?');
                restrictInput('#idle-interval')
            });

            $('#save').click(function() {
                let settings = {
                    badSites: $('#bad-sites').val().split(/[\s|,]+/),
                    color: $('#input-color').val(),
                    idleInterval: $('#idle-interval').val()
                }
                Storage.set(settings);
                setIdleIntervalFromStorage();
                $('#save').text('Saved!');
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
catPage.load('Main')