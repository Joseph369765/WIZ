const Discord = require("discord.js")

module.exports = {
    name: 'serverinfo',
    description: 'da le informazioni sul server',
    execute(client, message, args) {        
        if (message.content == ";serverinfo") {
            var server = message.member.guild;
    
            var botCount = server.members.cache.filter(member => member.user.bot).size;
            var utentiCount = server.memberCount - botCount;
    
            var categoryCount = server.channels.cache.filter(c => c.type == "categoria").size
            var textCount = server.channels.cache.filter(c => c.type == "testo").size
            var voiceCount = server.channels.cache.filter(c => c.type == "voce").size
    
            var embed = new Discord.MessageEmbed()
                .setTitle(server.name)
                .setDescription("Tutte le info su questo server")
                .setThumbnail(server.iconURL())
                .addField("Founder", "```" + server.owner.user.username + "```", true)
                .addField("Server id", "```" + server.id + "```", true)
                .addField("Regione del server", "```" + server.region + "```", true)
                .addField("Memberi", "```Totali: " + server.memberCount + " - Membri: " + utentiCount + " - Bot: " + botCount + "```", false)
                .addField("Canali", "```Categoria: " + categoryCount + " - Testo: " + textCount + " - Vocale: " + voiceCount + "```", false)
                .addField("Server creato il", "```" + server.createdAt.toDateString() + "```", true)
                .addField("Boost level", "```Livello " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")```", true)
    
            message.channel.send(embed) 
        }
    }
}