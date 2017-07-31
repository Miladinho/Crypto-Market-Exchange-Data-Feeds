var Gdax = require('gdax');
var exports = module.exports = {};

function currencyStringTransformer(currency) {
	try {
		var currencies = currency.split('-');
		var firstCurrency = currencies[0];
		var secondCurrency = currencies[1];
		if (firstCurrency === 'USDT') {
			return secondCurrency + '-USD';
		} else {
			return secondCurrency + '-' + firstCurrency;
		}
	} catch(err) {
		return currency;
	}
}

function formatJSONResponseBody(body) {
	return body.map(function(data) {
		return {
			Exchange: 'CoinBase',
			TimeStamp: data.time,
			TradeId: data.trade_id,
			OrderType: data.side,
			Price: data.price,
			Quantity: data.size,
			OriginalDataObject: data
		}
	});
}

exports.getTrades = function(currency,callback) {
	var client = new Gdax.PublicClient(currencyStringTransformer(currency)); 
	client.getProductTrades({'before': 100}, function(err, response, data) {
		if (err)
			callback(err, null);
		try {
			if (response.statusCode < 200 || response.statusCode > 302) 
				callback(new Error('API call failed.'), null);
			else 

				callback(null,formatJSONResponseBody(JSON.parse(response.body)));
		} catch (e){
			console.log("Exception error: %s\nerr : %s\nresponse : %s\ndata : %s", e, typeof err, typeof response, typeof data);
			callback(new Error('Something went wrong with gdax node api'),null);
		}
	});
}