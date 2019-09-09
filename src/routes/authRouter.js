var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
const User = require('../models/User');
const PersonnelUser = require('../models/PersonnelUser');
const bcrypt = require('bcrypt');
const bnUtil = require('./bn-connection-util');

authRouter.route('/admin/createparticipant')
    .post(function (req, res) {

        const userName = req.body.idNumber;
        const passWord = req.body.password;
        /** var url = 'mongodb://localhost:27017/landsysClientApp';
        MongoClient.connect(url, {
             useNewUrlParser: true
         }, function (err, client) {
             var db = client.db('landsysClientApp');
             var user = {
                 username: req.body.userName,
                 password: req.body.password
             };
             db.collection('user').insertOne(user, function (err, results) {
                 console.log('Success participant' + req.body.userName + ' Has been created');
                 res.render('createParticipantForm');
             });

         }); */
        const idNumber = req.body.idNumber;
        const fname = req.body.fName;
        const lname = req.body.lName;
        const surname = req.body.surname;
        const email = req.body.email;
        const phonenumber = req.body.phonenumber;
        const county = req.body.county;
        const subcounty = req.body.subcounty;
        const country = req.body.country;
        const namespace = "org.land.landsys.participant";
        const transactionType = "createParticipant";
        
        bnUtil.connect(mainconnect);



        User.findOne({
            username: userName
        }).then(user => {
            if (user) {
                console.log('User Already exists');
            } else {
                const newUser = new User({
                    username: userName,
                    password: passWord


                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/admin/profile');

                                console.log('You are now registered and can log in');

                            });
                    });
                });
            }
        }).catch(err => console.log(err));
    

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
    transaction.setPropertyValue('idNumber', idNumber);
    transaction.setPropertyValue('firstname', fname);
    transaction.setPropertyValue('lastname', lname);
    transaction.setPropertyValue('surname', surname);
    transaction.setPropertyValue('email', email);
    transaction.setPropertyValue('phoneNumber', phonenumber);
    transaction.setPropertyValue('county', county);
    transaction.setPropertyValue('subcounty', subcounty);
    transaction.setPropertyValue('country', country);


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


    authRouter.route('/admin/createpersonnelparticipant')
    .post(function (req, res) {

        const userName = req.body.idNumber;
        const passWord = req.body.password;
        //const personnelType = req.body.personnelType;
        /** var url = 'mongodb://localhost:27017/landsysClientApp';
        MongoClient.connect(url, {
             useNewUrlParser: true
         }, function (err, client) {
             var db = client.db('landsysClientApp');
             var user = {
                 username: req.body.userName,
                 password: req.body.password
             };
             db.collection('user').insertOne(user, function (err, results) {
                 console.log('Success participant' + req.body.userName + ' Has been created');
                 res.render('createParticipantForm');
             });

         }); */
        const idNumber = req.body.idNumber;
        const fname = req.body.fName;
        const lname = req.body.lName;
        const surname = req.body.surname;
        const email = req.body.email;
        const phonenumber = req.body.phonenumber;
        const departmentName = req.body.deptName;
        const personnelType = req.body.personnelType;
        const namespace = "org.land.landsys.participant";
        const transactionType = "createLandSysPersonnelParticipant";
        
        bnUtil.connect(mainconnect);



        PersonnelUser.findOne({
            username: userName
        }).then(user => {
            if (user) {
                console.log('User Already exists');
            } else {
                const newUser = new PersonnelUser({
                    username: userName,
                    password: passWord,
                    personnelType: personnelType

                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/admin/profile');

                                console.log('You are now registered and can log in');

                            });
                    });
                });
            }
        }).catch(err => console.log(err));
    

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
    transaction.setPropertyValue('idNumber', idNumber);
    transaction.setPropertyValue('firstname', fname);
    transaction.setPropertyValue('lastname', lname);
    transaction.setPropertyValue('surname', surname);
    transaction.setPropertyValue('email', email);
    transaction.setPropertyValue('phoneNumber', phonenumber);
    transaction.setPropertyValue('landSYSPersonnelType', personnelType);
    transaction.setPropertyValue('departmentname', departmentName);


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





authRouter.route('/').get(function (req, res) {
    res.render('startpage');
});
authRouter.post('/user/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});
authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
authRouter.route('/admin/profile').get(function (req, res) {
    res.render('createParticipantForm');
});
authRouter.route('/admin/login').post(function (req, res) {
    var username = 'admin';
    var password = 'adminpw';
    if (req.body.adminUserName === username && req.body.adminPassWord === password) {
        res.render('createParticipantForm')
    } else {
        console.log(req.body.adminUserName);
        res.redirect('/');
    }
});

authRouter.post('/user/personnelLogin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});
module.exports = authRouter;
