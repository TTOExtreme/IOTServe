var fs = require('fs');
var devFile = require('./getDevice');

function exe(ctx) {
    var data = ctx.request.body;
    console.log("OUTPUT:" + JSON.stringify(data));
    var device = devFile.get(data.UUID);
    if (device.queue != undefined) {
        if (device.queue[0] != undefined && device.queue[0] != null && device.queue[0] != '') {
            ctx.body = { commands: device.queue[0] };
            device.queue.splice(0, 1);
        }
    }
    device.timestamp = new Date().getTime();
    devFile.set(data.UUID, device);
    console.log(ctx.body)
    return ctx;
}

module.exports = exe;