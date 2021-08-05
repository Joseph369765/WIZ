const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'ban',
    description: 'Banna un utente dal server',
    execute(client, message, args) {
        const author = message.member;
        const target = message.mentions.members.first();
        const motivo = args.slice(1).join(' ');

        if (!author.hasPermission('BAN__MEMBERS')) {
            return message.reply('Non hai il permesso per eseguire questo comando.').then(msg => msg.delete({ timeout: 3000 }));
        }
        if (target === author) {
            return message.reply('Non puoi bannare te stesso').then(msg => msg.delete({ timeout: 3000 }));
        }

        if (!target) {
            return message.reply('Devi specifcare un utente da bannare.').then(msg => msg.delete({ timeout: 3000 }));
        }

        if (motivo.length === 0 ) {
            return message.reply('Devi specficare un motivo per il ban').then(msg => msg.delete({ timeout: 3000 }));
        }

        if (!message.guild.members.cache.get(target.id).bannable) {
            return message.reply('Non puoi bannare questo utente').then(msg => msg.delete({ timeout: 3000 }));
        }

        const banEmbed = new Discord.MessageEmbed()
          .setAuthor('Ban', author.user.displayAvatarURL())
          .setDescription(`**Moderatore:** ${author.user.tag} (${author.id}) \n**Utente** ${target.user.tag} (${target.id}) \n**Motivo:** ${motivo}`)
          .setTimestamp()
          .setColor('RED')

        target.ban({ reason: motivo})

        message.channel.send(`L'utente **${target.user.tag}** è stato bannato da **${author.user.tag}** per **${motivo}**.`).then(msg => msg.delete({ timeout: 9000 }));

        client.channels.cache.get(config.canali.mod).send({ embed: banEmbed });
    }
}