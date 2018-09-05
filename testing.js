const jsonReader = require('./json-file-reader.js')

let friends = jsonReader("users.json", callback)

function callback(obj) {
	friends = obj;
}

console.log(friends)