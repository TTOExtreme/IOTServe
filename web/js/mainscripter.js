//preload the .js necessary files
var root = document.location.href + "js/";

var libs = [
    root + "bin/login.js",
]

var loading = true;

function loader(libid) {
    if (libs[libid] != undefined) {
        //console.log(libs[libid])
        $.getScript(libs[libid], function () { loader(libid + 1); })
    } else {
        loading = false;
    }
}

function loadScript(scrp) {
    if (!loading) {
        $.getScript(root + scrp, function () { });
    } else {
        setTimeout(function () { loadScript(scrp); }, 1000);
    }
}

function loadAddonScript(scrp) {
    if (!loading) {
        $.getScript(root + scrp, function () { });
    } else {
        setTimeout(function () { loadScript(scrp); }, 1000);
    }
}

function loadAddonMainScript(scrp) {
    if (!loading) {
        libs.push(root + scrp, function () { });
    } else {
        $.getScript(root + scrp, function () { });
    }
}

function loadAddonScriptCall(scrp, callback) {
    if (!loading) {
        $.getScript(root + scrp, function () { callback(); });
    } else {
        setTimeout(function () { loadScriptCall(scrp, callback); }, 1000);
    }
}

function wait_Load(callback) {
    if (!loading) {
        callback();
    } else {
        setTimeout(function () { wait_Load(callback); }, 1000);
    }
}

function loadMainScripter(scpt) {
    if (loading) {
        libs.push(root + scpt)
    } else {
        $.getScript(root + scpt, function () { });
    }
}

loader(0);