// Code by NotCreative
const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const fs = require('fs')

// config file
const config = JSON.parse(fs.readFileSync("./config.json"))

//When bot is up and running it just logs it to console
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

let post = 0;

async function create_post(msg, send_channel) {
    let content = msg.content;
    var send = client.channels.cache.get(send_channel); // send channel
    let embed, jsonimagearray, size = 0, ignoreembed = false, tempcontent;
    if (!content) {
        tempcontent = "_ _";
    } else {
        tempcontent = content;
    }
    if (msg.attachments.size > 0) {
        if (msg.attachments.size == 1) {
            ignoreembed = true;
            let media = JSON.stringify(msg.attachments.first().url);
            media = media.slice(1,-1);
            embed = {
                "description": tempcontent,
                "color": config.color,
                "timestamp": msg.timestamp,
                "footer": {
                    "icon_url": msg.author.avatarURL(),
                    "text": msg.author.tag
                },
                "image": {
                    "url": media
                }
            };
        } else {
            size = 1;
            let attachedimagearray = [];
            for (let [key, value] of msg.attachments) {
                attachedimagearray.push(`Server: ${msg.guild.name} Author: ${msg.author.tag} ` + value.url + " ");
            }
            jsonimagearray = JSON.stringify(attachedimagearray)
            if (msg.content = "") {
                ignoreembed = true;
            } else {
                embed = {
                    "description": tempcontent,
                    "color": config.color,
                    "timestamp": msg.timestamp,
                    "footer": {
                        "icon_url": msg.author.avatarURL(),
                        "text": msg.author.tag
                    },
                };
            }
        }
    }
    else {
        ignoreembed = true;
        embed = {
            "description": tempcontent,
            "color": config.color,
            "timestamp": msg.timestamp,
            "footer": {
                "icon_url": msg.author.avatarURL(),
                "text": msg.author.tag
            },
        };
    }
    if (ignoreembed) {
        send.send({ embed });
    }
    if (size == 1) {
        send.send(jsonimagearray.slice(2, -2) + " " + tempcontent);
    }
    post++;
    console.log("amount of post since last restart: " + post);
}


client.on('message', msg => {
    for (var i = 0; i < config.focus.length; i++) { 
        if (msg.guild.id != config.focus[i]) return; 
    }
    for (var i = 0; i < config.channels.length; i++) {
        if (msg.channel.id == config.channels[i]) create_post(msg, config.send[i]);
    }
})
//Logs into the bot
client.login(config.token).catch(()=>{
    console.error("Invalid token")
})
