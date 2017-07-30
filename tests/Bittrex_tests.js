var Chai = require('chai');
Chai.use(require("chai-sorted"));
const Bittrex = require('../lib/Bittrex');

describe('Bittrex module', function() {
	describe('getTrades', function() {
		it('should export a function', function(done) {
			Chai.expect(Bittrex.getTrades).to.be.a('function');
			done();
		});
		it('should pass error to callback on bad currency input', function(done) {
			Bittrex.getTrades('',function(err, result) {
				Chai.assert(err != null);
				done();
			});
		});
		it('should pass list of objects on succesfull api call to callback', function(done) {
			Bittrex.getTrades('USDT-BTC',function(err, result) {
				if (err) done(err);
				else {
					Chai.expect(result).to.be.a('array');
					done();
				}
			});
		});
		it('should pass a list of size 200 on succesfull api call to callback', function(done) {
			Bittrex.getTrades('USDT-BTC', function(err, result) {
				if (err) done(err);
				else {
					Chai.assert(result.length === 200);
					done();
				}
			})
		});
		it('should return objects of uniform keys', function(done) {
			Bittrex.getTrades('USDT-BTC', function(err, result) {
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
		it('should return an object array sorted in descending order by TradeId key', function(done) {
			Bittrex.getTrades('USDT-BTC', function(err, result) {
				Chai.expect(result).to.be.sortedBy("TradeId", true);
				done();
			})
		});
	});
});