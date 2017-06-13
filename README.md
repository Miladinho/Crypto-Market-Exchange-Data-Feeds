# Purpose
This server is meant to collect live transaction data from the three major crypto currency exchanges. This guide assumes the reader is familiar with each exchange and with currrency or alt currency ticker values (BTC = bitcoin for example).

# Covered Exchanges
* Bittrex https://bittrex.com/
* CoinBase https://www.coinbase.com/
* Poloniex https://poloniex.com/

# How to use

This API consists of three modules, each named after one of the exchanges supported. Each module has 1 function called getTrades(currencyString,callback). The currency string is of the form "USDT-BTC" for example. Every exchange is different so it is important to note that the configuration of the currencystring input parameter changes form API to API for each respective exchange module. 

A note on currencies
Bittrex and Poloniex use USDT (Tether USD) which for trading purposes is essentially the same as USD. Coinbase however uses strait USD as they are an accredited exchange that is setup to send and recieve money between banks. For simplicity we will pass in USDT into the CoinBase module currencyString as well so that the user does not need to do too much research on how each individual exchange's API works. Again, each exchange has different trade configurations which you should be familiar with so if one currencyString to getTrades causes the callback function to return an error then you know that the entered configuration is not supported by that exchange.

