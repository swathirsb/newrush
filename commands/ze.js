const Discord = require('discord.js');
const Gamedig = require('gamedig');
const { prefix } = require('../config.json')

module.exports = {
    name: 'nd',
    description: 'Information about the Neverdie server!.',
    aliases: ['ze'],
    usage: `${prefix}ze`,
    category: 'C.s 1.6',
    execute(client, message, args) {

        Gamedig.query({type: 'cs16',host: '139.59.90.127', port: '40000'}).then((state) =>{
            var players = state.players.map(player => player.name)
            const embed = new Discord.MessageEmbed()
                .setTitle(`${state.name}`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor('RANDOM')
                .addField("**__ServerInfo__**", [
                    `**❯ Server IP:** ${state.connect}`,
                    `**❯ Current Map:** ${state.map}`,
                    `**❯ Current Online Players:** ${state.players.length} /\ ${state.maxplayers}`,
                    `\u200b`,
                ])
                .addField(`❯ Current Online Players names [${players.length - 0}]`, players.length < 32 ? players.join("\n ") : players.length > 0 ? client.trimArray(players) : 'None')
                .setTimestamp()
            message.channel.send(embed)
        }).catch(error => {
            if(error) return message.channel.send(`server is offline`)
        })
    }
};