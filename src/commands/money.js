const CoinMarketCap = require("./../coinmarketcap.js");

function in_array(needle, haystack) {
    return (haystack.indexOf(needle) > -1);
}

module.exports = function (command, config, msg) {
    const mapping = {
        "BTC": "bitcoin",
        "ETH": "ethereum",
        "BCH": "bitcoin-cash",
        "XRP": "ripple",
        "LTC": "litecoin",
        "IOTA": "iota",
        "DASH": "dash",
        "XMR": "monero",
        "XEM": "nem",
        "BTG": "bitcoin-gold",
        "ADA": "cardano",
        "EOS": "eos",
        "ETC": "ethereum-classic",
        "NEO": "neo",
        "XLM": "stellar",
        "BCC": "bitconnect",
        "PPT": "populous",
        "WAVES": "waves",
        "QTUM": "qtum",
        "ZEC": "zcash",
        "LSK": "lisk",
        "VTC": "vertcoin",
        "ARK": "ark"
    };

    const available = [
        "bitcoin",
        "ethereum",
        "bitcoin-cash",
        "ripple",
        "litecoin",
        "iota",
        "dash",
        "monero",
        "nem",
        "bitcoin-gold",
        "cardano",
        "eos",
        "ethereum-classic",
        "neo",
        "stellar",
        "bitconnect",
        "populous",
        "waves",
        "qtum",
        "zcash",
        "lisk",
        "vertcoin",
        "ark"
    ];

    // if command not in available
    if(!in_array(command, available)) {
        // if command is in mapping
        if(!(command in mapping)) {
            return false;
        }

        command = mapping[command];
    }

    // coinmarketcap query
    CoinMarketCap.init(config);
    CoinMarketCap.request('ticker/' + command + '/').then(function(data) {
        let crypto = data[0];
        let price = 'crypto.price_' + config['currency'].toLowerCase();

        let change_1h = crypto.percent_change_1h;
        let change_24h = crypto.percent_change_24h;
        let change_7d = crypto.percent_change_7d;

        if(change_1h.charAt(0) !== '-') {
            change_1h = '+' + change_1h;
        }
        if(change_24h.charAt(0) !== '-') {
            change_24h = '+' + change_24h;
        }
        if(change_7d.charAt(0) !== '-') {
            change_7d = '+' + change_7d;
        }

        const embed = {
            "color": 13843783,
            "timestamp": "2017-12-13T08:39:30.980Z",
            "author": {
                "name": crypto.symbol,
                "url": "https://coinmarketcap.com/currencies/" + crypto.id + "/",
                "icon_url": "https://coinmarketcap.com/favicon.ico"
            },
            "fields": [
                {
                    "name": "Value (" + config['currency'] + ")",
                    "value": eval(price) + '€',
                    "inline": true
                },
                {
                    "name": "1h diff",
                    "value": change_1h + '%',
                    "inline": true
                },
                {
                    "name": "24h diff",
                    "value": change_24h + '%',
                    "inline": true
                },
                {
                    "name": "7d change",
                    "value": change_7d + '%',
                    "inline": true
                }
            ]
        };
        msg.channel.send({ embed });
    });
};