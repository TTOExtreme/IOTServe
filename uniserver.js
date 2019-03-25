const createServer = require('./bin/server')
const config = require('./config/config')

const app = createServer(1);
console.log(("Listening on internal port: " + config.api.portws).gray);
app.listen(config.api.portws);