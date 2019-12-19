let webHistory = new WebHistory();

function openSetup() {
    chrome.tabs.create({url: chrome.extension.getURL('setup.html')});
}

function setDefaultSettings() {
    Storage.set({color:0, webhistory:[], idleInterval:10, webicons:{
        "Productive Pet" : "./assets/icon/icon-48.png"
    }});
}

chrome.runtime.onInstalled.addListener(function (info) {
    if (info.reason == "install") {
        setDefaultSettings();
        openSetup();
    }
});

chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.get(info.tabId, function (tab) {
        webHistory.update(tab)
    });
});

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
    if (info.status == 'complete') {
        webHistory.update(tab)
    }
});

chrome.idle.onStateChanged.addListener(function (state) {
    if (state == 'idle' || state == 'locked') {
        webHistory.idle();
    } else if (state == 'active') {
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
            let tab = tabs[0];
            if (!!tab.url) {
                webHistory.update(tab);
            }
        })
    }
});