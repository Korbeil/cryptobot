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

        let message = crypto.symbol + ' # ' + eval(price) + '€';
        message = message + ' (' + crypto.percent_change_1h + '% / ' + crypto.percent_change_24h + '% / ' + crypto.percent_change_7d + '%)';
        message = message + '\n';
        msg.channel.send(message);
    });
};