var express = require ( 'express');
var app = express ();
var nodemailer = require ('nodemailer')
var bodyParser = require ( 'body-parser')
var multer = require ( 'multer');
var mongoose = require ( 'mongoose');
app.use ( bodyParser.json());
app.use ( bodyParser.urlencoded ( {extended:false}));
app.use ('/',express.static(__dirname+ '/files'))
var schema = mongoose.Schema;
var schem = new schema(
  {
	     userName:{type:String,required:true},
	     password:{type:String,required:true},
         email:{type:String,required:true},
         files:{data:Buffer,type:String}
  }, { collection:'hotell'})
            var storage = multer.diskStorage({
                 destination: function(req, file, cb) 
                 {
                   cb(null, 'files/')
                     },
                filename: function(req, file, cb)
                {
                   cb(null, file.originalname);
                                                  }
                                                });
            var upload = multer(
                        {
                        storage: storage
                               });
            var model = mongoose.model ( 'hotell',schem)
                mongoose.connect ( "mongodb://localhost/test", function ( err){
               if ( err) 
               {
              console.log ( "error")
                }
                else
              {
	         console.log ( "connected")
               }
})
var transporter = nodemailer.createTransport (
{
        host:'smtp.gmail.com',
        port:465,
        secure:true,
         auth:
         {
	    user:'arijitbardhan1991@gmail.com',
	    pass:'penelopecruz04'
         }

       });

app.post ( '/signUp', upload.any() , function ( req, res, next){
 uName = req.body.userName,
 pWord = req.body.password,
 Email = req.body.email,
File = req.files;
 var  mailOption = {
	from : '"Hii"<arijitbardhan1991@gmail.com>',
	to:Email,
	subject : 'hello',
	text : 'hello bangali?',
	html : '<b>hello bangali?</b>'
};
transporter.sendMail ( mailOption, function ( error,info){
	      if ( error){
		return console.log(error);
	}
	console.log ( "sent"+info.response)
});
 var data = new model ({userName:uName,password:pWord,email:Email,files:"http://localhost:8080/"+File[0].originalname});
                 data.save ( function(err,data)
                 {
 	        if (err)
 	        {
 	       	res.send(err)
 	    }
 	    else
 	    {
     res.send(data);
}
 })
 model.find({},function(err, data){
 	//res.send(data)
 })
})
app.get ( '/login/:Email/:pWord', function ( req, res, next){
	      uEmail = req.params.Email

	    pWord = req.params.pWord

	    console.log ( uEmail)
	var mailOptions = {
    from: '"Our Code World " <arijitbardhan1991@gmail.com>', 
    to: uEmail, 
    subject: 'Reset Password', 
    text: "http://localhost:8080/send"
  
            };
       
	model.findOne ({"email":req.params.Email,"password":pWord},function(err,data){

		if ( err) 
		{
			res.send (err)
		}
		if ( data==null)
		{
			   d1=new Date();
			   
					res.send ( "login or password is incorrect"+ transporter.sendMail(mailOptions, function(error,info){
                   if ( error)
                   {
                      return console.log(error);
                   }
                   else
                   {
                      console.log ( 'Message sent: ' + info.response);
                }}));
		}
		else
		{
			res.send ( "correctly login"+data )
		}
	})
	app.get ( '/send', function ( req, res)
       {

       var d2=new Date();

       	if ( d2.getMinutes()-d1.getMinutes()>10){
       		res.send("time out \n Please Try Again Later")
       	} 
       	else
       	{
	       res.sendFile  (__dirname + '/resetPassword.html');
         }   })

app.post ( '/forgetPassword', function ( req, res)
{
    var newPassword = req.body.Password;
    var ConfirmPassword = req.body.ConfirmPassword;
    if(newPassword!=ConfirmPassword){
    	res.send("Password do not match");
    }
    else{
    model.findOne ({"email":uEmail},function(err,data){
    	if(err){
    		return console.log(err)
    	}
    	if(data==null){
    		res.send("please enter correct email");
    	}
    	else{
            model.updateOne({"email":uEmail},{$set:{"password":newPassword}},function(err){
            	if(err)
            		res.send(err)
            	else
            		res.send("password changed");
            });
            
    	}
    })
}

     
 
 })
	
})

app.listen(8080)
