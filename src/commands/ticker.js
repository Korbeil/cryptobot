const CoinMarketCap = require("./../coinmarketcap.js");

module.exports = function (config, msg) {
    CoinMarketCap.init(config);
    CoinMarketCap.request('ticker/').then(function(data) {
        let limit = config['ticker']['limit'];

        let date = new Date(data[0].last_updated * 1000);
        let message = 'Last update: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getYear() + ' ' + date.getHours() + 'h' + date.getMinutes() + 'min' + date.getSeconds() + 's ' + '\n';

        for (let i = 0; i < limit; i++) {
            let crypto = data[i];
            message = message + crypto.name + ' [' + crypto.symbol + '] - ' + crypto.price_usd + '$';
            message = message + ' (' + crypto.percent_change_1h + '% / ' + crypto.percent_change_24h + '% / ' + crypto.percent_change_7d + '%)';
            message = message + '\n';
        }
        msg.channel.send(message);
    });
};