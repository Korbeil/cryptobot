const ticker = require('./commands/ticker');
const money = require('./commands/money');

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
            ticker(_config, msg);
        }
        money(command, _config, msg);
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