const array = [];
const config = require("../config.json");

module.exports = class closeTicket {
    async closeTicket(id, message, authorTag) {
        if (!array.includes(id)) {
            array.push(id);
            await message.channel.send({
                embed: {
                    "title": "Scarface City",
                    "description": "Dieses Ticket wurde von `" + authorTag + "` geschlossen und wird in 5 Sekunden gelöscht!",

                    "color": config.embeds.body.color,
                    "author": {
                        "name": config.embeds.author.name + " - Ticket System",
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

    renameTicket(message, authorTag, name) {
        message.channel.setName(name);
        message.channel.send({
            embed: {
                "title": "Scarface City",
                "description": "Dieses Ticket wurde von `" + authorTag + "` zu `" + name + "` umbenannt!",

                "color": config.embeds.body.color,
                "author": {
                    "name": config.embeds.author.name + " - Ticket System",
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