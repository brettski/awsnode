// certcheck.js


coreec2 = require('./core/core.ec2');
corecert = require('./core/core.cert');


coreec2.getAddressesIps(function(err, addressesIps) {
    getCertificateList(addressesIps, function(err, certlist) {
        console.log(certlist);
    })
});

function getCertificateList(addressIps, callback) {
    let certificates = {};
    certificates.certificate = [];
    for (ip of addressIps) {
        corecert.getCertificate(ip, function(err, cert) {
            var certobj = {
                ip: ip,
                commonName: null,
                subjectAltName: null,
                validFrom: null,
                validTo: null,
                serialNumber: null,
                note: null
            };
            
            if (err && err.code === 'ECONNRESET') {
                certobj.note = 'unable to connect to address ' + ip;
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
            if (addressIps.length === certificates.certificate.length) {
                callback(null, certificates);
            }
        });
    }
    //callback(null, certificates);
}