let webHistory = new WebHistory();

chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: chrome.extension.getURL('setup.html')});
    Storage.set({webhistory:[],webicons:{},color:0});
});

// triggered on tab change
chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.get(info.tabId, function (tab) {
        webHistory.update(tab)
    });
});

// page load complete
chrome.tabs.onUpdated.addListener(function (id, info, tab) {
    if (info.status == 'complete') {
        webHistory.update(tab)
    }
});

