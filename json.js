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
		// json parser
		parse(data) {
			return JSON.parse(data);
		}
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
					// return itself
					return self;
				}
			}
			// creating actual request
			xhr.open('GET', this.input, false);
			xhr.send();
		};
	};
	// allow class to be loaded globally
	window.Json = Json;
	// #
})(window);
