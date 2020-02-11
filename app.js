var express = require('express');
var path = require('path'); 
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));
app.get('/', function(req, res){
    res.render('index',{title : 'Computer Not Working?'});
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.post('/contact/send', function(req, res){
    console.log('Test');
    var transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth : {
            user : 'morethanbetter333@gmail.com',
            pass: ''
        }
    });

    var mailOptions = {
        from : 'lst leopard <morethanbetter333@gmail.com>',
        to : 'support@joomdigi.com',
        subject : 'WebSite Submission',
        text : 'You have a submission with the following details.. Name'/* + req.body.name +
                'Email' + req.body.email + 'Message' + req.body.Message*/,
        
        html : '<p>You have a submission with the fllowing details..</p><ul><li>Name : ' /*+ req.body.name + 
                '</li><li>Email : ' + req.body.email + '</li><li>Message : ' + req.body.message + '</li></ul>'*/
    };
    console.log('Make a TransPorter');
    transporter.sendMail(mailOptions, function(error, info){
        if(error)
        {
            console.log(error);
            res.redirect('/');
        }else{
            console.log('Message Sent :' + info.response);
            res.redirect('/');
        }
    });    
});

app.listen(3000);
console.log('Server is running of port 3000...');