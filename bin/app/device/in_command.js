var fs = require('fs');
var devFile = require('./getDevice');

function exe(ctx) {
    var data = ctx.request.body;
    console.log("INPUT:" + JSON.stringify(data));
    var device = devFile.get(data.UUID);
    if (data.commands != undefined && data.commands != null && data.commands != '') {
        device.queue.push(data.commands);
        ctx.body = ctx.request.body;
    }
    //device.timestamp = new Date().getTime();
    devFile.set(data.UUID, device);
    return ctx;
}

module.exports = exe;