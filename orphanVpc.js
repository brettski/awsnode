const coreec2 = require('./core/core.ec2');

function getOrphanedVpcs(vpcList, instVpcList, callback) {
    var vls = new Set(vpcList);
    var ivls = new Set(instVpcList);

    var orphans = new Set(
        [...vls].filter(item => !ivls.has(item))
    );
    callback(null, orphans);
}

coreec2.getVpcIds (function(err, vpcIds) {
    coreec2.getInstanceVpcIds(function(err, instVpcIds) {
        getOrphanedVpcs(vpcIds, instVpcIds, function(err, data) {
            console.log('Orphans:\n');
            console.log(data);
        });
    });
});