const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-bodyparser')
const appRouter = require('./routes')
var cors = require('koa-cors')
var wid = 0;
var colors = require('colors')
var serve = require('koa-static');

const createServer = (_wid) => {
    wid = _wid;
    const app = new Koa();
    const router = new Router()

    app.use(cors());
    app.use(body());

    router.use('/api', appRouter.routes())
    app.use(router.routes());
    console.log(("Server Started").green);

    app.use(serve(__dirname + '/../web/'))
    console.log("up main web".green);


    return app
}

module.exports = createServer