process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});

const Discord = require('discord.js');
const fs = require('fs');

const config = require('./config.json');
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    console.log(file + " has been successfully loaded!");
    client.commands.set(command.name, command);
}

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const once = eventFunction.once;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args));
            console.log(file + " successfully loaded!");
        } catch (error) {
            console.error(error.stack);
        }
    });
});

client.on('ready', () => {
    if (config.activity.type !== "STREAMING") {
        client.user.setActivity({
            type: config.activity.type,
            name: config.activity.name
        })
    } else {
        client.user.setActivity({
            type: config.activity.type,
            name: config.activity.name,
            url: config.activity.streamURL
        })

    }
})

client.on('message', message => {
    if (message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(config.prefix)) return;

    if (command === 'ticket') {
        client.commands.get('ticket').execute(message, args, Discord, client);
    }
})

client.login(config.token);