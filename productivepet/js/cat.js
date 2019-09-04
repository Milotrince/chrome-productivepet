"use strict";

const moods = ['bored', 'confused', 'disgust', 'excited', 'happy', 'inform', 'sad', 'sorry', 'stare', 'surprised']

class Cat {

    constructor(mood = this.getMood()) {
        this.mood = mood;
    }

    setMood(mood) {
        this.mood = mood;
        $('#pet-face').attr('src', './assets/cat/' + mood + '.png');
    }
    
}