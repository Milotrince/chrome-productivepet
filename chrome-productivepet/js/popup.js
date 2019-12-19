"use strict";

$('#pet-face').click(function() {
    Cat.setMood(Cat.randomMood());
});

 openPageOnClick('#options', 'Main')
 openPageOnClick('#graph', 'Data')

 function openPageOnClick(id, page) {
    $(id).click(function() {
        chrome.tabs.create({url: chrome.extension.getURL('options.html') + '?page=' + page});
    })
 }