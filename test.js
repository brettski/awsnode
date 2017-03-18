var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({ profile: 'production0'});
//AWS.config.credentials = credentials;
AWS.config.update({region: 'us-east-1'});
var ec2 = new AWS.EC2({region: 'us-east-1', apiVersion: '2016-11-15'});



function getVpcs(callback) {
    ec2.describeVpcs(function(err, data) {
        if (err) console.log(err, err.stack);
        else {
            var array = [];
            for (vpc in data.Vpcs) {
                array.push(data.Vpcs[vpc].VpcId);
            }
            callback(array);
        }
    });
}


function returnStaleSGs() {
    getVpcs(function(vpcs) {
        for (vpc in vpcs) {
            ec2.describeStaleSecurityGroups({VpcId: vpcs[vpc]}, function(err, data) {
                if (err) console.log(err, err.stack);
                else {
                    console.log('******');
                    console.log(data);
                }
            });
        }
    });
}
/*
ec2.describeKeyPairs({}, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
});
*/
/*
var coreec2 = require('./core/core.ec2');
coreec2.getAddressesIps(function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
});
*/
var corecert = require('./core/core.cert');
corecert.getCertificate('52.204.0.199', function(err, cert) {
    if (err) console.log(err, err.stack);
    else console.log(cert);
});
