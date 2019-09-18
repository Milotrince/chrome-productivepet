"use strict";

// let data = [
//     {
//         'start': 10,
//         'end': 100,
//         'site': 'https://site.com',
//     }
// ]


class WebHistory {

    update(tab) {
        var tabUrl = domain(tab.url);
        var tabIcon = tab.favIconUrl;

        Storage.get('webhistory', function(history) {
            let lastUrl = history.length > 0 ? history[history.length - 1]['url'] : ''; 
            if (lastUrl != tabUrl) {
                Storage.update('webhistory', {
                    url: tabUrl,
                    start: Date.now()
                });
            }
        });

        Storage.get('webicons', function(icons) {
            if (!Object.keys(icons).includes(tabUrl)) {
                let d = {}
                d[tabUrl] = tabIcon; 
                Storage.update('webicons', d);
            }
        })
   }
    
}

function todayId() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
}

function domain(url) {
    if (url.startsWith('chrome')) {
        let a = url.split('://')[0];
        let b = url.split('://')[1].split('/')[0];
        return `${a}://${b}`;
    }
    return (new URL(url)).hostname;
}