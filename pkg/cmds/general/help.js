// @ts-nocheck
// @ts-ignore
const { EmbedBuilder } = require('discord.js')

module.exports = {
  config: {
    name: 'help',
    category: 'General',
    description: 'Get help on a command or list all commands',
    usage: 'An optional argument targetting the command',
    aliases: []
  },
  run: async (
    // @ts-ignore
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    // @ts-ignore
    /** @type {any} */ args,
    // @ts-ignore
    /** @type {any} */ config
  ) => {
    let cmd = args[0]
    if (!cmd) {
      function getIndividualCategories () {
        let arr = bot.commands
        let t = new Map()
        // @ts-ignore
        arr.forEach(
          (/** @type {{ config: { category: string; name: any; }; }} */ x) => {
            let old =
              (!t.get(x.config.category) ? '' : t.get(x.config.category)) +
              x.config.name +
              ' '
            t.set(x.config.category, old)
          }
        )
        let ar = []
        t.forEach((re, r) => {
          ar.push({
            name: '**' + r + '**',
            value: !re ? '' : '```\n' + re + '```',
            inline: true
          })
        })
        return ar
      }
      const embed = new EmbedBuilder()
        .setTitle('Detailed Command Pool')
        // @ts-ignore
        .setColor('#000000')
        .setDescription(
          'Use this command like: `' +
            config.prefix +
            'help [command]` to get information specific for that command.'
        )
        .addFields(getIndividualCategories())
      // @ts-ignore
      msg.channel.send({ embeds: [embed] })
    } else {
      let fcmd = bot.commands.get(cmd)
      if (!fcmd) {
        msg.channel.send(
          '**Oh??**\nYou wanted: `' +
            args[0] +
            '` but I could not find that in the commands pool'
        )
      } else {
        const embed = new EmbedBuilder()
          .setTitle(fcmd.config.name)
          .addFields(
            {
              name: 'Description',
              value: '```\n' + fcmd.config.description + '```',
              inline: true
            },
            {
              name: 'Category',
              value: '`' + fcmd.config.category + '`',
              inline: true
            },
            {
              name: 'Usage',
              value: '```\n' + fcmd.config.usage + '```',
              inline: true
            },
            {
              name: 'Aliases',
              value: '```' + Array.from(fcmd.config.aliases).toString() + '```',
              inline: true
            }
          )
          .setTimestamp()
          // @ts-ignore
          .setColor('#000000')

        // @ts-ignore
        msg.channel.send({ embeds: [embed] })
      }
    }
  }
}
