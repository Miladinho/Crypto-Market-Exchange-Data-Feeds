var bittrex = require("node.bittrex.api");
var exports = module.exports = {};

var url = "https://bittrex.com/api/v1.1/public/getmarkethistory?market="; 

function formatJSONResponseBody(body) {
	if (typeof body === 'undefined') return;
	return body.map(function(data) {
		return {
			Exchange: 'Bittrex',
			TimeStamp: data.TimeStamp,
			TradeId: data.Id,
			OrderType: data.OrderType,
			Price: data.Price,
			Quantity: data.Quantity,
			OriginalDataObject: data
		}
	});
}

function sortResults(results,sortKey) {
	results.sort(function(a, b) {
		return b[sortKey] - a[sortKey];
	});
}

exports.getTrades = function(currency, callback) {
	bittrex.getmarkethistory({market: currency}, function(data) {
		try {
			if (data.success === false) {
				callback(new Error('API call failed.'), null);
			} else {
				sortResults(data.result,'Id');
				callback(null, formatJSONResponseBody(data.result));
			}
		} catch (e) {
			callback(new Error(`${e}`), null);
		}
	});
}
