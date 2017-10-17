[![Build Status](https://travis-ci.org/Miladinho/Crypto-Market-Exchange-Data-Feeds.png?branch=master)(https://travis-ci.org/Miladinho/Crypto-Market-Exchange-Data-Feeds)

# Purpose
A wrapper around the major crypto currency API endpoints for current (live) and past trade transaction data. This guide assumes the reader is familiar with each exchange and with currrency or alt-currency ticker values (BTC = bitcoin for example).

# Supported Exchanges
* Bittrex https://bittrex.com/
* CoinBase https://www.coinbase.com/
* Poloniex https://poloniex.com/

# How to use

This API consists modules, each named after one of the exchanges supported. Each module has 1 function called _getTrades(currencyString, callback)_. The currency string is of the form "USDT-BTC" for example. Every exchange is different so it is important to note that the configuration of the _currencyString_ input parameter changes form API to API for each respective exchange module. 

**A note on currencies:**
Bittrex and Poloniex use USDT (Tether USD) which for trading purposes is essentially the same as USD fiat currency (US Dollar $). Coinbase however uses strait USD as they are an accredited exchange that is setup to send and recieve money between banks. For simplicity we will pass in USDT into the CoinBase module currencyString as well so that the user does not need to do too much research on how each individual exchange's API works. Again, each exchange has different trade configurations which you should be familiar with so if one _currencyString_ parameter to the getTrades function causes the callback function to return an error (see below) then you know that the entered configuration is not supported by that exchange. In rare cases an Error will result form a valid currency string input due to rate limits or other exchange specific server events. These errors will be caught at runtime and reportet in the Error objects message parameter (`Error.message`).

`getTrades(currencyString, function(err, result){...})`

The callback is implemented to conform to the Javascript Callback Pattern. The callback function passed to getTrades will recieve and array of Objects in the _result_ parameter given that the _currencyString_ parameter is correct for the given exchange module. The format of each Object in the result array is as follows:

```
{
	TimeStamp : "time stamp",
	TradeId : "some id local to the exchange db",
	OrderType : "buy/sell"
	Price : "some value",
	Quantity : "some value",
	OriginalDataObject : {
		block of data returned by actual exchange api
	}
}
```

