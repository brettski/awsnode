
const coreec2 = require('./core/core.coreec2');

function getOrphanedSecurityGroups (secGroupIds, instSecGrpIds, callback) {
    var sgi = new Set(secGroupIds);
    var isg = new Set(instSecGrpIds);
    
    var orphans = new Set(
        [...sgi].filter(item => !isg.has(item))
    );

    callback(null, orphans);

} 

// the meat
coreec2.getSecurityGroupIds (function(err, secGrpIds) {
    coreec2.getInstanceSecurityGroupIds (function(err, instGrpIds) {
        getOrphanedSecurityGroups(secGrpIds, instGrpIds, function(err, data) {
            console.log('Orphans:\n');
            console.log(data);
        });
    });
});

