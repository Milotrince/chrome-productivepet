"use strict";

let cat = new Cat();

$('#pet-face').click(function() {

    var mood = moods[Math.floor(Math.random()*moods.length)];
    cat.setMood(mood);

  });

  