function removeForbiddenCharacters(input) {
  let forbiddenChars = ['/', '?', '&','=','.',"'", ' ']
  for (let char of forbiddenChars){
      input = input.split(char).join('');
  }
  return input
}

function getBuild(args, msg){
  if(args.length === 1)
    {
      let champ = removeForbiddenCharacters(args[0])
      msg.channel.send(`Build do postaci ${args[0]} - https://eune.op.gg/champions/${champ}`)
    }
    else if (args.length === 2)
    {
      let champ = removeForbiddenCharacters(args[0] + args[1]).toLowerCase()
      msg.channel.send(`Build do postaci ${args[0]} ${args[1]} - https://eune.op.gg/champions/${champ}`)
    }
    else
    {
      msg.reply("Podano złą nazwę postaci!")
    }
}
module.exports = getBuild