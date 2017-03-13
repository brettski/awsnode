

var AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});


//require('./orphanSg');

var coreec2 = require('./core/core.ec2');


coreec2.getVpcIds(function(err, data) {
    console.log('VpcIds');
    console.log(data);
})

coreec2.getInstanceVpcIds(function(err, data) {
    console.log('Instance VpcIds');
    console.log(data);
})

/*
coreec2.getInstances(function(err, data) {
    console.log(data);
})
*/

require('./orphanVpc');



