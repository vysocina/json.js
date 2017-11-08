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
				} else if(xhr.status === 404) {
					// cant file file
					return self.error('can\'t find file');
				}
			}
			// creating actual request
			xhr.open('GET', this.input, false);
			xhr.send();
		};
		// select main parameter of json
		select(str) {
			// search for string in parent
			if(typeof this.parent[str] !== 'undefined') {
				// found this key
				this.history.push(this.parent);
				this.parent = this.parent[str];
				// return itself
				return this;
			} else {
				// cant find value, show err
				this.error('can\'t find value of ' + str);
				// return itself
				return this;
			}
		};
		// search in json
		where(key, operator, value) {
			// reset print
			this.print = [];
			// search in whole parent
			for(let i = 0; i < this.parent.length; i++) {
				// save each item
				const item = this.parent[i];
				// check if key in item exists
				if(typeof item[key] !== 'undefined') {
					// 'equals' operator
					if(operator === 'equals' ||
							operator === '=' ||
							operator === '==') {
						if(item[key] === value) {
							// found something, pushing into result
							this.print.push(item);
						}
					// 'contains' operator
					} else if(operator === 'contains' ||
							operator === 'like' ||
							operator === '?') {
						if(('' + item[key]).indexOf('' + value) > -1) {
							// found something, pushing into result
							this.print.push(item);
						}
					// unknown operator, error
					} else {
						this.error('unknown opearator');
						// return itself
						return this;
					}
				}
			}
			// return itself
			return this;
		}
		// print function
		get() {
			// return print value
			return this.print;
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
