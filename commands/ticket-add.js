const config = require('../config.json')
const logFunctions = require("../functions/logFunctions.js");

module.exports = {
    name: 'add',

    execute: async function (message, args, Discord, client) {
        if (message.channel.parentID === config.ticketCategories.allgemein ||
            message.channel.parentID === config.ticketCategories.entbannung ||
            message.channel.parentID === config.ticketCategories.fraktion ||
            message.channel.parentID === config.ticketCategories.spenden ||
            message.channel.parentID === config.ticketCategories.team ||
            message.channel.parentID === config.ticketCategories.community ||
            message.channel.parentID === config.ticketCategories.rueckerstattung) {

            if (args.length === 0) {
                await message.channel.send({
                    embed: {
                        "title": "Scarface City - Moderation",
                        "description": "Bitte verwende `" + config.prefix + "add ID` um einen User hinzu zu fügen!",

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
            } else {
                await message.channel.edit({
                    permissionOverwrites: [
                        {
                            id: args[1],
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        }
                    ]
                }).then(() => {
                    new logFunctions().sendLog(config.oxince.logs.ticketadd, "`" + message.member.username + " hat `" + args[1] + "` zu dem Ticket namens `" + message.channel.name + "` hinzugefügt!")
                    message.channel.send({
                        embed: {
                            "title": "Scarface City - Moderation",
                            "description": "`<@" + message.member.id + "> hat <@" + args[1] + ">` zum Ticket hinzugefügt!",

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
                }).catch(() => {
                    message.channel.send({
                        embed: {
                            "title": "Scarface City - Moderation",
                            "description": "Bitte verwende `" + config.prefix + "add ID` um einen User hinzu zu fügen!",

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
                })
            }
        }
    }
}