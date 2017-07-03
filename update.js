function updateData(){
	app.post('/updateUser/:id',function(req,res){
	col.findOne({"email":req.params.id},function(err,data){
		if(err){
			res.send(err);
		}
		else if(data==null){
			res.send("Data is not came");
		}
		else
		{
		      

			

			col.update({"email": req.params.id}, {$set: [{"userName": req.body.userName},{"email":req.body.email},{"passWord":req.body.passWord},{"phoneNo":req.body.phoneNo}]})
		}
	})
});
}
module.exports=updateData;
