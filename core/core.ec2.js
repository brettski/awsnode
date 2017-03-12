var AWS = require('aws-sdk');

var ec2 = new AWS.EC2({region: 'us-east-1', apiVersion: '2016-11-15'});


function getInstances (callback) {
    ec2.describeInstances(function(err, data) {
        if (err) { 
            callback(err);
            console.log(err, err.stack);
        }
        else {
            callback(null, data.Reservations);
        }
    });
}

function getInstanceIds (callback) {
    getInstances(function(err, instances) {
        
        // The long ass way to the ec2 instance's Group id 
        //console.log(instances[0].Instances[0].SecurityGroups[0].GroupId);

        var groups = [];
        for (inst of instances) {
            for (instance of inst.Instances) {
                for (securityGroup of instance.SecurityGroups) {
                    groups.push(securityGroup.GroupId);
                }
            }
        }
        //console.log(groups);
        callback (null, groups);
    })

}

function getSecurityGroups (callback) {
    ec2.describeSecurityGroups({}, function(err, data) {
        if (err) {
            callback(err);
            console.log(err, err.stack);
        }
        else {
            callback(null, data.SecurityGroups);
        }
    });
}

function getSecurityGroupIds (callback) {
    getSecurityGroups (function(err, groups) {
        if (err) {
            callback(err);
        }
        else {
            var ids = [];
            for (group of groups) {
                ids.push(group.GroupId);                
            }
            callback(null, ids);
        }
    });
}

module.exports = {
    getInstances: getInstances,
    getInstanceIds: getInstanceIds,
    getSecurityGroups: getSecurityGroups,
    getSecurityGroupIds: getSecurityGroupIds
}