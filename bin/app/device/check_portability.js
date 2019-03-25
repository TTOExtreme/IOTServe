var fs = require('fs');
var list = require('../../../config/devices_list');

function isPortable(devCode) {
    var ret = false;
    list.forEach(function (e) {
        if (e.ID.replace(devCode, "") == "") {
            ret = true;
            return;
        }
    })
    return ret;
}

function getSpecs(devCode) {
    var ret = [];
    list.forEach(function (e) {
        if (e.ID.replace(devCode, "") == "") {
            ret = e;
            return;
        }
    })
    return ret;
}

module.exports = { isPortable, getSpecs };