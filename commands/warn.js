const Discord = require("discord.js")


module.exports = {    
    name: 'warn',
    description: 'warna gli utenti!',
    execute(client, message, args) { 
        const warn1 = message.guild.roles.cache.find(role => role.name === '✯⛔Warn.Lvl:1✯')
        const warn2 = message.guild.roles.cache.find(role => role.name === '✯⛔Warn.Lvl:2✯')
        const warn3 = message.guild.roles.cache.find(role => role.name === '✯⛔Warn.Lvl:3✯')
        const warn4 = message.guild.roles.cache.find(role => role.name === '✯⛔Warn.Lvl:4✯')
        const warn5 = message.guild.roles.cache.find(role => role.name === '✯⛔Warn.Lvl:5✯')

        const motivo = args.slice(1).join(' ');

        const target = message.mentions.members.first();
        const author = message.member

        if (!target) {
            return message.reply('Devi menzionare un utente da warnare').then(msg => {
                msg.delete({ timeout: 5000 }),
                msg.delete({ timeout: 5000 })
            })
        }

        if (target === author) {
            return message.reply('non puoi warnare te stesso').then(msg => {
                msg.delete({ timeout: 10000 }),
                msg.delete({ timeout: 10000 })
            })
        }

        if (target.roles.cache.has('862307612170518528')) {
            target.roles.remove(warn1)
            target.roles.add(warn2)
            return message.channel.send(`L\'utente è stato warnato per la seconda volta per ${motivo}`)
        }

        if (target.roles.cache.has('862307727639707648')) {
            target.roles.remove(warn2)
            target.roles.add(warn3)
            return message.channel.send(`L\'utente è stato warnato per la terza volta per ${motivo}`)
        }

        if (target.roles.cache.has('870788405036998687')) {
            target.roles.remove(warn3)
            target.roles.add(warn4)
            return message.channel.send(`L\'utente è stato warnato per la quarta volta per ${motivo}`)
        }

        if (target.roles.cache.has('870795446459723806')) {
            target.roles.remove(warn4)
            target.roles.add(warn5)
            return message.channel.send(`L\'utente è stato warnato per la quinta volta per ${motivo}`)
        }

        if (target.roles.cache.has('870795446459723806')) {
            return message.reply('L\'utente menzionato è già warnato per 5 volte. Se desideri mutarlo fai .mute [utente] [motivo]')
        }

        target.roles.add(warn1)
        message.channel.send(`${target} è stato warnato per ${motivo}`)

    }
}