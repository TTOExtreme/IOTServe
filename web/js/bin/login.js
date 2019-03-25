function login() {
    var location = "http://192.168.130.30:8080/api/loginconsole";
    console.log(location);
    var usr = document.getElementById('user').value;
    var pss = document.getElementById('pass').value;


    $.post(location, { user: usr, pass: pss }, function (result) {
        if (result == "OK");
        loadAddonScriptCall("./bin/devices.js", () => {
            loadDevices();
        });
    });
}