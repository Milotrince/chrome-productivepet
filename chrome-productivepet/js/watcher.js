"use strict";

class Watcher {

    constructor() {

    }

    static notify(tab) {
        Storage.get('badSites', function (badSites) {
            let site = WebHistory.domain(tab)
            console.log(site)
            if (badSites.includes(site)) {
                Cat.meow('growl')
                Cat.notify('stare', 'This is a warning!', 'So you waste a lot of time on this site, eh?')

                chrome.tabs.insertCSS(tab.id, {file: './style/notification.css'}, function(){})
                chrome.tabs.executeScript(tab.id, {file: './js/libs/jquery.min.js'}, function() {
                    chrome.tabs.executeScript(tab.id, {file: './js/test.js'})
                })
            }
        })
    }

}