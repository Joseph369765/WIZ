const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'unban',
    description: 'sbanna le persone dal server',
    execute(client, message, args) {
        const author = message.member;
        const target = args[0];
        const motivo = args.slice(1).join(' ');

        if (!author.hasPermission('BAN__MEMBERS')) {
            return message.reply('Non hai il permesso per eseguire questo comando.').then(msg => msg.delete({ timeout: 3000 }));
        }
     
        if (!target) {
            return message.reply('Devi specifcare un utente da sbannare.').then(msg => msg.delete({ timeout: 3000 }));
        }

        if (motivo.length === 0 ) {
            return message.reply('Devi specficare un motivo per lo sban').then(msg => msg.delete({ timeout: 3000 }));
        }

        const unbanEmbed = new Discord.MessageEmbed()
          .setAuthor('Unban', author.user.displayAvatarURL())
          .setDescription(`**Moderatore:** ${author.user.tag} (${author.id}) \n**Utente**  (${target}) \n**Motivo:** ${motivo}`)
          .setTimestamp()
          .setColor('GREEN')

         message.guild.members.unban(target).then(() => {
            message.channel.send(`L'utente **${target}** è stato sbannato da **${author.user.tag}** per **${motivo}**.`).then(msg => msg.delete({ timeout: 9000 }));

            client.channels.cache.get(config.canali.mod).send({ embed: unbanEmbed });
         }).catch(() => {
             return message.reply('Questo utente non è bannato');
         });
 
    }
}
    