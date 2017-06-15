var Gdax = require('gdax');

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

function formatJSONResponseBody(body) {
	return body.map(function(data) {
		return {
			Exchange : 'CoinBase',
			TimeStamp : data.time,
			TradeId : data.trade_id,
			OrderType : data.side,
			Price : data.price,
			Quantity : data.size,
			OriginalDataObject : data
		}
	});
}

function getTrades(currency,callback) {
	var client = new Gdax.PublicClient(currencyStringTransformer(currency));
	client.getProductTrades({'before': 100}, function(err, response, data) {
		try {
			if (data != null)
				if (data.message === 'NotFound') callback(new Error('API call failed.'),null);
			else {
				callback(null,formatJSONResponseBody(JSON.parse(response.body)));
				//console.log(JSON.parse(response.body));
			}
		} catch (e){
			console.log("Exception error: $1\nerr : $2\nresponse : $3\ndata : $4",e,typeof err,typeof response,typeof data);
			callback(new Error('Something went wrong with gdax node api'),null);
		}
	});
}

module.exports = exports = {
	'getTrades' : getTrades
}


