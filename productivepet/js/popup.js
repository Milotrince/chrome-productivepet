"use strict";

let cat = new Cat();

$('#pet-face').click(function() {

    var mood = moods[Math.floor(Math.random()*moods.length)];
    cat.setMood(mood);

    // let color = element.target.value;
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.executeScript(
    //       tabs[0].id,
    //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
    // });

  });

  