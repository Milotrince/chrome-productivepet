"use strict";

let cat = new Cat();

$('#pet-face').click(function() {
    var mood = moods[Math.floor(Math.random()*moods.length)];
    cat.setMood(mood);
});

 $('#options').click(function() {
    chrome.tabs.create({url: chrome.extension.getURL('options.html')});
 }) 