 // This module should have a function that takes in a filename and a callback function as a parameter. 

module.exports = function (filename, callback) {

// should then read that file, then parse the JSON
	var fs = require('fs');
	var parsed;
	fs.readFile(filename, function (err, data) {
			if (err) {
				throw err;    
			}

			parsed = JSON.parse(data);
	
			 // and then call the callback function and pass the parsed JSON to it
			callback(parsed)
	});
	

}

