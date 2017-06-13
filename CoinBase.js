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
	client.getProductTrades({'before': 10}, function(err, response, data) {
		if (data.message === 'NotFound') callback(new Error('API call failed.'),null);
		else {
			callback(null,JSON.parse(response.body));
			//console.log(JSON.parse(response.body)[0]);
		}
	});
}



