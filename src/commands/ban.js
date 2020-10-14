const { Command } = require('../structures/Command')

module.exports = class Ban extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: [],
      description: 'Ban a user.',
      requiredPermissions: ["BAN_MEMBERS"],
      dev: false,
    })
  }

  async run({ message, args }) {
    const mention = message.mentions.users.first()
    const reason = args.slice(1).join(" ")
    if(!mention) return message.reply('Mention a user.')
    if(!reason) return message.reply('No Reason specified.')
    if (message.member.roles.highest.position <= message.guild.member(mention).roles.highest.position) return message.reply('You cannot ban this user.')
    message.guild.members.ban(mention.id, {
        days: 7,
        reason: `Banned by: ${message.author.id} | Reason: ${reason}`
    })
    message.channel.send(`<@${mention.id}> has been successfully banned.`)
  }
}