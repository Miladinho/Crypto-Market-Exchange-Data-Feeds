var Chai = require('chai');
var CoinBase = require('../CoinBase');

describe('CoinBase module', function() {
	describe('getTrades', function() {
		it('should export a function', function() {
			Chai.expect(CoinBase.getTrades).is.a('function');
		});
		it('should pass error to callback on bad currency input', function(done) {
			CoinBase.getTrades('bad', function(err, result) {
				Chai.assert(err != null);
				done();
			});
		});
		it('should pass a list of objects on successful api call to callback', function(done) {
			CoinBase.getTrades('USDT-BTC', function(err, result) {
				Chai.expect(result).to.be.a('array');
				done();
			});
		});
		it('should return objects of uniform keys', function(done) {
			CoinBase.getTrades('USDT-BTC', function(err, result) {
				result.forEach(function(item) {
					var keys = Object.keys(item);
					Chai.assert(keys[0] === 'TimeStamp');
					Chai.assert(keys[1] === 'TradeId');
					Chai.assert(keys[2] === 'OrderType');
					Chai.assert(keys[3] === 'Price');
					Chai.assert(keys[4] === 'Quantity')
				});
				done();
			});
		});
	});
})