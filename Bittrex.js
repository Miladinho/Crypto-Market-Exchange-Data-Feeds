var bittrex = require("node.bittrex.api");
var socketServer = require('ws').Server;
var exports = module.exports = {};

var url = "https://bittrex.com/api/v1.1/public/getmarkethistory?market="; 

var lastBTC = 0;

//setInterval(function() {},100);

// function getLastBuyTradePrice(data) {
// 	var trades = data.result.reverse();
// 	trades.forEach(function(trade) {
// 		if (trade.OrderType === "BUY") {
// 			console.log(trade.TimeStamp,trade.Price);
// 		}
// 		return;
// 	});
// }

// function getLastSpotPrice(currency) {
// 	bittrex.getmarketsummaries(function(data) {
// 	    if (data.success === false) {
// 	    	callback(true,null);
// 	    }
// 	    data.result.forEach(function(market) {
// 	    	if (market.MarketName === currency) {
// 	    		console.log(market.Last);
// 	    	}
// 	    });
// 	});
// }

// function parseTrades(data,callback) {
// 	data.result.forEach(function(trade) {
// 		var id = trade.Id;
// 		var timestamp = trade.TimeStamp;
// 		var quantity = trade.Quantity;
// 		var price = trade.Price;
// 		var type = trade.OrderType;
// 		//console.log(id,timestamp,quantity,price,type);
// 	});
// 	console.log("size =",data.result.length);
// 	callback(null,data.result);
// }

function formatJSONResponseBody(body) {
	return body.map(function(data) {
		return {
			TimeStamp : data.TimeStamp,
			TradeId : data.Id,
			OrderType : data.OrderType,
			Price : data.Price,
			Quantity : data.Quantity,
			OriginalDataObject : data
		}
	});
}

exports.getTrades = function(currency,callback) {
	bittrex.getmarkethistory({market: currency}, function(data) {
		if (data.success === false) {
			callback(new Error('API call failed.'),null);
		} else {
			callback(null,formatJSONResponseBody(data.result));
			//console.log(data.result[0]);
		}
	});
}


// getTradeHistories = function (currency,callback) {
// 	bittrex.getmarkethistory({ market : currency }, function(data) {
// 		if (data.success === false) {
// 			callback(true,null);
// 		} else {
// 			parseTrades(data,callback);
// 		}
// 	});
// }

// exports.findLastPrice = function(currency, callback) {
// 	console.log("in Bittrex exports with value",currency);
// 	bittrex.getmarketsummaries(function(data) {
// 	    if (data.success === false) {
// 	    	callback(true,null);
// 	    } else {
// 		    data.result.forEach(function(market) {
// 		    	if (market.MarketName === currency) {
// 		    		callback(null,market.Last);
// 		    	}
// 		    });
// 		}
// 	});
// }


