const { Command } = require('../structures/Command')
const parse = require('parse-duration')

module.exports = class Mute extends Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      aliases: [],
      description: 'Mute a User.',
      requiredPermissions: ['BAN_MEMBERS'],
      dev: false,
    })
  }

  async run({ message, args }) {
    const member =
      message.mentions.users.first() || this.client.users.cache.get(args[0])
    if (!member) return message.reply('Mention a user.')
    let time = args[1]
    if (!time) return message.reply('No duration specified.')
    let reason = args.slice(2).join(' ')
    if (!reason) return message.reply('No reason specified.')
    let role = message.guild.roles.cache.find((r) => r.name === 'Muted')
    if (!role) {
      role = await message.guild.roles.create({
        data: {
          name: 'Muted',
          color: '#000000',
          permissions: [],
        },
      })
      message.guild.channels.cache.forEach(async (channel) => {
        await channel.createOverwrite(role.id, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false,
          CONNECT: false,
        })
      })
    }
    if (
      message.member.roles.highest.position <=
      message.guild.member(member).roles.highest.position
    )
      return message.reply('You cannot mute this user.')

    message.guild
      .member(member)
      .roles.add(role.id)
      .then(() => {
        message.reply(`<@${member.id}> has been successfully muted.`)
      })
    setTimeout(function () {
      message.guild.member(member).roles.remove(role.id)
    }, parse(time))
  }
}
