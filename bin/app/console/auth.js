function exe(ctx, next) {
    var data = ctx.request.body;
    if (data.user == "admin" && data.pass == "1234") {
        ctx.body = "OK";
    }
}

module.exports = exe;