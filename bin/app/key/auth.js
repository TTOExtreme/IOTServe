var fs = require('fs');
var colors = require('colors')
var bcypher = require('./bcypher')
var UUID = require('./auth_generate')
var ckPort = require('../device/check_portability')

function exe(ctx, next) {
    var data = ctx.request.body;
    ctx.body = "hello Dev!";
    if (data != undefined && data != "" && data != null) {
        if (data.UUID != undefined && data.UUID != data.ID && data.UUID != null && data.UUID != '') {
            if (isDeviceAssociated(data.UUID)) {
                console.log(colors.green("Device Associated: " + data.UUID));
                ctx.body = { data: { status: "full_connected" } }
                next(data);
                return ctx;
            }
        }
        console.log(colors.green("Device not Associated: " + data.ID));
        if (ckPort.isPortable(data.ID)) {
            var uuid = "";
            if (data.UUID == data.ID || data.UUID == undefined || data.UUID == null || data.UUID == '') {
                uuid = UUID();
                while (fs.existsSync('./env/dev/' + uuid)) {
                    uuid = UUID();
                }
            } else {
                uuid = data.UUID;
            }
            fs.writeFile("./env/dev/pend/" + uuid, JSON.stringify(
                {
                    ID: data.ID,
                    UUID: uuid,
                    queue: [],
                    timestamp: new Date().getTime()
                }
            ), function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The Device is Added to Sync List!".blue);
            });
            //*/
            console.log(colors.green("UUID: " + uuid));
            ctx.body = { data: { status: "not_connect", UUID: uuid } }
        } else {
            console.log(colors.green("Device not Supported: " + data.ID));
        }
    }
    return ctx;
}


function isDeviceAssociated(devcode) {
    if (!fs.existsSync('./env'))
        fs.mkdirSync('./env');
    if (!fs.existsSync('./env/dev'))
        fs.mkdirSync('./env/dev');
    if (!fs.existsSync('./env/dev/out'))
        fs.mkdirSync('./env/dev/out');
    if (!fs.existsSync('./env/dev/pend'))
        fs.mkdirSync('./env/dev/pend');
    if (!fs.existsSync('./env/dev/in'))
        fs.mkdirSync('./env/dev/in');
    if (fs.existsSync('./env/dev/in/' + devcode))
        return true;
    return false;
}

module.exports = exe;