const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'da le informazioni su un utente',
    cooldown: 2,
    execute(client, message, args) {
if (message.content.startsWith(".userinfo")) {
    if (message.content == ".userinfo") {
        var utente = message.member;
    }
    else {
        var utente = message.mentions.members.first();
    }

    if (!utente) {
        message.channel.send("Non ho trovato questo utente")
        return
    }

    var elencoPermessi = "";
    if (utente.hasPermission("ADMINISTRATOR")) {
        elencoPermessi = "👑 AMMINISTRATORE";
    }
    else {
        var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

        for (var i = 0; i < permessi.length; i++) {
            if (utente.hasPermission(permessi[i])) {
                elencoPermessi += "- " + permessi[i] + "\r";
            }
        }
    }

    var embed = new Discord.MessageEmbed()
        .setTitle(utente.user.tag)
        .setDescription("**TUTTE LE INFORMAZIONI DI QUEST'UTENTE**")
        .setThumbnail(utente.user.avatarURL())
        .addField("Utente", "```" + utente.user.id + "```", true)
        .addField("Stato", "```" + utente.user.presence.status + "```", true)
        .addField("È un bot?", utente.user.bot ? "```Si```" : "```No```", true)
        .addField("Account creato il ", "```" + utente.user.createdAt.toDateString() + "```", true)
        .addField("Entrato nel server", "```" + utente.joinedAt.toDateString() + "```", true)
        .addField("Permessi", "```" + elencoPermessi + "```", false)
        .addField("Ruoli", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)

    message.channel.send(embed)
 
   }
  }
}