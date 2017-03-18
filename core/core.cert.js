// core.cert.js



function getCertificate (uri, callback) {
    const https = require('https');
    var options = {
        host: uri,
        port: 443,
        method: 'GET',
        rejectUnauthorized: false
    };

    var req = https.request(options, function(res) {
        var cert = res.connection.getPeerCertificate();
        console.log("received certificate: " + cert.subject.CN + " valid to: " + cert.valid_to);
        callback(null, cert);
    });

    req.on('socket', function(socket) {
        socket.setTimeout(10000);
        socket.on('timeout', function() {
            req.abort();
        })
    })

    req.on('error', function(err) {
        if (err.code === 'ECONNRESET') {
            console.log("timout acccessesing uri: " + uri);
        }
        callback (err);
    })

    req.end();
} 


module.exports = {
    getCertificate: getCertificate
}