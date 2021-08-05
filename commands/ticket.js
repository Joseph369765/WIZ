const Discord = require('discord.js');
const config = require('../config.json')

module.exports = {
    name: 'ticket',
    description: 'Ticket assistenza',
    async execute(client, message, args) {

       canaleTicket.updateOverwrite(message.guil.id, {
           VIEW_CHANNEL: false,
           SEND_MESSAGES: false
       })

       canaleTicket.updateOverwrite(message.author, {
           VIEW_CHANNEL: true,
           SEND_MESSAGES: true
       })

       await messaggioTicket.react('🗑');
 
       const filtro = (reaction, user) => {
           return message.guild.members.cache.get(user.id).hasPermission('ADMINISTRATOR');
       }   

        const collector = messaggioTicket.createReactionCollector(filtro, {dispose: true});

        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === '🗑') {
                canaleTicket.send('Questo canale verrà cancellato tra 3 secondi')
                setTimeout(() => canaleTicket.delete(), 3000);
            }
        })

        const canaleTicket = await message.guild.channels.create(`Ticket ${message.author.tag}`);
        const ticketEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setAuthor('WingsBot!')
        .setTitle('TICKET')
        .setThumbnail('https://cdn.discordapp.com/attachments/869970882544693338/870694929037393920/tbu8npeguny31.jpg')
         .addFields(
            { name: 'Richiesta Partner', value: '*clicca* 🤝', inline: true },
            { name: 'Candidatura', value: '*clicca* 📩', inline: true },
            { name: 'Supporto/Segnalazione', value: '*clicca* 🆘 ', inline: true },
        )
        .setFooter('WingsBot - Ticket system', 'https://i.imgur.com/llbooBp.jpeg')
        .setTimestamp()

        client.channels.cache.get(config.ticket).send({ embed: ticketEmbed }).then(message => {
            message.react('🤝');
            message.react('📩');
            message.react('🆘');
        })
    }
}