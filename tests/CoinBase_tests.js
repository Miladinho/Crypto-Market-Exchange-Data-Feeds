var Chai = require('chai');
var CoinBase = require('../CoinBase');

describe('CoinBase module', function() {
	describe('getTrades', function() {
		it('should export a function', function() {
			Chai.expect(CoinBase.getTrades).is.a('function');
		})
	})
})