var crp = require('crypto-js');

function sha2(mess) {
    var r = crp.SHA512(mess);
    return r;
}


function crypt(key, mess) {
    var r = crp.AES.encrypt(mess, key);
    return r;
}

function uncrypt(key, crypt_mess) {
    if (crypt_mess == "0") { return "0"; }
    var r = crp.AES.decrypt(crypt_mess, key);
    return r.toString(crp.enc.Utf8);
}

module.exports = { crypt, uncrypt, sha2 };