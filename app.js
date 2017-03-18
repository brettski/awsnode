

var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({ profile: 'production0'});
//AWS.config.credentials = credentials;
AWS.config.update({region: 'us-east-1'});


//require('./orphanSg');

//var coreec2 = require('./core/core.ec2');

/*
coreec2.getVpcIds(function(err, data) {
    console.log('VpcIds');
    console.log(data);
})

coreec2.getInstanceVpcIds(function(err, data) {
    console.log('Instance VpcIds');
    console.log(data);
})
*/

//require('./orphanVpc');

require('./certcheck');


