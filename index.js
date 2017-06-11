var socketServer = require('ws').Server;
var Bittrex = require('./Bittrex');

var s = new socketServer({port:'3000'});
s.on('connection', function(ws) {
	Bittrex.getTradeHistories('USDT-BTC', function(err,result) {
		if (!err) {
			console.log('sending last price',result);
			ws.send(JSON.stringify(result));
		}
	});
});