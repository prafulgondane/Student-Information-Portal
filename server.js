	console.log("Hello World.." + __dirname);

	var express 		= require("express");
	var app				= express();
	var bodyParser		= require('body-parser');
	var mongojs			= require('mongojs');
	var db				= mongojs("mongodb://student:student@ds061548.mongolab.com:61548/students",["studentsData"]); 
	/*
	app.get('/',function(req, res){
		res.send("Hello World");
	});
	*/

	app.set('port', (process.env.PORT || 5000));

	app.use(bodyParser());

	app.use(express.static(__dirname + "/public"));

	app.post('/insertServiceData', function(req, res){
		var s = req.body;
		
		db.studentsData.insert(req.body, function(err, doc){
			res.json(doc);

		});

	});

	app.delete('/removeServiceData/:id', function(req, res){
		var id = req.params.id;
		
		db.studentsData.remove(
				{ _id : mongojs.ObjectId(id) },
				function(err, doc){
					res.json(doc);
				}
			);

	});

	app.get('/selectServiceData/:id', function(req, res){
		var id = req.params.id;
		
		db.studentsData.findOne(
				{ _id : mongojs.ObjectId(id) },
				function(err, doc){
					res.json(doc);
				}
			);

	});

	app.put('/updateServiceData/:id', function(req, res){
		var id = req.params.id;
		
		var query = {

			_id : mongojs.ObjectId(id)

		};

		var update = {

			$set : { rollno : req.body.rollno,
					 name : req.body.name,
					 grade : req.body.grade
				    }

		};

		db.studentsData.update(query, update, function(err, doc){
			console.log("err =>" + err);
			res.json(doc);
			console.log('done');
		});

	});

	app.get('/serviceGetData', function(req, res){

		/*
			var src1 = {
				rollno	: 101,
				name 	: "LinkedIn",
				grade	: "A"
			};

			var src2 = {
				rollno : 102,
				name : "Facebook",
				grade	: "B"
			};

			var src3 = {
				rollno : 103,
				name : "IMDB",
				grade	: "C"
			};
			var serviceData = [src1, src2, src3];
		*/
		
		db.studentsData.find(function(err, doc){
			res.json(doc);
		});

	});

	app.get('/serviceOneGetData/:r',function(req, res){
		var r = req.params.r;
		console.log(r);

		db.studentsData.findOne(
				{ rollno : r },
				function(err, doc){
					res.json(doc);
				}
			);		
	});

	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'));
	});


