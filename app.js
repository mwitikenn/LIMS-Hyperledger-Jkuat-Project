var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var cookieParser=require('cookie-parser');
var passport=require('passport');
var morgan = require('morgan');
const mongoose = require('mongoose');
const session=require('express-session');
var flash = require('connect-flash');
var homeRouter=require('./src/routes/homeRoute');
var postRoutes=require('./src/routes/postRoutes');
var authRouter=require('./src/routes/authRouter');
var dbconfig=require('./src/config/database').MongoURI;
mongoose.connect(dbconfig,{
    useNewUrlParser: true
}).then(()=>console.log('MongoDB connected')).catch(err=>console.log(err));
require('./src/config/passport')(passport);
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('src/views'));
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(session({secret:'fgsfnksbrkoa',resave:true,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/home', homeRouter);
app.use('/home', postRoutes);
app.use('/',authRouter);

app.listen(port, function (err) {
    console.log('running server on port  ' + port);
});
 