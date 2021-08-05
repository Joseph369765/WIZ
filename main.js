const fs = require('fs')
const Discord = require('discord.js');


const prefix = '.';



const client = new Discord.Client({
    partials: ['MESSAGE','CHANNEL', 'REACTION'],
    disableEveryone: true
}); 

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`I am now connected to discord with account: ${client.user.username}!`);

  

})

client.on('ready', () => {
    client.user.setActivity('Wings Of Freedom', { type: 'WATCHING' })
  })

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot ) return;



    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
     
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    const { cooldowns } = client;
    
    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const ora = Date.now();
    const timestamps = cooldowns.get(command.name);
    const tempoCooldown = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const tempoScadenza = timestamps.get(message.author.id) + tempoCooldown;

        if (ora < tempoScadenza) {
            const tempoRimanente = (tempoScadenza - ora) / 1000;
            return message.reply(`aspetta ${tempoRimanente.toFixed(1)} secondi/o prima di utilizzare ${command.name}.`)

            timestamps.set(message.author.id, ora);
            setTimeout(() => timestamps.delete(message.author.id), tempoCooldown);
        }
    }

    try {
       command.execute(client, message, args);

    } catch (error) {
        console.error(error);
        message.reply('C\'è stato un errore durante l\'esecuzione di questo comando!');
    }

})

const ticketEmbedAperto = new Discord.MessageEmbed()
.setTitle('🆘 Supporto/Segnalazione 🆘')
.setAuthor('WingsBot')
.setColor('WHITE')
.setDescription('Spiegaci il problema uno staffer sarà presto da te ad aiutarti')
.setColor('RED')

const ticketGiàAperto = new Discord.MessageEmbed()
.setAuthor('WingsBot')
.setColor('WHITE')
.setDescription('Hai già un ticket aperto')

const no_you_cant = new Discord.MessageEmbed()
.setAuthor('WingsBot')
.setColor('WHITE')
.setDescription('Non puoi utilizzare questo comando qui')

const invalid_user = new Discord.MessageEmbed()
.setAuthor('WingsBot')
.setColor('WHITE')
.setDescription('Inserire un utente valido')

const user_already_added = new Discord.MessageEmbed()
.setAuthor('WingsBot')
.setColor('WHITE')
.setDescription('Questo utente ha già accesso al ticket')

const user_already_removed = new Discord.MessageEmbed()
.setAuthor('WingsBot')
.setColor('WHITE')
.setDescription('Questo utente non ha già accesso al ticket')

const no_you_cant2 = new Discord.MessageEmbed()
.setAuthor('WingsBot')
.setColor('WHITE')
.setDescription('Non puoi rimuovere questo utente')

client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction._emoji.name == "🤝") { //Personalizzare l'emoji della reaction
        if (messageReaction.message.channel.id == '868498120214974464') { //Settare canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send({ embed: ticketGiàAperto }).catch(() => { })
                return
            }

            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent('870753547602518058') //Settare la categoria
                canale.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: "870256883502559303",
                        allow: ['VIEW_CHANNEL'] 
                    }
                        
                ])
                canale.send(new Discord.MessageEmbed ({ title: '🤝 Partnership 🤝', description: `${user} **Grazie per voler fare partneship con noi, adesso un Gestore Partnership l'aiuterà** `, color: `RED` }))  

            })
        }
    }
 })
 
 client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction._emoji.name == "📩") { //Personalizzare l'emoji della reaction
        if (messageReaction.message.channel.id == '868498120214974464') { //Settare canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send({ embed: ticketGiàAperto }).catch(() => { })
                return
            }

            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent('870753547602518058') //Settare la categoria
                canale.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: "855082910452809771",
                        allow: ['VIEW_CHANNEL'] 
                    },
                    {
                        id: "855083407725559838",
                        allow: ['VIEW_CHANNEL'] 
                    }
                ])
                canale.send(new Discord.MessageEmbed ({ title: '📩 Candidatura Staff 📩', description: `${user} **Grazie per aver aperto un ticket per la candidatura staffer __(QUESTO TICKET VIENE ASSISTITO DA STAFFER, UNA VOLTA FINITA LA CANDIDATURA LE FAREMO SAPERE SE È STATO ACCETTATO O RIFIUTATO)__**`, color: `RED` }))
            })
        }
    }
 })

 client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction._emoji.name == "🆘") { //Personalizzare l'emoji della reaction
        if (messageReaction.message.channel.id == '868498120214974464') { //Settare canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send({ embed: ticketGiàAperto }).catch(() => { })
                return
            }

            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent('870753547602518058') //Settare la categoria
                canale.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: "870256883502559303",
                        allow: ['VIEW_CHANNEL'] 
                    }
                ])
                canale.send({ embed: ticketEmbedAperto }).then(msg => msg.react('📢'))
            })
        }
    }
 })

client.on('messageReactionAdd', async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction._emoji.name === "📢") {
        if (messageReaction.message.channel.guild.channels.cache.find(canale => canale.topic === `User ID: ${user.id}`)) {
            messageReaction.users.remove(user)

            const ticketteam = messageReaction.message.guild.roles.cache.find(role => role.name === '🔖・Ticket team')
 

            messageReaction.message.channel.send(`||${ticketteam}||  ` + user.tag + ' Ha richiesto uno staffer che lo aiuti')
        }

    }
})


client.on("message", message => {
    if (message.content == ".close") {
        var topic = message.channel.topic;
        if (!topic) return message.channel.send(no_you_cant) 

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS") || message.member.roles.cache.has("864877413536497674")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send(no_you_cant)
        }
    }
})
  client.on('message', message => {
    if (message.content.startsWith(".add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send({ embed: no_you_cant });
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send({ embed: invalid_user });
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (haIlPermesso) {
                    message.channel.send({ embed: user_already_added })
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: true
                })

                message.channel.send(`${utente.toString()} è stat* aggiunt* al ticket`)
            }
        }
        else {
            message.channel.send({ embed: no_you_cant })
        }
    }
  })
    client.on('message', message => {
        if (message.content.startsWith(".remove")) {
            var topic = message.channel.topic;
            if (!topic) {
                message.channel.send({ embed: no_you_cant });
                return
            }
    
            if (topic.startsWith("User ID:")) {
                var idUtente = topic.slice(9);
                if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                    var utente = message.mentions.members.first();
                    if (!utente) {
                        message.channel.send({ invalid_user });
                        return
                    }
    
                    var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
    
                    if (!haIlPermesso) {
                        message.channel.send({ embed: user_already_removed })
                        return
                    }
    
                    if (utente.hasPermission("MANAGE_CHANNELS")) {
                        message.channel.send({ embed: no_you_cant2 })
                        return
                    }
    
                    message.channel.updateOverwrite(utente, {
                        VIEW_CHANNEL: false
                    })
    
                    message.channel.send(`${utente.toString()} è stat* rimoss* al ticket`)
                }
            }
            else {
                message.channel.send({ embed: no_you_cant })
            }
        }
     
    })
   

 
 client.login('ODcwNjkzNTY3ODEzODEyMjc2.YQQekw.z5xMU12KfGGCjZI0akcm7GFKrro');