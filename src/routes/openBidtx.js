

 // Constant values - change as per your needs
 const namespace = "org.land.landsys.landparcel"; 
 const transactionType = "openBid";

// 1. Connect to landsys
var bnUtil = require('./bn-connection-util');
bnUtil.connect(mainconnect);

function mainconnect(error){
    
    // Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());

    // 3. Get the factory
    let factory = bnDef.getFactory();
    
    // 4. Lets create a new Resource of type = Transaction
 
    // 4. Create an instance of transaction
    let options = {
        generate: false,
        includeOptionalFields: false
    }

    let Titledeedno="0001";//
    let ownerId="0005";

    let transaction = factory.newTransaction(namespace,transactionType);

    
    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('deedno',Titledeedno);
    transaction.setPropertyValue('ownerId',ownerId);

    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}

