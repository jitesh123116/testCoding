var express=require('express');
var app=express();
var body=require('body-parser');
var mongoose=require('mongoose');
var multer  = require('multer');
var nodemailer = require('nodemailer');
var schema=mongoose.Schema;
var url="mongodb://localhost/test";
app.use(body.json());
app.use(body.urlencoded({
	extended:false
}));
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'arijitbardhan1991@gmail.com',
        pass: 'emmawatson08'
    }
});

app.use('/', express.static(__dirname + '/files'));

var userschema=new schema({
	name:{type:String, required:true},
	email:{type:String, unique:true, required:true},
	
	password:{type:String, required:true},
	age:{type:Number, required:true},
	file:{data:Buffer,type:String}
});
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'files/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});
var upload = multer({
 storage: storage
});
mongoose.connect(url,function(err){
	if(err)
		console.log(err);
	console.log("connected")
	var model=mongoose.model('employee',userschema);
	app.post('/signUp',upload.any(),function(req,res){
		var uname=req.body.name;
		
		var uEmail=req.body.email;
		var upass=req.body.password;
		var uage=req.body.age;
		var uImage = req.file;
		var Url = "http://localhost:8080/"+uImage[0].originalname;
		var data=new model({name:uname, email:uEmail, password:upass, age:uage, file:Url});
		data.save(function(err){
			if(err)
			  res.send(err);
			res.send(data);
		})
var mailOptions = {
    from: '"Our Code World " <arijitbardhan1991@gmail.com>', 
    to: uEmail, 
    subject: 'Hello', 
    text: 'Hello world ', 
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js'
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});


	})
	app.post('/login',function(req,res){
		var uEmail=req.body.email;
		var pass=req.body.pass;
		var mailOptions = {
    from: '"Our Code World " <arijitbardhan1991@gmail.com>', 
    to: uEmail, 
    subject: 'Reset Password', 
    text: 'http://localhost:8000/forgetPassword/', 
    html: '<b>Hello world </b><br> This is the link to reset your password'
};

		model.findOne({"email":uEmail,"password":pass},function(err,data){
			if(err)
				res.send(err);
			if(data==null)
				res.send("login or password is incorrect"+ transporter.sendMail(mailOptions, function(error,info){
                   if(error){
                   return console.log(error);
                   }
    console.log('Message sent: ' + info.response);
    }));
			else
				res.send(data);
		})
	})

 app.post('/forgetPassword:email',function(req,res){
    var newPassword = req.body.password;
    model.findOne({"email":req.params.email},function(err,data){
    	if(err){
    		return console.log(err)
    	}
    	if(data.length==0){
    		res.send("please enter correct email")
    	}
    	else{
            model.updateOne({"email":req.params.email},{"password":newPassword});
    	}
    })


     
 
 })

app.listen(8080);
