var Chai = require('chai');
const Bittrex = require('../Bittrex');

describe('Bittrex module', function() {
	describe('getTrades', function() {
		it('should export a function', function(done) {
			Chai.expect(Bittrex.getTrades).to.be.a('function');
			done();
		});
		it('should pass error to callback on bad currency input', function(done) {
			Bittrex.getTrades('',function(err, result) {
				Chai.assert(err === true);
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
		it('should pass a list of size 200 on succefull api call to callback', function(done) {
			Bittrex.getTrades('USDT-BTC', function(err, result) {
				if (err) done(err);
				else {
					Chai.assert(result.length === 200);
					done();
				}
			})
		});
	});
});