var Chai = require('chai');
var CoinBase = require('../lib/CoinBase');

describe('CoinBase module', function() {
	describe('getTrades', function() {
		it('should export a function', function() {
			Chai.expect(CoinBase.getTrades).is.a('function');
		});
		it('should pass error object to callback on bad currency input', function(done) {
			CoinBase.getTrades('bad', function(err, result) {
				Chai.assert(err != null,'err parameter should not be null');
				Chai.assert(err instanceof Error,'err parameter should be an Error object');
				done();
			});
		});
		it('should pass null for result object in callback on bad currency input', function(done) {
			CoinBase.getTrades('bad', function(err, result) {
				Chai.assert(result === null);
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
					Chai.assert(keys[0] === 'Exchange');
					Chai.assert(keys[1] === 'TimeStamp');
					Chai.assert(keys[2] === 'TradeId');
					Chai.assert(keys[3] === 'OrderType');
					Chai.assert(keys[4] === 'Price');
					Chai.assert(keys[5] === 'Quantity')
				});
				done();
			});
		});
	});
})