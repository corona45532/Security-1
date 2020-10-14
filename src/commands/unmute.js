const { Command } = require('../structures/Command')

module.exports = class Unmute extends Command {
  constructor(client) {
    super(client, {
      name: 'unmute',
      aliases: [],
      description: 'Unmute a user.',
      requiredPermissions: null,
      dev: false,
    })
  }

  async run({ message, args }) {
    const mention = message.mentions.users.first()
    let role = message.guild.roles.cache.find((r) => r.name === 'Muted')
    if (!mention) return message.reply('Mention a user')
    message.guild
      .member(mention)
      .roles.remove(role.id)
      .then(() => {
        message.reply(`<@${mention.id}> has been successfully ummuted.`)
      })
  }
}
