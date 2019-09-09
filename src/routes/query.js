const bnUtil = require('./bn-connection-util');

// #1 Connect to the landsys
bnUtil.connect(main);
function main(err){
    if(err){
        console.log(error);
        process.exit(1);
    }
    return bnUtil.connection.query('searchOffersOnMyParcel',{landOwnerID:'0001'}).then((results)=>{

        console.log('Received parcels count:', results.length);
        console.log(results[0].deedno);
});
}