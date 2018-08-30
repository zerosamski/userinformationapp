 var express = require('express');
var app = express();
var fs = require('fs')
var bodyParser = require('body-parser')
let users = require('./users.json') 

//used to load the css files in public
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine to ejs so .ejs is not needed
app.set("view engine", "ejs");

//render starting page
app.get("/", function(req, res) {
	res.render("../views/home");
});

//render users page and load the JSON file. Have to include the .render in scop of readfile function to ensure updating after changes in adduser.  
app.get("/users", function(req, res) {
	fs.readFile('users.json', function (err, data) {
		if (err) {
			throw err;
		}

    users = JSON.parse(data)
    res.render("users", {users: users});
	})
	
})

//render search page
app.get("/search", function(req, res) {
	res.render("search");
});

//searching for users
app.post("/search", function(req, res) {
	searchuser = req.body
	res.render("searchresult", {searchuser: searchuser,
								users: users})
});

//render the page to add an user
app.get("/adduser", function(req, res) {
	res.render("adduser");
});

//adding a new user to the JSON file. 
app.post("/adduser", function(req, res) {	
	var newdata = req.body

	fs.readFile('users.json', function (err, data) {
		if (err) {
			throw err;
		}

    var json = JSON.parse(data)
    json.push(newdata)

    fs.writeFile("users.json", JSON.stringify(json), function(err, data) { 
    	if (err) {
    		throw err;
    	}

		})
	})

	//redirect to home page
	res.redirect("users")
})

app.listen(3000, function() {
	console.log("The server is running on port 3000");
});

