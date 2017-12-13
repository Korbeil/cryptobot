const https = require("https");

let CoinMarketCap = (function() {
    const base      = 'https://api.coinmarketcap.com/v1/';
    const ticker    = 'ticker/';

    let _config = null;

    /**********
     * PUBLIC *
     **********/
    const init = function(config) {
        _config = config;
    };
    const request = function (_method) {
        let url     = base + eval(_method);
        return _build(url)
    };

    /***********
     * PRIVATE *
     ***********/
    const _build = function(url) {
        return new Promise(function (resolve, reject) {
            https.get(url, res => {
                res.setEncoding("utf8");
                let body = "";
                res.on("data", data => {
                    body += data;
                });
                res.on("end", () => {
                    body = JSON.parse(body);
                    resolve(body);
                });
            });
        });
    };

    return {
        init: init,
        request: request
    };
})();

module.exports = CoinMarketCap;