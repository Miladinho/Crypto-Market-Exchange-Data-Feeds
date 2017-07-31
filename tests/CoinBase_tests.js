var Chai = require('chai');
var CoinBase = require('../lib/CoinBase');
var Helpers = require('../tests/Helpers');

describe('CoinBase module', function() {
	describe('getTrades', function() {
		Helpers.generalGetTradesFunctionTests(CoinBase);
	});
});