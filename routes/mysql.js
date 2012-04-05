var mysql = require('mysql-pool').MySQLPool;

var options =	{
		poolSize: 10,
		host: '127.0.0.1',
		port: '3306',
		database: 'IdeaStorm',
		user: 'IdeaStormUsr',
		password: '123',
	};

var client = new mysql(options);

/*
function getTest(req, next) {
	var table = 'test';
	query = "SELECT * FROM " + table;
	client.query(query, function selectcb(err, results, fields) {
		if ( err ) {
			console.log( new Error(err + ' while running ' + query) );
		}
		req.qresult = results;
		//console.log(fields);
		next();
	});
}
*/

function select (req, info, next) {
	query = 'SELECT ' + info.columns + ' FROM ' + info.table + info.where;
	client.query(query, function scallback(err, results, fields) {
		if (err)
			console.log(new Error(err));
			
		req.qresult = results;
		//console.log(fields);
		next();
	});
}

function insert(req, info, next) {
	
	query = 'INSERT INTO ' + info.table + ' ' + info.columns + ' ' + info.where;
	client.query(query, function(err, results) {
		if (err)
			console.log(new Error(err));
			
		console.log(results);
		next();
	});
}

exports.testInsert = function(req, res) {
	console.log('in insert');
	
	info = {
		table: "test",
		columns: "(x , y )",
		where: "values(23,2)"
	};
	
	insert(req, info, function() {
		res.render('mysql-test', {title:'MySQL INSERT Test'});
	})
	
}

exports.test = function (req, res) {
	console.log('ok, started test!');

	info = {
		table: "test",
		columns: "*",
		where: ""
	};
	
	select(req, info,  function () {
		
		console.log('rows as we got from the db:');
		console.log(req.qresult)
		
		for (i in req.qresult) {
			console.log('Row '+ i + ' , X:' + req.qresult[i].x + ' , Y:' + req.qresult[i].y)
		}
		res.render('mysql-test', {title:'MySQL SELECT Test'});
	});
}