const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'tempmute',
    /**
     * @param {Message} message
     */
    execute(client, message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Non hai il permesso per eseguire questo comando.')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const motivo = args.slice(1).join(' ');
        const time = args[1]
        if(!Member) return message.channel.send('Membro non trovato.')
        if(!time) return message.channel.send('Per favore specificare il tempo.')
        let role = message.guild.roles.cache.find(r => r.name === '🔇 • Mutato')
        if(Member.roles.cache.has(role.id)) return message.channel.send(`${Member.displayName} è già stato mutato.`)
        Member.roles.add(role)
        message.channel.send(`${Member.displayName} è stato mutato per ${motivo}.`)

        setTimeout(async () => {
            await Member.roles.remove(role)
            message.channel.send(`${Member.displayName} è ora smutato`)
        }, ms(time))
    }
}