var fs = require('fs');
var devFile = require('../device/getDevice');
var colors = require('colors');
var specs = require('../device/check_portability')
var cfg = require('../../../config/config')


function exe(ctx) {
    //var data = ctx.request.body;

    var devices = [];
    fs.readdirSync('./env/dev/in').forEach(file => {
        //console.log(file);
        var d = devFile.get(file);
        d.Specs = specs.getSpecs(d.ID);
        if (d.timestamp + cfg.cfg.maxtime * 1000 > new Date().getTime()) {
            d.active = true;
        } else {
            d.active = false;
        }
        devices.push(d);
    });
    //console.log(colors.green(devices));
    ctx.body = devices;
    return ctx;

}

module.exports = exe;