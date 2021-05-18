const array = [];
const config = require("../config.json");
const logFunctions = require("../functions/logFunctions.js");

module.exports = class ticketFunctions {
    async closeTicket(id, message, authorTag) {
        if (!array.includes(id)) {
            array.push(id);
            await new logFunctions().sendLog(config.oxince.logs.ticket, "`" + authorTag + "` hat das Ticket `" + message.channel.name + "` geclosed!")
            await message.channel.send({
                embed: {
                    "title": "Scarface City - Ticket System",
                    "description": "Dieses Ticket wurde von `" + authorTag + "` geschlossen und wird in 5 Sekunden gelöscht!",

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

            setTimeout(() => {
                message.channel.delete();
                array.splice(array.indexOf(id), 1);
            }, 5000)
        }
    }

    async renameTicket(message, authorTag, name) {
        await message.channel.setName(name);
        await new logFunctions().sendLog(config.oxince.logs.ticketrenaming, "`" + authorTag + "` hat ein Ticket zu `" + name + "` umbenannt!")
        await message.channel.send({
            embed: {
                "title": "Scarface City - Ticket System",
                "description": "Dieses Ticket wurde von `" + authorTag + "` zu `" + name + "` umbenannt!",

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
    }
}