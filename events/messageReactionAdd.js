const config = require("../config.json");
const array = [];

module.exports = {
    event: "messageReactionAdd",
    once: false,

    async run(reaction, user) {

        if (user.partial) user.fetch();
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        if (user.bot) return;

        if (reaction.message.channel.id === config.ticketChannel) {
            if (!array.includes(user.id)) {
                if (reaction.emoji.name === config.ticketReasons.allgemein) createTicket(reaction, user, config.ticketCategories.allgemein, config.ticketRoles.allgemein, config.ticketNames.allgemein.replace("username", user.username), "Allgemeines Anliegen")
                if (reaction.emoji.name === config.ticketReasons.entbannung) createTicket(reaction, user, config.ticketCategories.entbannung, config.ticketRoles.entbannung, config.ticketNames.entbannung.replace("username", user.username), "Entbannungs Anliegen")
                if (reaction.emoji.name === config.ticketReasons.fraktion) createTicket(reaction, user, config.ticketCategories.fraktion, config.ticketRoles.fraktion, config.ticketNames.fraktion.replace("username", user.username), "Fraktions Anliegen")
                if (reaction.emoji.name === config.ticketReasons.spenden) createTicket(reaction, user, config.ticketCategories.spenden, config.ticketRoles.spenden, config.ticketNames.spenden.replace("username", user.username), "Spenden Anliegen")
                if (reaction.emoji.name === config.ticketReasons.team) createTicket(reaction, user, config.ticketCategories.team, config.ticketRoles.team, config.ticketNames.team.replace("username", user.username), "Team Anliegen")
                if (reaction.emoji.name === config.ticketReasons.community) createTicket(reaction, user, config.ticketCategories.community, config.ticketRoles.community, config.ticketNames.community.replace("username", user.username), "Community Anliegen")
                if (reaction.emoji.name === config.ticketReasons.rueckerstattung) createTicket(reaction, user, config.ticketCategories.rueckerstattung, config.ticketRoles.rueckerstattung, config.ticketNames.rueckerstattung.replace("username", user.username), "Rückerstattungs Anliegen")

                array.push(user.id);
                setTimeout(() => {
                    array.splice(array.indexOf(user.id), 1);
                }, 60000)

                await reaction.users.remove(user);
            }
        }

        /*if (reaction.emoji.name === config.ticketReasons.closeTicket && reaction.message.channel.parentID === config.ticketCategories.allgemein ||
            reaction.message.channel.parentID === config.ticketCategories.entbannung ||
            reaction.message.channel.parentID === config.ticketCategories.fraktion ||
            reaction.message.channel.parentID === config.ticketCategories.spenden ||
            reaction.message.channel.parentID === config.ticketCategories.team ||
            reaction.message.channel.parentID === config.ticketCategories.community ||
            reaction.message.channel.parentID === config.ticketCategories.rueckerstattung) {

            await new ticketFunctions(reaction.message.channel.id, reaction.message, user.tag).closeTicket();
            await reaction.users.remove(user);
        }*/
    }
}

function createTicket(reaction, user, parentID, supportRoleID, ticketName, ticketMessageTitle) {
    if (!reaction.message.guild.channels.cache.find(channel => channel.name === ticketName)) {
        reaction.message.guild.channels.create(ticketName, {
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
            channel.send("<@" + user.id + ">", {
                embed: {
                    "title": ticketMessageTitle + " - Ticket System",
                    "description": "Bitte beschreibe uns schonmal dein Anliegen sodass wir dir schnellst möglichst helfen können!\n\nSollte sich dein Anliegen geklärt haben, sende eine Nachricht mit dem Inhalt `!close` in den Chat.",

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
            })
        });
    }
}