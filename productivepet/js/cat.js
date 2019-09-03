"use strict";

const moods = ['bored', 'disgust', 'excited', 'happy', 'sad', 'sorry', 'stare', 'surprised']

class Cat {

    constructor(mood = this.getMood()) {
        this.mood = mood;
    }

    setMood(mood) {
        this.mood = mood;
        $('#pet-face').attr('src', './assets/' + mood + '.png');
    }

    saveMood() {
        chrome.storage.sync.set({mood: mood}, function() {
            console.log("Saved mood: " + mood);
        });
    }

    getMood() {
        chrome.storage.sync.get('mood', function(data) {
            console.log("Cat is " + data.mood);
        });
    }
    
    getSettings(name, callback) {
        chrome.storage.local.get(name, function (item) {
            if (item !== undefined) {
                callback(item[name]);
            }
        });
    }
    
}