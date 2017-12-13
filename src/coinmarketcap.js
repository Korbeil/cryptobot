const https = require("https");

let CoinMarketCap = (function() {
    const __base    = 'https://api.coinmarketcap.com/v1/';
    let __config    = null;

    /**********
     * PUBLIC *
     **********/
    const init = function(config) {
        __config = config;
    };
    const request = function (method) {
        let url     = __base + method + '?convert=' + __config['currency'];
        return _build(url);
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