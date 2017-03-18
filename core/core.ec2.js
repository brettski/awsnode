
var AWS = require('aws-sdk');
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

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

function getInstanceSecurityGroupIds (callback) {
    getInstances(function(err, instances) {
        
        // The long ass way to the ec2 instance's Group id 
        //console.log(instances[0].Instances[0].SecurityGroups[0].GroupId);

        var groups = [];
        for (inst of instances) {
            for (instance of inst.Instances) {
                for (securityGroup of instance.SecurityGroups) {
                    if (groups.indexOf(securityGroup.GroupId) === -1) {
                        groups.push(securityGroup.GroupId);
                    }
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

function getVpcs (callback) {
    ec2.describeVpcs({}, function(err, data) {
        if (err) {
            callback(err);
            console.log(err, err.stack);
        }
        else {
            callback(null, data.Vpcs);
        }
    })
}

function getVpcIds (callback) {
    getVpcs(function(err, vpcs) {
        if (err) {
            callback(err);
        }
        else {
            var vs = [];
            for (vpc of vpcs) {
                vs.push(vpc.VpcId);
            }
            callback(null, vs);
        }
    });
}

function getInstanceVpcIds (callback) {
    getInstances(function(err, reservations) {
        if (err) {
            callback(err);
        }
        else {
            var ivis = [];
            for (reservation of reservations) {
                for (instance of reservation.Instances) {
                    if (ivis.indexOf(instance.VpcId) === -1) {
                        ivis.push(instance.VpcId);
                    }
                }
            }
            callback(null, ivis);
        }
    });
}

function getAddresses (callback) {
    ec2.describeAddresses({}, function(err, data) {
        if (err) {
            callback(err);
            console.log(err, err.stack);
        }
        else {
            callback(null, data.Addresses);
        }
    })
}

function getAddressesIps (callback) {
    getAddresses(function(err, addresses) {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        }
        else {
            var ips = [];
            for (address of addresses) {
                if(ips.indexOf(address.PublicIp) === -1) {
                    ips.push(address.PublicIp);
                }
            }
            callback(null, ips);
        }
    })
}

module.exports = {
    getInstances: getInstances,
    getInstanceSecurityGroupIds: getInstanceSecurityGroupIds,
    getSecurityGroups: getSecurityGroups,
    getSecurityGroupIds: getSecurityGroupIds,
    getVpcs: getVpcs,
    getVpcIds: getVpcIds,
    getInstanceVpcIds: getInstanceVpcIds,
    getAddresses: getAddresses,
    getAddressesIps: getAddressesIps
}