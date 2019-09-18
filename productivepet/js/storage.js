"use strict";

// to view all stored data raw:
// chrome.storage.sync.get(function(result){console.log(result)})
// inside of background devtool

class Storage {

    static get(key, callback, callIfUndefined=false) {
        chrome.storage.sync.get(key, function (data) {
            if (data[key] !== undefined || callIfUndefined) {
                callback(data[key]);
            }
        });
    }

    static set(data, debug=true) {
        chrome.storage.sync.set(data, function() {
            if (debug) {
                console.log('saved: ' + JSON.stringify(data))
            }
        })
    }

    static update(key, newData) {
        Storage.get(key, function (oldData) {
            let data = !!oldData ? oldData : {};
            if (Array.isArray(oldData)) {
                data.push(newData);
            }
            else if (typeof oldData === 'object' && typeof newData === 'object') {
                for (var k in newData) {
                    let v = newData[k];
                    if (!!v) {
                        data[k] = v;
                    }
                }
            }
            let d = {}
            d[key] = data
            Storage.set(d);
        }, true)
    }

    static getMemoryUsed(callback) {
        chrome.storage.sync.getBytesInUse(null, callback);
    }
}