
var express= require('express');
var app=express();
var bodyParser = require('body-parser');
var route= require('./route.js');
//to parse requests
app.use(bodyParser.urlencoded({ extended: true }));
let userdata={};
//get the middleware to cookieparser variable
var cookieParser= require('cookie-parser');

//use the middleware cookieparser
app.use(cookieParser());

//pugsetup
app.set('view engine','pug');
app.set('views','./views');


//homepage
app.get('/home',function(req,res){
    res.render('home');
});

//loginpage
app.get('/login',function (req,res) {
    res.render('login');
});

app.post('/login',function (req,res){
console.log(req.body);

res.redirect('/home');
    }
);
//Registerpage
app.get('/register',function (req,res) {
    res.render('register');
});


app.post('/register',function(req,res) {
    console.log(req.body);
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    const Email = req.body.Email;
    const Password = req.body.Password;
    let user={Firstname: Firstname, Lastname: Lastname, Email: Email, Password: Password};
    console.log(user);
    res.cookie("userdata",user);
    res.redirect('/login');
});



//userdata below will be displayed
let users= {
    name: "padma",
    email: "tejadevarapalli47@gmail.com"
};


app.get('/setc',(req,res)=>{
    res.cookie("userdata",users);
    res.send('user data added to cookie');
});

app.get('/getc',(req,res) => {
    res.send(req.cookies.userdata);
});
app.use('/',route);

//res.clearCookie(cookieName);


app.listen(3000);

