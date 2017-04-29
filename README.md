# slmIX.music
A discord bot I made for a friend's server so we could play music while talking to each other. What's the fun of getting a music bot online when you can make your own?

**DISCLAIMER** This is my first offical project. It isn't the best or most efficient code, but it works and I'll be in the process of updating and improving it. 

## Setup

1. Let's assume you have NodeJS installed. You're going to install the npm packages we use, run the commands
  ```
  npm install discord.js
  npm install youtube-info
  npm install youtube-search
  npm install ytdl-core
  ```
2. [Create an app](https://discordapp.com/developers/applications/me) and get it's token. Fill in the token part of [config.js](config.js) and get the bots' client ID. Then, copy [this link](https://discordapp.com/api/oauth2/authorize?client_id=157730590492196864&scope=bot&permissions=0) and replace the number in front of the client_id with your bot's client ID and follow the link.
3. Click on the dropdown and select the server that you want, and boom! You've got your slmIX bot added to server. 
4. Go to [the Google API console](https://console.developers.google.com) and follow [this tutorial](https://developers.google.com/youtube/v3/getting-started) for getting a YouTube API key. Copy your API key and paste it into [config.js](config.js)
5. Finally, type `node bot` and it should run just fine.

## Commands
This information can all be relayed if you type .h in any server that the bot is in. 

`.search [youtube search terms]` searches youtube for your query, and returns the first link that comes back. 

Example usage: `.search How far I'll go moana` brings the official soundtrack for Moana's "How far I'll go" and plays it in whatever voice channel you're in.
