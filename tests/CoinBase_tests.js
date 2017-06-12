var Chai = require('chai');
var CoinBase = require('../CoinBase');

describe('CoinBase module', function() {
	describe('getTrades', function() {
		it('should export a function', function() {
			Chai.expect(CoinBase.getTrades).is.a('function');
		});
		it('should pass error to callback on bad currency input', function(done) {
			CoinBase.getTrades('p', function(err, result) {
				Chai.assert(err === true);
				done();
			});
		});
		it('should pass a list of objects on successful api call to callback', function(done) {
			CoinBase.getTrades('USDT-BTC', function(err, result) {
				Chai.expect(result).to.be.a('array');
				done();
			});
		});
	});
})