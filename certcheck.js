// certcheck.js


coreec2 = require('./core/core.ec2');
corecert = require('./core/core.cert');

function CheckElasticIpCerts (callback) {
    coreec2.getAddressesIps(function(err, addressesIps) {
        var certificates = {};
        certificates.certificate = [];
        for (ip of addressesIps) {
            corecert.getCertificate(ip, function(err, uri, cert) {
                var certobj = {
                    ip: uri,
                    commonName: null,
                    subjectAltName: null,
                    validFrom: null,
                    validTo: null,
                    serialNumber: null,
                    note: null
                };
                
                if (err && err.code === 'ECONNRESET') {
                    certobj.note = 'unable to connect to address ' + uri;
                }
                else if ( err && err.code !== 'ECONNRESET') {
                    certobj.note = 'error: ' + err.code;
                }
                else {
                    certobj.commonName = cert.subject.CN;
                    certobj.subjectAltName = cert.subjectaltname;
                    certobj.validFrom = cert.valid_from;
                    certobj.validTo = cert.valid_to;
                    certobj.serialNumber = cert.serialNumber;
                }
                certificates.certificate.push(certobj);
                if (addressesIps.length === certificates.certificate.length) {
                    callback(null, certificates);
                }
            });
        }
    });
}

function CheckInstanceIpCerts (callback) {
    coreect.getInstanceIpAddresses(function(err, instIps) {
        var certificates = {};
        certificates.certificate = [];
        for (ip in instIps) {
            // This isn't just an ip, it's an object so I need to break that down
            // the reapon it is an object is so I can include more information with report,
            // I'll need to figure out how to use that extra data in this sync/async issues we have here. 
            corecert.getCertificate(ip, function(err, uri, cert) {
                var certobj = {
                    ip: uri,
                    commonName: null,
                    subjectAltName: null,
                    validFrom: null,
                    validTo: null,
                    serialNumber: null,
                    note: null
                };

                if (err && err.code === 'ECONNRESET') {
                    certobj.note = 'unable to connect to address ' + uri;
                }
                else if (err && err.code !== 'ECONNRESET') {
                    certobj.note = 'error: ' + err.code;
                }
                else {
                    

                }
            })
        }
    })
}


module.exports ={
    CheckElasticIpCerts: CheckElasticIpCerts
}