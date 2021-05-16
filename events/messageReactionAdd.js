const config = require("../config.json");

module.exports = {
    event: "messageReactionAdd",
    once: false,

    async run(reaction, user) {

        if (user.partial) user.fetch();
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        if (user.bot) return;

        if (reaction.message.channel.id === config.ticketChannel) {
            if (reaction.message.name === config.ticketReasons.allgemein) {
                if (reaction.message.guild.channels.cache.get(config.ticketNames.allgemein.replace("{username}", user.name)) === undefined) {

                }
            }
        }
    }
}

function createTicket(reaction, user, parentID, supportRoleID, ticketName, ticketMessageTitle, ticketMessageText) {
    if (reaction.message.guild.channels.cache.get(config.ticketNames.allgemein.replace("{username}", user.name)) === undefined) {
        reaction.message.guild.channels.create('〔📩〕' + user.username, {
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: supportRoleID,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "MANAGE_MESSAGES"]
                }
            ],
            type: 'text',
            parent: parentID
        }).then(async channel => {

        });

        reaction.users.remove(user);
    }
}