const CoinMarketCap = require("./coinmarketcap.js");

let Commands = (function() {
    let _config = null;

    /**********
     * PUBLIC *
     **********/
    const init = function(config) {
        _config = config;
    };
    const parse = function(msg) {
        let command = _command(msg);

        if (command === 'ticker') {
            CoinMarketCap.init(_config);
            CoinMarketCap.request('ticker').then(function(data) {
                let limit = _config['ticker']['limit'];

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
        }
    };

    /***********
     * PRIVATE *
     ***********/
    const _command = function(msg) {
        let split = msg.content.split(' ');
        let first = split[0];

        if(_config['prefix'] === first[0]) {
            return first.substr(1, first.length - 1);
        }
        return false;
    };

    return {
        init: init,
        parse: parse
    };
})();

module.exports = Commands;