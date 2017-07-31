var Chai = require('chai');
var Poloniex = require('../lib/Poloniex');
var Helpers = require('../tests/Helpers');

describe('Poloniex module', function() {
	describe('getTrades', function() {
		Helpers.generalGetTradesFunctionTests(Poloniex);
	});
});