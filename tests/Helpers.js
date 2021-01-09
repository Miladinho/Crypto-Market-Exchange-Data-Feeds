var Chai = require('chai');
var exports = module.exports = {};

exports.generalGetTradesFunctionTests = function(module) {
	/*
		Note: USDT-BTC is the currency string used in these tests because nearlly all exchanges will support this.
	*/
	describe('Callback pattern tests', function() {
		it('should pass error object to callback on bad currency input and null as result block', function(done) {
			module.getTrades('',function(err, result) {
				Chai.assert(err !== null);
				Chai.assert(result === null);
				done();
			});
		});
		it('should pass list of objects on succesfull api call to callback and null as error', function(done) {
			module.getTrades('USDT-BTC',function(err, result) {
				Chai.expect(result).to.be.a('array');
				Chai.assert(err === null);
				done();
			});
		});
	});
	it('should export a function', function(done) {
		Chai.expect(module.getTrades).to.be.a('function');
		done();
	});
	it('should return objects of uniform keys', function(done) {
		module.getTrades('USDT-BTC', function(err, result) {
			if (err) {
				done(err);
			}
			result.forEach(function(item) {
				var keys = Object.keys(item);
				Chai.assert(keys[0] === 'Exchange');
				Chai.assert(keys[1] === 'TimeStamp');
				Chai.assert(keys[2] === 'TradeId');
				Chai.assert(keys[3] === 'OrderType');
				Chai.assert(keys[4] === 'Price');
				Chai.assert(keys[5] === 'Quantity');
				Chai.assert(keys[6] === 'OriginalDataObject');
			});
			done();
		});
	});
}
