const Discord = require('discord.js');
const Gamedig = require('gamedig');
const { prefix } = require('../config.json');

module.exports = {
    name: 'kz',
    description: 'Information about the Neverdie server!.',
    aliases: ['bhop'],
    usage: `${prefix}kz`,
    category: 'C.s 1.6',
    execute(client, message, args) {
        Gamedig.query({
            type: 'cs16',
            host: '139.59.6.235',
            port: '27035',
            }).then(state => {
            let serverName = state.name;
            let arrg = [];
            let arrg2 = [];
            arrg.push(...state.players);
            for (let i=0; i < arrg.length; i++) {
                arrg2.push(arrg[i].name);
            }
            let serverMsg = new Discord.MessageEmbed()
            .setColor('#4A00E0')
            .setTitle(serverName)
            .setThumbnail(client.user.displayAvatarURL())
            .addField('Current map', state.map)
            .addField(`Steam Connect`, `steam://connect/${state.connect}`)
            .addField(`Players online`, `${arrg2.length}/${maxPlayers}`, false)

            message.channel.send(serverMsg)}).catch((error) => {
            if (error) {
                message.channel.send(`The server seems to be offline or its changing the map`)
                .then(m => {
                    m.delete({timeout: 10000});
                })
            }
        });
    }
}