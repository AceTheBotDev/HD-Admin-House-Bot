module.exports.run = (bot, message, args, Discord) => {
   let verifiedRole = bot.guild.roles.cache.get("829766467238494278")
   let member = message.author.member()
   
   member.roles.add(verifiedRole)
  message.channel.send("Member verified!")
}

module.exports.help = {
    name: "verify"
}
