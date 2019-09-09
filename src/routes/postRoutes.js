const bnUtil = require('./bn-connection-util');
var express = require('express');
var postRouter = express.Router();
postRouter.route('/updateLand')
    .post(function (req, res) {
        const namespace = "org.land.landsys.landparcel";
        const transactionType = "updateLand";

        // 1. Connect to landsys
        var bnUtil = require('./bn-connection-util');
    
        var deedno = req.body.deedNo;
        var size = req.body.size;
        var location = req.body.location;
        var typeOfLand = req.body.landtype;
        var landValue = req.body.landValue;
        var taxCompliant = req.body.taxCompliant;
        bnUtil.connect(mainconnect);


        function mainconnect(error) {

            // Check for error
            if (error) {
                console.log(error);
                process.exit(1);
            }
            let bnDef = bnUtil.connection.getBusinessNetwork();
            console.log("2. Received Definition from Runtime: ",
                bnDef.getName(), "  ", bnDef.getVersion());

            // 3. Get the factory
            let factory = bnDef.getFactory();

            // 4. Lets create a new Resource of type = Transaction

            // 4. Create an instance of transaction
            let options = {
                generate: false,
                includeOptionalFields: false
            }

            var transaction = factory.newTransaction(namespace, transactionType);


            // 5. Set up the properties of the transaction object

            transaction.setPropertyValue('deedno', deedno);
            transaction.setPropertyValue('size', size);
            transaction.setPropertyValue('location', location);
            transaction.setPropertyValue('typeOfLand', typeOfLand);
            transaction.setPropertyValue('landValue', landValue);
            transaction.setPropertyValue('taxCompliant', taxCompliant);

            // 6. Submit the transaction
            return bnUtil.connection.submitTransaction(transaction).then(() => {
                console.log("6. Transaction Submitted/Processed Successfully!!")

                bnUtil.disconnect();

            }).catch((error) => {
                console.log(error);

                bnUtil.disconnect();
            });
        }



        //res.send(req.body);
        res.render('createParticipantForm');
    });
postRouter.route('/trackLand')
    .post(function (req, res) {
    Titledeedno=req.body.deedno;
        console.log(req.body);
        res.send(req.body);

    });
postRouter.route('/makeOffer')
    .post(function (req, res) {
        var namespace = "org.land.landsys.offerAsset";
        let OfferID = req.body.offerID;
        let buyerId =  req.user.username;
        let parcelID = req.body.deedno;

        // 1. Connect to landsys



        // Constant values - change as per your needs
        const transactionType = "makeOffer";

        // 1. Connect to landsys
        var bnUtil = require('./bn-connection-util');
        
    bnUtil.connect(main);

        function main(error) {

            // Check for error
            if (error) {
                console.log(error);
                process.exit(1);
            }
            let bnDef = bnUtil.connection.getBusinessNetwork();
            console.log("2. Received Definition from Runtime: ",
                bnDef.getName(), "  ", bnDef.getVersion());

            // 3. Get the factory
            let factory = bnDef.getFactory();

            // 4. Lets create a new Resource of type = Transaction

            // 4. Create an instance of transaction
            let options = {
                generate: false,
                includeOptionalFields: false
            }



            let transaction = factory.newTransaction(namespace, transactionType);
            console.log('debug step1');

            // 5. Set up the properties of the transaction object
            transaction.setPropertyValue('offerID', OfferID);

            transaction.setPropertyValue('parcelID', parcelID);
            transaction.setPropertyValue('buyerID', buyerId);


            // 6. Submit the transaction
            return bnUtil.connection.submitTransaction(transaction).then(() => {
                console.log("6. Transaction Submitted/Processed Successfully!!")

                bnUtil.disconnect();

            }).catch((error) => {
                console.log(error);

                bnUtil.disconnect();
            });
        };
        res.redirect("/home");
    });
postRouter.route('/createLand')
    .post(function (req, res) {



        console.log(req.body);
        var namespace = "org.land.landsys.landparcel";
        var transactionType = "createLand";
        var Titledeedno = req.body.deedNo; //
        var idNumber = req.body.ownerId;
        var size = req.body.size;
        var location = req.body.location;
        var landtype = req.body.landtype;
        var taxCompliant = req.body.taxCompliant;
        var landValue = req.body.landValue;
        // 1. Connect to landsys

        bnUtil.connect(mainconnect);


        function mainconnect(error) {

            // Check for error
            if (error) {
                console.log(error);
                process.exit(0);
            }
            let bnDef = bnUtil.connection.getBusinessNetwork();
            console.log("2. Received Definition from Runtime: ",
                bnDef.getName(), "  ", bnDef.getVersion());

            // 3. Get the factory
            let factory = bnDef.getFactory();

            // 4. Lets create a new Resource of type = Transaction

            // 4. Create an instance of transaction
            let options = {
                generate: false,
                includeOptionalFields: false
            }

            var transaction = factory.newTransaction(namespace, transactionType);


            // 5. Set up the properties of the transaction object
            transaction.setPropertyValue('deedno', Titledeedno);
            transaction.setPropertyValue('newOwnerPartcipantkey', idNumber);
            transaction.setPropertyValue('size', size);
            transaction.setPropertyValue('location', location);
            transaction.setPropertyValue('typeOfLand', landtype);
            transaction.setPropertyValue('landValue', landValue);
            transaction.setPropertyValue('taxCompliant', taxCompliant);


            // 6. Submit the transaction
            return bnUtil.connection.submitTransaction(transaction).then(() => {
                console.log("6. Transaction Submitted/Processed Successfully!!")

                bnUtil.disconnect();

            }).catch((error) => {
                console.log(error);

                bnUtil.disconnect();
            });
        };
res.render('createParticipantForm');
    });

