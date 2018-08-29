var express = require('express');
var app = express();
var fs = require('fs')
var bodyParser = require('body-parser')
let users = require('./users.json') 

app.use(bodyParser.urlencoded({ extended: true }));

// var users = require('./users.json'). --> works to load JSON

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/users", function(req, res) {
	fs.readFile('users.json', function (err, data) {
		if (err) {
			throw err;
		}

    users = JSON.parse(data)
    res.render("users", {users: users});
	})
	
})

app.get("/search", function(req, res) {
	res.render("search");
});

app.post("/search", function(req, res) {
	searchuser = req.body
	res.render("searchresult", {searchuser: searchuser,
								users: users})
});

app.get("/adduser", function(req, res) {
	res.render("adduser");
});

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

	res.redirect("users")
})

app.listen(3000, function() {
	console.log("The server is running");
});

