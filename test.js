var AWS = require('aws-sdk');

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

ec2.describeSecurityGroups({}, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
})