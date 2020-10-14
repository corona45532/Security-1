module.exports = class guildMemberAdd {
    constructor(client) {
      this.client = client
    }
    async run(member) {
        await member.roles.add("765239032607014923")
    }
  }
  