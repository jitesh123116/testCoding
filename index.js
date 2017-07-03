var express = require ( 'express');
var app = express ();
var nodemailer = require ('nodemailer')
var bodyParser = require ('body-parser')
var multer = require ('multer');
var mongoose = require ('mongoose');
var fs = require('fs');
app.use ( bodyParser.json());
app.use ( bodyParser.urlencoded ( {extended:false}));
app.use('/login',express.static(__dirname+'/files'))
var schema = mongoose.Schema;
var schem = new schema(
  {
	     username : {type: String, required: true},
	     mobile   : {type: Number,  required: true},
	     email    : {type: String, required: true},
	     password : {type: String, required: true},
	     image    : {data: Buffer, contentType: String},
	     otp      :  {type: String}
	   
  },{collection:'User'});

var storage=multer.diskStorage({destination : function(req,file,cb){
	cb(null,__dirname+'/files')},
filename : function(req,file,cb){
	cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)}
});

var upload = multer(
                        {
                        storage: storage
                               });

var model = mongoose.model ( 'User', schem)
            mongoose.connect ( "mongodb://localhost/test11", function ( err){
            if (err) 
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
// this api is for rendering registration.html file
        app.get('/signup', function (req, res, next)
      {

       res.sendFile  (__dirname + '/registration.html');


//this api for signup user 
       app.post('/signup', upload.any(), function(req, res, next){
 //access post data 
   


       Username = req.body.username;
       Mobile   = req.body.mobile;
       Email    = req.body.email;
       Password = req.body.password;
       Image    = req.files;
        var path=fs.readFileSync(Image[0].path);

      url="http://localhost:8080/"+Image[0].originalname;
    console.log(url)

       var otp  = (Math.random()*10000).toString().split(".")[0];
   
       var data = new model ( {username : Username, mobile : Mobile, email : Email, password : Password, otp:otp} );
       data.image.data=path;
       data.save ( function(err)
    {
 	       if (err)
 	{
 	       res.send ( err)
 	}
 	       else
 	{
          res.send( "registered successfuly");
           fs.appendFile( 'logg.txt', "user registerd\n", function (err) {
          if (err) throw err;
          console.log ( "saved signup details");
    });
    }
    })
 //mailling configuration details      
var  mailOption = {
	from : '"Hii"<arijitbardhan1991@gmail.com>',
	to: Email,
	subject : 'OTP',
	text : otp
	
};
//sending mails
transporter.sendMail ( mailOption, function ( error,info){
	 if ( error){
     return  console.log( error);
}
	 console.log ( "sent" + info.response)
});


})


})
var count = 0;
//this is for rendering the login.html file
app.get ('/login', function (req, res){
	res.sendFile(__dirname+ '/login.html')
})

//this is for login user
app.post('/login',function (req, res){
	        count = count + 1;
	   var email = req.body.email;
	var password = req.body.password;
         var otp = req.body.otp;
        console.log( count)
       var userInfo = "";

             if ( count == 1)
       {
       model.findOne( {"email" : email, "password" : password, "otp"     : otp}, function (err, data)
       {
			 if (err)
				res.send (err);
			 if (data == null)
	   {
			 	
			 	
            res.send ("either username or password is incorrect")
         }      
             else
             
               userInfo += "your name is " + data.username+"\n";
              userInfo += "your mobile number is" + data.mobile+"\n";
              userInfo += " your email is " + data.email+"\n";
              userInfo += "your password is" + data.password+"\n";
              userInfo += "your image is" + data.image;
          console.log ( userInfo)
              
               
		      res.write ( data.image.data);
		    
		      res.end();
              fs.appendFile ( 'logg.txt','successfully login\n', function ( err) {
             if (err) throw err;
              console.log ( "saved login details after first time");
        });
	    })    
		}
		     else
		{

             model.findOne ( { "email":email,"password":password }, function( err, data)
             {
             if(err)
        {
               res.send (err);

        }
             if  ( data==null){
               res.send ( "invalid username or password")
        }
             else
              userInfo += "your name is "+ data.username + "\n";
              userInfo += "your mobile number is " + data.mobile+"\n";
              userInfo += " your email is "+ data.email + "\n";
              userInfo += "your password is "+ data.password + "\n";
              userInfo +="your image is "+ data.image;


              res.write(data.image.data);

              res.end();
              fs.appendFile ( 'logg.txt', 'successfully login\n', function ( err) {
             if (err) throw err;
              console.log  ( "saved login details first time");
    });
    })

    } 
          //this api is for deleting the user profile after login
		   app.get ('/delete', function (req, res, next){
   
         //query to remove files
            model.remove ( {"email":email},function (req, res, next){
         	console.log ( "your profile is deleted");
           	fs.appendFile ( 'logg.txt', "deleted user profile", function ( err) {
            if ( err) throw  err;
             console.log ( "deleted");
    });
           	
    })

		  	res.send( "your profile has deleted")
          


    })  
    });


        app.listen ( 8080)
           

