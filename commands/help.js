const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    category: 'Utilities',
    execute(client, message, args) {
        const { commands } = message.client;

        if (!args.length) {
            const embed = new Discord.MessageEmbed()
                .setTitle('Command List')
                .setDescription(`Use \`${prefix}help [command name]\` to get info of a specific command\n\`<arg>\` is a required argument, \`[arg]\` is a optional argument`)
                .setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            commands.forEach(command => {
                const category = command.category ? command.category : 'Commands';
                const field = embed.fields.find(field => field.name === `❯ ${category}`);
                if (!field) embed.addField(`❯ ${category}`, `\`${command.name}\` `, true);
                else field.value += `\`${command.name}\` `;
            });

            return message.channel.send(embed);
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(command.name)
            .setDescription(`\`<arg>\` is a required argument, \`[arg]\` is a optional argument`)
            .setColor(0x9b59b6);

        if (command.aliases) embed.addField('❯ Aliases', `${command.aliases.join(', ')}`);
        if (command.description) embed.addField('❯ Description', `${command.description}`);
        if (command.usage) embed.addField('❯ Usage', `${prefix}${command.name} ${command.usage}`);
        if (command.category) embed.addField('❯ Category', `${command.category}`);
        embed.addField('❯ Cooldown', `${command.cooldown || 3} second(s)`);
        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
		embed.setTimestamp();

        message.channel.send(embed);
    },
};