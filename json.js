// init library
(function(window) {
	// creating main function class
	class Json {
		// class constructor
		constructor(data) {
			// check if data exists
			if(typeof data === 'undefined') {
				data = {};
			};
			// return itself (for query-like support)
			return this;
		};
		// ...
	};
	// allow class to be loaded globally
	window.Json = Json;
	// #
})(window);
