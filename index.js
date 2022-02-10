const { Client, Intents } = require('discord.js');
const keepAlive = require("./server");
const { DisTube } = require('distube');

//teksty odpowiedzi
const replies = require("./Commands/replies");
const help = require("./Commands/help");
const dj = require("./Commands/dj");
const music = require("./Commands/music")

//komendy
const deleteMessages = require("./Commands/delete");
const clearBot = require("./Commands/clearbot");
const getBuild = require("./Commands/build");
const roll = require("./Commands/roll");
const getGif = require("./Commands/gif");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES] });

const distube = new DisTube(client,{
  searchSongs: 0,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  emptyCooldown: 20,
  youtubeDL: false,
  updateYouTubeDL: false
})

distube.on('error', (channel, error) => {
    console.error(error)
    channel.send(`An error encoutered: ${error.slice(0, 1979)}`)
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus('online');
  client.user.setActivity('$help / $h', {type:"LISTENING"});
})

client.on("messageCreate",async (msg) => {
  if(!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);

  const command = args.shift().toLowerCase();

  //console.log("COMMAND: "+ command + "\nARGS: " + args.toString())

  switch(command){
    case "dj":
      msg.channel.send(dj);
    break;

    case "muzyka":
    case "m":
      msg.channel.send(music);
    break;

    case "play":
      case "p":
      if(args.length === 0)
      {
        msg.reply("Podaj link do piosenki lub słowa do wyszukania!");
      }
      else
      {
        const voiceChannel = msg.member.voice.channel;
        if(voiceChannel)
        {
          distube.play(voiceChannel, args.join(' '));
          msg.reply(`Dodano ${args.join(' ')} do kolejki!`);
        }
        else
          msg.channel.send("Dołącz do kanału głosowego!");
      }
    break;

    case "stop":
      case "st":
      if(distube.voices.get(msg))
      {
        const queue2Stop = distube.getQueue(msg)
        if(queue2Stop)
        {
          await distube.stop(msg);
          msg.channel.send("Koniec muzyki!");
        }
        else
        {
          await distube.voices.get(msg)?.leave();
          msg.channel.send("Opuszczanie kanału głosowego!");
        }
      }
      else
      {
        msg.reply("Brak kolejki do zatrzymania.");
      }
    break;

    case "pause":
      if(distube.voices.get(msg))
      {
        await distube.pause(msg);
        msg.channel.send("Zatrzymano muzykę!");
      }
      else
      {
        msg.reply("Brak piosenek do zatrzymania!");
      }
    break;

    case "resume":
      case "res":
      if(distube.voices.get(msg))
      {
        await distube.resume(msg);
        msg.channel.send("Wznowiono muzykę!");
      }
      else
      {
        msg.reply("Brak piosenek do wznowinia!");
      }
    break;

    case "skip":
      case "s":
      if(distube.voices.get(msg)){
        const queue2Skip = distube.getQueue(msg);
        if(queue2Skip.songs.length >1)
          await distube.skip(msg);
        else
          await distube.stop(msg);
      }
      else
      {
        msg.reply("Brak piosenek do pominięcia!");
      }
    break;

    case "queue":
      case "q":
      const queue = distube.getQueue(msg)
        if (!queue) {
            msg.channel.send('Pusta kolejka!')
        } else {
            msg.channel.send(
                `**Kolejka**:\n${queue.songs
                    .map(
                        (song, id) =>
                            `**${id ? id : 'Aktualnie grane'}**: ${
                                song.name
                            } - \`${song.formattedDuration}\``,
                    )
                    .slice(0, 10)
                    .join('\n')}`,
            )
        }
    break;

    case "disconnect":
      case"dc":
      if(distube.voices.get(msg)){
        distube.voices.get(msg).leave();
      msg.channel.send("Opuszczanie kanału głosowego!");
      }
    break;
      
    case "gaming":
      case "g":
      msg.channel.send(`${process.env.GAMING_LIST} gramy coś?`);
    break;

    case "kalambury":
      case "k":
      msg.channel.send("Strona do kalamburów - https://skribbl.io/")
    break;

    case "build":
      case "b":
      getBuild(args,msg)
    break;

    case "pb":
      msg.channel.send({files:["./Resources/pbWelcome.png"]})
    break;

    case "roll":
      case "r":
      roll(args,msg);
    break;

    case "gif":
    getGif(args,msg);
    break;

    case "delete":
      case "d":
      deleteMessages(args, msg);
    break;

    case "clearbot":
      case "cb":
      clearBot(msg);
    break;

    case "help":
      case "h":
      msg.channel.send(help);
    break;

    default:
      const index = Math.floor((Math.random() * replies.length))
      msg.channel.send(replies[index])
    break;
  }
})

keepAlive();
client.login(process.env.TOKEN);