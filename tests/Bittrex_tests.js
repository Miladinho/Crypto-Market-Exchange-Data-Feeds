var Chai = require('chai');
Chai.use(require("chai-sorted"));
var Bittrex = require('../lib/Bittrex');
var Helpers = require('../tests/Helpers');

describe('Bittrex module', function() {
	describe('getTrades', function() {
		Helpers.generalGetTradesFunctionTests(Bittrex);
		it('should pass a list of size 200 on succesfull api call to callback', function(done) {
			Bittrex.getTrades('USDT-BTC', function(err, result) {
				if (err) done(err);
				else {
					Chai.assert(result.length === 200);
					done();
				}
			})
		});
		it('should return an object array sorted in descending order by TradeId key', function(done) {
			Bittrex.getTrades('USDT-BTC', function(err, result) {
				Chai.expect(result).to.be.sortedBy("TradeId", true);
				done();
			})
		});
	});
});