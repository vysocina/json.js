// init library
(function(window) {
	// creating main function class
	class Json {
		// class constructor
		constructor(input) {
			// check if data is actually object
			try {
				// save string and object
				this.input = input;
				this.output = this.parse(input);
				 // return class back
				return this;
			} catch(data) {
				// could not pass the test
				// check if input is already an object
				if(typeof input === 'object') {
					this.output = input;
				} else {
					// not an object, check if input is file
					try {
						let allow = /^((\/|(\\?))[\w .]+)+\.json$/i.test(input);
						// save filepath into input and fetch data
						this.input = input;
						return this.fetch();
					} catch(data) {
						// can't pass, show error message
						return console.error(data);
					}
				}
			}
		};
		// fetch data from url
		fetch() {
			// creating xhr object
			let xhr = new XMLHttpRequest();
			let self = this;
			// success
			xhr.onreadystatechange = function() {
				// check when is request done
				if(xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
					// get values
					self.output = JSON.parse(xhr.responseText);
					// set parent and history objects
					self.parent = self.output;
					self.history = [];
					// return itself
					return self;
				}
			}
			// creating actual request
			xhr.open('GET', this.input, false);
			xhr.send();
		};
		// search function
		search(str) {
			// search for string in parent
			for(let i = 0; i < Object.keys(this.parent).length; i++) {
				// save object keys
				const key = Object.keys(this.parent)[i];
				if(key.indexOf(str) > -1) {
					// found this key
					this.history.push(this.parent);
					this.parent = this.parent[key];
					// return itself
					return this;
				} else {
					// cant find value, show err
					this.error('can\'t find value of ' + str);
					// return itself
					return this;
				}
			}
		};
		// print function
		print(str) {
			// check if string is set
			if(typeof str !== 'string') {
				str = null;
			}
			// if input is null, return parent, otherwise return value
			return str === null ? this.parent : this.parent[str];
		}
		// error handlers
		error(str) {
			return console.error(str, this);
		}
	};
	// allow class to be loaded globally
	window.Json = Json;
	// #
})(window);
