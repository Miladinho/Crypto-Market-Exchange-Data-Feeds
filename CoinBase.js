var Gdax = require('gdax');
var exports = module.exports = {}

function currencyStringTransformer(currency) {
	try {
		var currencies = currency.split('-');
		var firstCurrency = currencies[0];
		var secondCurrency = currencies[1];
		if (firstCurrency === 'USDT') {
			return secondCurrency+'-USD';
		} else {
			return secondCurrency+'-'+firstCurrency;
		}
	} catch(err) {
		return currency;
	}
}

exports.getTrades = function(currency,callback) {
	var client = new Gdax.PublicClient(currencyStringTransformer(currency));
	client.getProductTrades({'before': 100}, function(err, response, data) {
		//console.log(data.message);
		if (data.message === 'NotFound') callback(true,null);
		else callback(false,JSON.parse(response.body));
	});
}

// var client = new Gdax.PublicClient('BTC-USD');
// client.getProductTrades({'before': 200}, function(err, result) {
// 	console.log(JSON.parse(result.body));
// });

