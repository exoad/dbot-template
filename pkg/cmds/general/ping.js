// @ts-nocheck
// @ts-ignore
const { EmbedBuilder } = require('discord.js')

module.exports = {
  config: {
    name: 'ping',
    category: 'General',
    description: 'Gets information on API latency',
    usage: 'No arguments accepted',
    aliases: [`pong`]
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
    msg.channel
      .send('Playing ping pong... :ping_pong:')
      .then((/** @type {{ edit: (arg0: string) => void; }} */ m) => {
        let client = Date.now() - msg.createdTimestamp
        let api = Math.round(bot.ws.ping)
        m.edit(
          (client <= 75
            ? ':green_circle:'
            : client > 75 && client <= 135
            ? ':yellow_circle:'
            : ':red_circle:') +
            ' **Client Latency:** ' +
            client +
            'ms' +
            '\n' +
            (api <= 75
              ? ':green_circle:'
              : api > 75 && api <= 135
              ? ':yellow_circle:'
              : ':red_circle:') +
            ' **API Latency:** ' +
            api +
            'ms\n'
        )
      })
  }
}
