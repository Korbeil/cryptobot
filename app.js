const Discord = require("discord.js");
const config = require("./config.json");
const Commands = require('./src/commands');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    Commands.init(config);
    Commands.parse(msg);
});

client.login(config['token']);