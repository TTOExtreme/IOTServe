var fs = require('fs');

function get(UUID) {
    var file = fs.readFileSync("./env/dev/in/" + UUID, 'utf8');
    console.log(file);
    file = JSON.parse(file);
    return file;
}
function set(UUID, data) {
    fs.writeFile("./env/dev/in/" + UUID, JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

module.exports = { get, set };