const { Command } = require('../structures/Command')

module.exports = class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: [],
      description: 'Kick a user.',
      requiredPermissions: ['BAN_MEMBERS'],
      dev: false,
    })
  }

  async run({ message, args }) {
    const mention =
      message.mentions.users.first() || this.client.users.cache.get(args[0])
    const reason = args.slice(1).join(' ')
    if (!mention) return message.reply('Mention a user.')
    if (!reason) return message.reply('No reason specified.')
    const member = message.guild.member(mention)
    if (
      message.member.roles.highest.position <=
      message.guild.member(mention).roles.highest.position
    )
      return message.reply('You cannot kick this user.')
    member.kick(`Kicked by: ${message.author.id} | Reason: ${reason}`)
    message.reply(`<@${mention.id}> was successfully kicked.`)
  }
}
