"use strict";

// to view all stored data raw:
// chrome.storage.local.get(function(result){console.log(result)})
// inside of background devtool

class Storage {

    static get(key, callback, callIfUndefined=false) {
        chrome.storage.local.get(key, function (data) {
            if (data[key] !== undefined || callIfUndefined) {
                callback(data[key]);
            }
        });
    }

    static getAll(callback) {
        chrome.storage.local.get(null, function(data) {
            callback(data);
        })
    }

    static set(data, debug=false) {
        chrome.storage.local.set(data, function() {
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
        chrome.storage.local.getBytesInUse(null, callback);
    }
}