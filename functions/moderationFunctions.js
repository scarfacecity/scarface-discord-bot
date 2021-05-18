const Discord = require('discord.js');
const config = require("../config.json");
const logFunctions = require("../functions/logFunctions.js")

module.exports = class moderationFunctions {
    async kickUser(user, target, channel) {
        if (user.hasPermission("KICK_MEMBERS")) {
            await new logFunctions().sendLog(config.oxince.logs.kick, ":warning: " + target.username + " wurde von " + user.username + " gebannt !")
            target.kick().then((member) => {
                channel.send({
                    embed: {
                        "title": "Scarface City - Moderation",
                        "description": ":warning: <@" + member.id + "> wurde von <@" + user.id + "> gekickt!",

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
                            "url": "https://i.imgur.com/QXT4S0K.png"
                        }
                    }
                })
            }).catch(() => {
                channel.send("Ich besitze keine Kick Rechte!");
            });
        }
    }

    async banUser(user, target, channel) {
        if (user.hasPermission("BAN_MEMBERS")) {
            await new logFunctions().sendLog(config.oxince.logs.ban, ":warning: " + target.username + " wurde von " + user.username + " gebannt !")
            target.ban().then((member) => {
                channel.send({
                    embed: {
                        "title": "Scarface City - Moderation",
                        "description": ":warning: <@" + member.id + "> wurde von <@" + user.id + "> gebannt !",

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
                            "url": "https://i.imgur.com/QXT4S0K.png"
                        }
                    }
                })
            }).catch(() => {
                channel.send("Ich besitze keine Kick Rechte!");
            });
        }
    }
}