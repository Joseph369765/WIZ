const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'tempban',
    /**
     * @param {Message} message
     */
    execute(client, message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Non hai il permesso per eseguire questo comando.')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.reply('Membro non trovato.')
        if(!time) return message.reply('Per favore specifica il tempo.')
        Member.ban()
        message.channel.send(`${Member.displayName} è stato temporaneamente bannato.`)

        setTimeout(async () => {
            await message.guild.members.unban(Member.id)
            message.channel.send(`${Member.displayName} è stato sbannato`)
        }, ms(time))
    }
}