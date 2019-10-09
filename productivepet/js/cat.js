"use strict";

const moods = ['bored', 'confused', 'disgust', 'excited', 'happy', 'inform', 'sad', 'sorry', 'stare', 'surprised']

class Cat {

    setMood(mood) {
        this.mood = mood;
        $('#pet-face').attr('src', './assets/cat/' + mood + '.png');
    }
    
}