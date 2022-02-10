const {Permissions } = require('discord.js');
async function deleteMessages(args, msg){
  if(args.length === 0)
    {
      msg.reply("Podaj liczbę wiadomości do usunięcia!")
    }
    else if(isNaN(args[0]) || args[0] < 1 || args[0] > 20 || args.length > 1)
    {
      msg.reply("Podaj właściwą liczbę (w przedziale 1-20)")
    }
    else if(!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
    {
      msg.reply("Nie masz na to uprawnień!")
    }
    else
    {
      const numOfMessages = parseInt(args[0]) + 1
      await msg.channel.messages.fetch({limit: numOfMessages}).then(messages => msg.channel.bulkDelete(messages)).then(msg.channel.send(`Usunięto ${args[0]} wiadomości!`))
    }
}

module.exports = deleteMessages