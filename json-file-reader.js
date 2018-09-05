// This module should have a function that takes in a filename and a callback function as a parameter. 

module.exports = function (filename) {

// should then read that file, then parse the JSON
	var fs = require('fs');
	
	fs.readFile(filename, function (err, data) {
			if (err) {
				throw err;    
			}

			return JSON.parse(data);

		});
}

