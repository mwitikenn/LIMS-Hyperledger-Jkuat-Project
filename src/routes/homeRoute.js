var express = require('express');
var homeRouter = express.Router();


const bnUtil = require('./bn-connection-util');



// Constant values - change as per your needs

// 1. Connect to landsys
const {
    ensureAuthentication
} = require('../config/auth')

var landParcels = [{
        Link: '/Order',
        Text: 'View Order'
                    },
    {
        Link: '/Parcel',
        Text: 'View Parcels'
                    }];
// homeRouter.get('/', (req, res) =>
//     res.render('index', {
        
//         name: req.user.username,
//         tabletitle: 'Parcels',
//         landparcels: landParcels
//     }));
homeRouter.route('/')
    .get(function (req, res) {
        userid = req.user.username;
        var parcelInfo;
        var parcelLength;
        var json = [{
            "$class": "org.land.landsys.landparcel.parcel",
            "deedno": "0001",
            "size": "0001",
            "location": "0001",
            "typeOfLand": "PUBLIC",
            "owner": "resource:org.land.landsys.participant.LANDSYSClient#0001",
            "bidstatus": "CLOSED",
            "landValue": "1000",
            "taxCompliant": "yes"
          },
          {
            "$class": "org.land.landsys.landparcel.parcel",
            "deedno": "0002",
            "size": "0002",
            "location": "0002",
            "typeOfLand": "PUBLIC",
            "owner": "resource:org.land.landsys.participant.LANDSYSClient#0002",
            "bidstatus": "CLOSED",
            "landValue": "0002",
            "taxCompliant": "yes"
          }];
        bnUtil.connect(main);
            function main(err){
                if(err){
                    console.log(error);
                    process.exit(1);
                }
                return bnUtil.connection.query('selectParcels').then((results)=>{

                    console.log('Received parcels count:', results.length);
                    console.log(results[0].deedno);
                    parcelLength=results.length;
                    parcelInfo = results;
            });
            }
    
        console.log('the loggged in user is ' + userid);
        
        res.render('index',{name:userid,parcelData:parcelInfo,length:parcelLength});

    });
homeRouter.route('/createOffer')
    .get(function (req, res) {
        userid = req.user.username;
    
    
        console.log('the loggged in user is ' + userid);
        res.render('createOfferForm');

    });
homeRouter.route('/trackLandForm')
    .get(function (req, res) {
        userid = req.user.username;
        // #1 Connect to the landsys
            bnUtil.connect(main);
            var parcelInfo;
            function main(err){
                if(err){
                    console.log(error);
                    process.exit(1);
                }
                return bnUtil.connection.query('trackLandRecordHistorian',{deedno:'0001'}).then((results)=>{

                    console.log('Received parcels count:', results.length);
                    console.log(results[0].deedno);
                    parcelInfo =results;
            });
            }
        res.render('trackLandForm', {name:userid,parcelData:parcelInfo});

    });
homeRouter.route('/updateLandForm')
    .get(function (req, res) {
        res.render('updateLandForm');

    });
homeRouter.route('/createLandForm')
    .get(function (req, res) {
        res.render('createLandForm');

    });
homeRouter.route('/createParticipantForm')
    .get(function (req, res) {
        res.render('createParticipantForm');

    });
homeRouter.route('/viewBidsPlaced')
    .get(function (req, res) {
        userid = req.user.username;
        // #1 Connect to the landsys
            bnUtil.connect(main);
            var parcelInfo;
            function main(err){
                if(err){
                    console.log(error);
                    process.exit(1);
                }
                return bnUtil.connection.query('searchOffersOnMyParcels',{deedno:'0001'}).then((results)=>{

                    console.log('Received parcels count:', results.length);
                    console.log(results[0].deedno);
                    parcelInfo =results;
            });
            }
        res.render('bidsPlaced', {name:userid,parcelData:parcelInfo});

    });
homeRouter.route('/viewMyOffers')
    .get(function (req, res) {
        userid = req.user.username;
        // #1 Connect to the landsys
        bnUtil.connect(main);
        var parcelInfo;
        function main(err){
            if(err){
                console.log(error);
                process.exit(1);
            }
            return bnUtil.connection.query('searchOffersOnMyParcel',{deedno:'0001'}).then((results)=>{

                console.log('Received parcels count:', results.length);
                console.log(results[0].deedno);
                parcelInfo =results;
        });
        }
        res.render('offers', {name:userid,parcelData:parcelInfo});

    });
homeRouter.route('/viewMyLandAssets')
    .get(function (req, res) {
        res.render('myLandAssets');
    });;
module.exports = homeRouter;
