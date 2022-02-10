function roll(args, msg){
  if(args.length===1)
    {
      if(isNaN(args[0]))
      {
        msg.reply("Podaj właściwą liczbę");
      }
      else
      {
        if(parseInt(args[0]) < 6)
        msg.channel.send("Podaj większą liczbę!")
      else
      {
        const roll = Math.floor((Math.random())*(parseInt(args[0])))+1;
        msg.channel.send(`Wylosowano ${roll}`)
      }
      }
    }
    else
    {
      const result = Math.floor((Math.random())*(6))+1;
      msg.channel.send(`Wylosowano ${result}`)
    }
}
module.exports = roll;