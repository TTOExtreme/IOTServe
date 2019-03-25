
const createServer = require('./bin/server')
const config = require('./config/config')
const cluster = require('cluster');
var id = 1;

const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log("This machine has " + numCPUs + " CPUs.");
    for (let i = 0; i < numCPUs * 4; i++) {
        var new_worker_env = {};
        new_worker_env["WORKER_ID"] = i;
        cluster.fork(new_worker_env);
        id++;
    }

    cluster.on("online", (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
        console.log("Starting a new worker...");
        cluster.fork();
    });

} else {
    const app = createServer(process.env['WORKER_ID'])
    app.listen(config.api.portws, () => {
        console.log(("Listening on internal port: " + config.api.portws).gray);
    })
}
