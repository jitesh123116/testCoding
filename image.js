var express=require('express');
var app=express();
var fs=require('fs');
var mongo=require('mongoose');
var schema=mongo.Schema;
var url='mongodb://localhost/test';
//var imgpath=__dirname+'/files/image_1498817707826_image.png';

var schema=new schema({
	image :{data:Buffer, contentType:String},
	name: {type: String}
},{collection: 'Imagesave'});
var model=mongo.model('',schema);

mongo.connect(url, function( err){
	if(err)
		res.send (err);
	else
		console.log ( "connected");
})

app.get('/save',function (req, res){
	res.sendFile(__dirname+ '/uploadImage.html');
})

app.post('/image', function (req,res){
	var doc = new model
	doc.image.data = fs.readFileSync ( imgpath);
	doc.image.contentType = 'image/png';
	doc.save (function ( err){
		if( err)
			res.send ( err);
		else
			res.send( "image successfully saved");
	})
})

app.get('/getimage', function(req,res){
	model.findOne( { "image.contentType" : "image/png"} , function( err, doc){
		if( err)
			res.send ( err);
		else{
			res.send ( doc.image.data);
		}
	})
})
app.listen(8080);
