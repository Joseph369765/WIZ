const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'botinfo',
    description: 'Da informazioni sul bot!',
    execute(client,  message, args) {

        const numeroServer = client.guilds.cache.size;
        const numeroCanali = client.channels.cache.size;
        const numeroUtenti = client.guilds.cache.reduce((acc, val) => acc + val.memberCount, 0);

        const botinfo = new Discord.MessageEmbed()
            .setTitle('Informazioni sul bot')
            .setDescription(`Tag del bot **@${client.user.tag}**`)
            .setColor('YELLOW')
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .addField('Server', numeroServer, true)
            .addField('Canali', numeroCanali, true)
            .addField('Utenti', numeroUtenti, true)
            .addField('Uptime', ms(client.uptime), true)
            .addField('Node.js', process.version, true)
            .addField('Memoria Ram utilizzata', `${parseFloat(process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)} MB`, true)
            .setFooter(`ID: ${client.user.id}`)

        message.channel.send(botinfo);
   }
}