var request = require('request');
var exports = module.exports = {}

function currencyStringTransformer(currency) {
	try {
		var currencies = currency.split('-');
		var firstCurrency = currencies[0];
		var secondCurrency = currencies[1];
		return firstCurrency+'_'+secondCurrency;
	} catch(err) {
		return currency;
	}
}

exports.getTrades = function(currency,callback) {
	var url = 'https://poloniex.com';
	var path = '/public?command=returnTradeHistory&currencyPair='+currencyStringTransformer(currency);
	request(url+path, function(err, res, body) {
		if (typeof JSON.parse(body).error !== 'undefined') callback(new Error('API call failed.'),null);
		else {
			callback(null,JSON.parse(body));
			//console.log(JSON.parse(body)[0]);
		}
	});
}