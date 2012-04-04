function getTest(req, res, next) {
	console.log('entered test');
	var mysql = require('mysql');
	var DB = 'IdeaStorm';
	var T = 'test';
	var c = mysql.createClient({
		user: 'IdeaStormUsr',
		password: '123'
	});
 
	c.query( 'USE ' + DB );
	c.query(
	  'INSERT INTO '+T+' '+
	  '(x , y ) values(23,2)'
	);
 
	c.query(
		'SELECT * FROM ' + T,
		function selectCb( err, results, fields ) {
			if ( err ) {
				console.log( new Error( 'Failed to query table ' + T ) );
			}
	console.log(results);
			req.Result = results;
			c.end();
			next();
		});
	console.log('done test');
}


exports.test = function (req, res) {
	getTest(req, res, function () {
		res.render('mysql-test', {title:'MySQL Test Page'});
	});
	console.log('reached test!');
}