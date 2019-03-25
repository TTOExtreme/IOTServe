const Router = require('koa-router');
const router = new Router();

var auth = require('./app/key/auth')
//devices
router.post('/login', auth);
router.post('/output', auth, require('./app/device/out_command'));
router.post('/input', auth, require('./app/device/in_command'));

//console
router.post('/loginconsole', require("./app/console/auth"));
router.post('/loaddevices', require('./app/console/loadDevices'));


module.exports = router;