postRouter.route('/openBid')
    .post(function (req, res) {

        // Constant values - change as per your needs
        const namespace = "org.land.landsys.landparcel";
        const transactionType = "openBid";
        var Titledeedno = req.body.deedno; //
        var ownerId = req.user.username;
        // 1. Connect to landsys
        bnUtil.connect(mainconnect);

        function mainconnect(error) {

            // Check for error
            if (error) {
                console.log(error);
                process.exit(1);
            }
            let bnDef = bnUtil.connection.getBusinessNetwork();
            console.log("2. Received Definition from Runtime: ",
                bnDef.getName(), "  ", bnDef.getVersion());

            // 3. Get the factory
            let factory = bnDef.getFactory();

            // 4. Lets create a new Resource of type = Transaction

            // 4. Create an instance of transaction
            let options = {
                generate: false,
                includeOptionalFields: false
            }



            let transaction = factory.newTransaction(namespace, transactionType);


            // 5. Set up the properties of the transaction object
            transaction.setPropertyValue('deedno', Titledeedno);
            transaction.setPropertyValue('ownerId', ownerId);

            // 6. Submit the transaction
            return bnUtil.connection.submitTransaction(transaction).then(() => {
                console.log("6. Transaction Submitted/Processed Successfully!!")

                bnUtil.disconnect();

            }).catch((error) => {
                console.log(error);

                bnUtil.disconnect();
            });
        };
        res.redirect("/home");

    });
postRouter.route('/closeBid')
    .post(function (req, res) {


        // Constant values - change as per your needs
        const namespace = "org.land.landsys.landparcel";
        const transactionType = "closeBid";
        var Titledeedno = req.body.Titledeedno; //
        var ownerId = req.user.username;
        // 1. Connect to landsys
        bnUtil.connect(main);

        function main(error) {

            // Check for error
            if (error) {
                console.log(error);
                process.exit(1);
            }
            let bnDef = bnUtil.connection.getBusinessNetwork();
            console.log("2. Received Definition from Runtime: ",
                bnDef.getName(), "  ", bnDef.getVersion());

            // 3. Get the factory
            let factory = bnDef.getFactory();

            // 4. Lets create a new Resource of type = Transaction

            // 4. Create an instance of transaction
            let options = {
                generate: false,
                includeOptionalFields: false
            }


            let transaction = factory.newTransaction(namespace, transactionType);


            // 5. Set up the properties of the transaction object
            transaction.setPropertyValue('deedno', Titledeedno);
            transaction.setPropertyValue('ownerId', ownerId);

            // 6. Submit the transaction
            return bnUtil.connection.submitTransaction(transaction).then(() => {
                console.log("6. Transaction Submitted/Processed Successfully!!")

                bnUtil.disconnect();

            }).catch((error) => {
                console.log(error);

                bnUtil.disconnect();
            });
        };
        res.redirect("/home");

    });
postRouter.route('/rejectOffer')
    .post(function (req, res) {


        // Constant values - change as per your needs
        const namespace = "org.land.landsys.offerAsset";
        const transactionType = "rejectOffer";
        var OfferID = req.body.OfferID; //Hardcoded field values
        var ownerid = req.user.username;
        // 1. Connect to landsys
        bnUtil.connect(main);

        function main(error) {

            // Check for error
            if (error) {
                console.log(error);
                process.exit(1);
            }
            let bnDef = bnUtil.connection.getBusinessNetwork();
            console.log("2. Received Definition from Runtime: ",
                bnDef.getName(), "  ", bnDef.getVersion());

            // 3. Get the factory
            let factory = bnDef.getFactory();

            // 4. Lets create a new Resource of type = Transaction

            // 4. Create an instance of transaction
            let options = {
                generate: false,
                includeOptionalFields: false
            }



            let transaction = factory.newTransaction(namespace, transactionType);


            // 5. Set up the properties of the transaction object
            transaction.setPropertyValue('offerID', OfferID);

            transaction.setPropertyValue('ownerID', ownerid);
            // 6. Submit the transaction
            return bnUtil.connection.submitTransaction(transaction).then(() => {
                console.log("6. Transaction Submitted/Processed Successfully!!")

                bnUtil.disconnect();

            }).catch((error) => {
                console.log(error);

                bnUtil.disconnect();
            });
        }


    })
postRouter.route('/transferLand')
    .post(function (req, res) {
    

 // Constant values - change as per your needs
 const namespace = "org.land.landsys.landparcel"; 
 const transactionType = "transferLand";
    var newOwnerid= req.body.newOwnerID;//hardcoded transaction values
    var Titledeedno=req.body.deedno;//
    var curentOwnerID=req.user.username;
// 1. Connect to landsys
bnUtil.connect(main);

function main(error){
    
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


    let transaction = factory.newTransaction(namespace,transactionType);

    
    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('deedno',Titledeedno);
    transaction.setPropertyValue('newOwnerPartcipantkey', newOwnerid);
    transaction.setPropertyValue('currentOwnerID',curentOwnerID);


    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
};
res.redirect("/home");

})
module.exports = postRouter;
