const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const {
    BusinessNetworkDefinition,
    IdCard
} = require('composer-common');
const cardStore = require('composer-common').NetworkCardStoreManager.getCardStore({
    type: 'composer-wallet-inmemory'
});


// Embedded connection used for local testing
const connectionProfile = {
    name: 'embedded',
    'x-type': 'embedded'
};
// Constant values - change as per your needs
/////const businessNetworkName="landsys09";
const namespace = "org.land.landsys.participant";
const transactionType = "createParticipant";
var id;
var identity;
//const NetworkCardStoreManager= require('composer-common').NetworkCardStoreManager;
//var walletType = { type: 'composer-wallet-filesystem' };
//const cardstore = NetworkCardStoreManager.getCardStore( walletType );
//cardStore=require('composer-common').FileSystemCardStore

//const wallet = new cardStore('/home/alekey/Desktop/Wallets');

// 1. Connect to landsys
var bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function importCardForIdentity(cardName,iDentity) {
    var bnDef = bnUtil.connection.getBusinessNetwork();
    var businessNetworkName = bnDef.getName();
    console.log('CP1');
    const metadata = {
        userName: iDentity.userID,
        version: 1,
        enrollmentSecret: iDentity.userSecret,
        businessNetwork: businessNetworkName
    };
    
    const card = new IdCard(metadata,connectionProfile);
    console.log('CP3');
    return bnUtil.adminConnection.importCard(cardName, card).then(() => {
        console.log('CP4');
        console.log('Card succesfully imported');
    });
};

function main(error) {

    // Check for error
    if (error) {
        console.log(error);
        process.exit(1);
    }
    var bnDef = bnUtil.connection.getBusinessNetwork();
    // console.log("2. Received Definition from Runtime: ",bnDef.getName(),"  ",bnDef.getVersion());

    // 3. Get the factory
    var factory = bnDef.getFactory();

    // 4. Lets create a new Resource of type = Transaction

    // 4. Create an instance of transaction

    const participantkey = "0005"; //hardcoded transaction values
    var fname = "ALEX";
    var lname = "KIBETI";
    var email = "MONGARE";


    var transaction = factory.newTransaction(namespace, transactionType);


    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('participantkey', participantkey);
    transaction.setPropertyValue('fname', fname);
    transaction.setPropertyValue('lname', lname);
    transaction.setPropertyValue('email', email);


    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(() => {
            console.log("6. Transaction Submitted/Processed Successfully!!");

            try {
                id = participantkey;
                return bnUtil.connection.issueIdentity('org.land.landsys.participant.LANDSYSClient#' + participantkey, id).then((result) => {
                    console.log(result.userID);
                    identity = result;
                }).then(() => {

                    cardname = id;
                    console.log(id);
                    console.log(identity.userID);
                   // importCardForIdentity(cardname,identity);
                    //var identityLabel = 'Aleki6@landsys';
                    // return wallet.import(identityLabel, identity);
                    bnUtil.disconnect();
                });
            } catch (error) {
                console.log(error);
                process.exit(1);
                bnUtil.disconnect();
            }


        })
        /*.then(()=>{
           // try {
                var id="Aleki5";
                return bnUtil.connection.issueIdentity('org.land.landsys.participant.LANDSYSClient#0005',id).then((result)=>{
                    var identity=result;
                    console.log(identity.userID);
                    bnUtil.disconnect();
                }).then(()=>{
                    
                    cardname=id;
                    importCardForIdentity(cardname, identity);
                        //var identityLabel = 'Aleki6@landsys';
                      // return wallet.import(identityLabel, identity);
                      bnUtil.disconnect(); 
                });

            })*/
        .catch((error) => {
                console.log(error);
                process.exit(1);
                bnUtil.disconnect();
            }

        );
}
