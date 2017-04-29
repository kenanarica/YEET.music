var randomcolor = require("randomcolor")
const Discord = require("discord.js");
const yt = require('ytdl-core');
const client = new Discord.Client();
var queue = new Array();
var songName = new Array();
var songUser = new Array();

var config = require("./config.js")

const fetchVideoInfo = require('youtube-info');
client.login(config.Token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});
    //When bot is ready, log it.

client.on('message', message => {
  if (message.content.startsWith(".search")) {
    search(message);
  }
  if (message.content === '.stop') {
    process.exit(1);
  }
  if (message.content === '.play') {
  play(message);
  }

  if (message.content === 'test') {
  console.log("Input listening from main loop.")
  console.log(message.type);
  }
  if (message.content === '.queue') {
  showQueue(message);
  }
  if (message.content === '.skipDebug') {
  skip(message);
  }
  if (message.content.startsWith('.h')) {
    const embed = new Discord.RichEmbed()


      .setAuthor(client.user.username + " commands", 'http://i.imgur.com/8rYXTvC.gif')
      .setColor(randomcolor())
      .addField(".search (SEARCH TERMS)", "Searches youtube and plays/queues the song.")
      .addField(".queue", "Shows the current queue of songs.")
      .addField(".next", "Skips the current song.")

      .addField(".h or .help", "Shows the help command.");



      message.channel.sendEmbed(embed,'');

  }
}); //Bot command parsing.



/////////////Functions//////////////////////////////
//The function to call youtube's search function and get links.
function search(message) {
  var search = require('youtube-search');
  var searchTerm = message.content.substring(8);

  var opts = {
    maxResults: 10,
    key: config.ytAPI_KEY
  };
  search(searchTerm, opts, function(err, results) {
    if(err) return console.log(err);
if(results[0]['kind'] == "youtube#channel") {
  message.reply("What you searched for brings up a channel instead of a video. Try A different search?");
} else {
  var link = results[0]['link'];
  var name;

  var key = link.split("v=");
    fetchVideoInfo(key[1], function (err, videoInfo) {
    name = videoInfo['title'];
    message.channel.sendMessage("Queued: **" + name + "**");
    songName.push(name);

  });
  songUser.push(message.author.username);
queue.push(link);
  if(queue[1] == undefined) {
    play(message);
  }
}
});

}



////////////////////////////////////////////////
//The main function to play songs
function play(message) {
  const voiceChannel = message.member.voiceChannel;
  if(!voiceChannel) {
    message.reply("Join a voice channel first!");
  } else {


  voiceChannel.join().then(connection => {
    if(queue[0] != undefined) {
      let stream = yt(queue[0]);
      let dispatcher = connection.playStream(stream);

      message.channel.sendMessage("**Now playing: **" + songName[0]);
      var collector = message.channel.createCollector(m => m);
    collector.on('message', m => {
      if (m.content.startsWith('.next')) {
        dispatcher.end();
      } else if (m.content == 'test2'){
        console.log("Input listening from collector.")
      }

    });
    dispatcher.on('end', () => {
      collector.stop();
      queue.shift();
      songName.shift();
      songUser.shift();
        if(queue[0] == undefined) {
          message.channel.sendMessage("**Queue is empty.**")
          voiceChannel.leave();
        } else {
          console.log("Replaying");
          play(message)
        }

    });
  }
    });
}
    }
////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////
//Debug function, not really needed.
function skip(message) {
queue.shift();
console.log("Skip is being called");
play(message);

}

////////////////////////////////////////////////////////////
function showQueue(message) {
var printQueue = "";
if(queue[0] == undefined) {
  message.channel.sendMessage("**Queue is empty.**");
} else{
  for(var i = 0; i < queue.length; i++) {
    printQueue = printQueue + "\n" + songUser[i] + " queued: **" + songName[i] + "**";
    }
}


const embed = new Discord.RichEmbed()
  .setAuthor(client.user.username + " Song queue 🎶", 'http://i.imgur.com/8rYXTvC.gif')
  .setColor("#F54C4C")
  .addField("\u200b", printQueue);
  message.channel.sendEmbed(embed,'');
}


process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
//Simple function to show the current queue.
