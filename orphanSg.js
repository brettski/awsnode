
const ec2 = require('./core/core.ec2');

function getOrphanedSecurityGroups (secGroupIds, instSecGrpIds, callback) {
    var sgi = new Set(secGroupIds);
    var isg = new Set(instSecGrpIds);
    
    var orphans = new Set(
        [...sgi].filter(item => !isg.has(item))
    );

    callback(null, orphans);

} 

// the meat
ec2.getSecurityGroupIds (function(err, secGrpIds) {
    ec2.getInstanceIds (function(err, instGrpIds) {
        getOrphanedSecurityGroups(secGrpIds, instGrpIds, function(err, data) {
            console.log('Orphans:\n');
            console.log(data);
        });
    });
});


