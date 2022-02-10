var axios = require('axios');

function getGif(args, msg){
  if(args.length > 0){
  const keywords = args.join(' ');
  let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&limit=10`;
  axios.get(url).then(res => {
      let index = Math.floor(Math.random()*res.data.results.length)
      msg.channel.send(res.data.results[index].url)
    });
  }
  else
  {
    msg.reply("Nie podano hasła do wyszukania!");
  }
}

module.exports = getGif