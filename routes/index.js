mysql_conn = require('./mysql.js');
/*
 * GET home page.
 */
exports.connect = function(req, res){
	res.render('connectdata', { title: 'shaker'});
};
exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};
exports.huda = function(req, res){
	res.render('test', { title: 'huda',	 gdeesh: 15 })
};
exports.shaker = function(req, res){
	res.render('index', { title: 'shaker' })
};
exports.CreateAccount = function(req, res){
	console.log(req.originalMethod);
	
	showerror = 2;
	
	if (req.originalMethod == "GET")
		showerror = 0;
	else if(req.body["firstname"]=="" || req.body["lastname"]=="" || req.body["location"]=="" || req.body["password"]!=req.body["repeatpass"])
		showerror = 1;

	if (showerror == 2) {
		res.cookie('fn', req.body["firstname"] , { maxAge: 900000 });
		var items = req.body["firstname"];
		console.log(items);
		req.session.items = items;
		console.log(req.session.items);
		var item1 = "idea";
		req.session.idea=item1;
		res.redirect('/Account/');
	} else {
		res.render('CreateAccountError', {title: 'Account/Create',
			fn: req.body["firstname"] ,
			ln: req.body["lastname"] ,
			email: req.body["email"] ,
			pass: req.body["password"] ,
			repass: req.body["repeatpass"],
			showerror: showerror});
	}
};
exports.ideaAccount = function(req, res){
	res.render('ideaAccount', { title: 'shaker'});
};
exports.UserAccount = function(req, res){
	console.log("cookie: "+req.cookies.fn);
	console.log("session:  "+req.session.idea);
	res.render('UserAccount', { title: 'shaker', fn: req.cookies.fn, fn2: req.session.items, idea: req.session.idea});
};
exports.CreateAccountPost = function(req, res){
	console.log(req.params);
	console.log(req.body);
	if(req.body["firstname"]=="" || req.body["lastname"]=="" || req.body["location"]=="" || req.body["password"]!=req.body["repeatpass"])
		res.render('CreateAccountError', {title: 'Account/Create',
			fn: req.body["firstname"] ,
			ln: req.body["lastname"] ,
			email: req.body["email"] ,
			pass: req.body["password"] ,
			repass: req.body["repeatpass"],
			showerror: 1})
	// check if all the params are there..
		// do a database update
			// show that the create account process created
	// else, redender the a CreateAccount but with errors..
	else
		res.render('UserAccount', { title: 'Account/User'})
};
exports.test = function(req, res){
  res.render('test', { title: 'Account/View' })
};
exports.Viewpost = function(req, res){
	if(req.body["firstname"]==undefined||req.body["lastname"]==undefined||req.body["location"]==undefined || req.body["password"]!=req.body["repeatpass"])
	{ console.log("yes"+req.body["firstname"]+req.body["lastname"]+req.body["location"]+req.body["e_mail"]+"")
		res.render('CreateAccount', { title: 'Account/Create' , fn: req.body["firstname"] , ln: req.body["lastname"] , e_mail:req.body["e_mail"] ,params: req.params }) ;}
	else
  		res.render('test', { title: 'Account/View' ,firstname: req.body["firstname"] ,lastname: req.body["lastname"]} )
};
exports.Viewget = function(req, res){
  res.render('test', { title: 'Account/View' ,firstname: req.query["firstname"], lastname: req.query["lastname"], locals: { x: 1 } })
};
exports.c2get = function(req, res){
  console.log(req.query["firstname"]);
  res.render('User', { title: 'This is C2!' ,firstname: req.query["firstname"] , lastname: req.query["lastname"]})
};
exports.c2post = function(req, res){
  console.log(req.body);
  res.render('User', { title: 'This is C2!' ,firstname: req.body["firstname"] , lastname: req.body["lastname"]})
};


exports.createAction = function(req,res) {
	console.log(req.params);
	res.render('test123',{ title: 'This is the title'});
};
exports.act = function(req,res){
	console.log(req.params);
	if (req.params["action"]=="New")
		res.render('CreateAccount', { title: 'Account/Create' });
	else
	{
		console.log(req.query["firstname"]);
		res.render('test', { title: 'Account/View' ,firstname: req.query["firstname"] , lastname: req.query["lastname"]});
	}
};
exports.idea = function(req, res){
  res.render('Interface', { title: 'Account/Create'});
};

exports.mysqltest = function(req, res) {
	mysql_conn.test(req, res);
};
exports.mysqltestInsert = function(req, res) {
	mysql_conn.testInsert(req, res);
};