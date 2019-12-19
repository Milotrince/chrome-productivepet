"use strict";

class Cat {

    static setMood(mood) {
        $('#pet-face').attr('src', this.moodPath(mood));
    }

    static randomMood() {
        return this.moods[Math.floor(Math.random()*this.moods.length)];
    }

    static meow(type) {
        var audio = new Audio(this.meowPath(type))
        audio.play()
    }

    static notify(mood, title, message) {
        let options = {
            type:'basic',
            iconUrl:this.moodPath(mood),
            title:title,
            message:message
        }
        chrome.notifications.create('#id', options, function (id) {
            console.log(id)
        })
    }

    static moodPath(mood) {
        return this.path + 'moods/' + mood + '.png'
    }

    static meowPath(meow) {
        return this.path + 'meows/' + meow + '.wav'
    }

}

Cat.path = '../assets/cat/'
Cat.moods = ['bored', 'confused', 'disgust', 'excited', 'happy', 'inform', 'sad', 'sorry', 'stare', 'surprised'];
Cat.meows = ['growl', 'purr', 'beg']