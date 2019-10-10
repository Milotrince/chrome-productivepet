"use strict";

class Cat {

    constructor() {
        this.moods = ['bored', 'confused', 'disgust', 'excited', 'happy',
                 'inform', 'sad', 'sorry', 'stare', 'surprised'];
        this.mood = 'happy';
    }

    setMood(mood) {
        this.mood = mood;
        $('#pet-face').attr('src', './assets/cat/' + mood + '.png');
    }
    
}