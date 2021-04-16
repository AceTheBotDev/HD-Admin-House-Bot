const Discord = require("discord.js")
const bot = new Discord.Client()
bot.commands = new Discord.Collection()

const fs = require("fs")
var prefix = ";;"

bot.on("ready", () => {
    console.log("I'm ready!")
    bot.user.setActivity(`Looking for ${config.prefix}help`)
})

fs.readdir("./commands/", (err, files) => {
    console.log("Loading commands...");
    if (err) return console.log(`Command loading failed!`);
    files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
        bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
    });
});


bot.on('message', message => {
    let mArray = message.content.split(" ")
    let args = mArray.slice(1)
    let cmd = bot.commands.get(mArray[0].slice(prefix.length))
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (cmd) {
        cmd.run(bot, message, args, discord, config)
    }
})

bot.login(process.env.BOT_TOKEN)
