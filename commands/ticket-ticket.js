module.exports = {
    name: 'ticket',

    execute: async function (message, args, Discord, client) {
        const config = require("../config.json");

        if (args.length === 0) {
            if (message.member.hasPermission("ADMINISTRATOR") || message.member.id === "796088860253356082") {
                await message.channel.send({
                    embed: {
                        "title": "Reagiere mit ...",
                        "description": config.ticketReasons.allgemein + " um ein Ticket für ein Allgemeines Anliegen zu erstellen.\n" +
                            config.ticketReasons.entbannung + " um ein Ticket für ein Entbannungs Anliegen zu erstellen.\n" +
                            config.ticketReasons.fraktion + " um ein Ticket für ein Fraktions Anliegen zu erstellen.\n" +
                            config.ticketReasons.spenden + " um ein Ticket für ein Spenden Anliegen zu erstellen.\n" +
                            config.ticketReasons.team + " um ein Ticket für ein Team Anliegen zu erstellen.\n" +
                            config.ticketReasons.community + " um ein Ticket für ein Community Anliegen zu erstellen.\n" +
                            config.ticketReasons.rueckerstattung + " um ein Ticket für ein Rückerstattungs Anliegen zu erstellen.\n",

                        "color": config.embeds.body.color,
                        "author": {
                            "name": config.embeds.author.name,
                            "url": config.embeds.author.url,
                            "icon_url": config.embeds.author.icon
                        },
                        "footer": {
                            "text": config.embeds.footer.text,
                            "icon_url": config.embeds.footer.icon
                        },
                        "timestamp": Date.now(),
                        "thumbnail": {
                            "url": config.embeds.body.thumbnail
                        }
                    }
                }).then(message => {
                    message.react(config.ticketReasons.allgemein);
                    message.react(config.ticketReasons.entbannung);
                    message.react(config.ticketReasons.fraktion);
                    message.react(config.ticketReasons.spenden);
                    message.react(config.ticketReasons.team);
                    message.react(config.ticketReasons.community);
                    message.react(config.ticketReasons.rueckerstattung);
                });
                message.delete();
            }
        }
    }
}