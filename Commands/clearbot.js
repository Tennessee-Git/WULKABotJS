async function clearBot(msg){
  await msg.channel.messages.fetch({ limit: 25 }).then(messages => {
    messages.forEach(message => {
      if(message.author.bot && message.author.id ==="938857682549481473"){
        message.delete()
      }})
      });
}

module.exports = clearBot