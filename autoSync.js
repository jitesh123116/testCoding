var async = require ( 'async' );
console.log("start");
async.auto({
	one:['three',  function ( result,cb){
         
          	console.log(result);
          
          	cb(null, '1','5')
          
	}],
	two:  [
              'one', function(result,cb){
              	console.log(result)
              	cb(null, '2','7');
              }
	],
	three:[
              function(cb){
              	console.log("three");
              	cb(null,'3')
              }
	]
},
function(err,result){
	console.log(result)
});

