const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'suggest',
    description: 'Fai un suggerimento',
    execute(client, message, args) {
        const canaleSuggerimenti = message.guild.channels.cache.get(config.canali.suggerimenti);

        if(!canaleSuggerimenti) return message.reply('Canale dei suggerimenti non trovato!');

        const embedSuggerimento = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(args.join(' '))
        .setTimestamp()
        .setColor('1f11ca');

        canaleSuggerimenti.send({ embed: embedSuggerimento }).then(msgEmbed => {
            msgEmbed.react('☑');
            msgEmbed.react('💩');

            message.reply('Grazie, Il tuo suggerimento è stato inviato').then(msgConferma => {
                msgConferma.delete({ timeout: 5000 });
                message.delete({ timeout: 5000 });
            })
        })
    }
}