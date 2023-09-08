// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a GPL-style
// license that can be found in the LICENSE file.

const config = require('../../config/bot.json')
const talkedRecently_userIDS = new Set()

module.exports = async (
  /** @type {{ commands: { keys: () => import("querystring").ParsedUrlQueryInput | undefined; get: (arg0: any) => any; }; aliases: { get: (arg0: any) => any; }; }} */ bot,
  /** @type {{ author: { bot: any; id: string; }; channel: { type: string; }; content: { startsWith: (arg0: string) => any; slice: (arg0: string) => string; }; reply: (arg0: string) => void; }} */ msg
) => {
  if (msg.author.bot) {
    return
  } else if (msg.channel.type === 'dm') return
  else if (
    config.use_globalCmdTimeout &&
    talkedRecently_userIDS.has(msg.author.id)
  ) {
    botgen.l0g(
      'Refused a connected for a ratelimit for author=' + msg.author.id,
      null,
      bot,
      msg
    )
    return
  } else if (msg.content.startsWith(config.prefix)) {
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g)
    let args_shift = args.shift()
    const cmd = args_shift.toLowerCase()
    let cmdFile =
      bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (cmdFile) {
      cmdFile.run(bot, msg, args, config)

      if (config.use_globalCmdTimeout) {
        talkedRecently_userIDS.add(msg.author.id)
        setTimeout(
          () => talkedRecently_userIDS.delete(msg.author.id),
          config.globalCmdTimeoutTime
        )
      }
    }
  } else if (msg.author.id == '1') {
    // @ts-ignore
    msg.channel.send(
      '>>> message received: ' +
        msg.content +
        '\nreceived as: ' +
        // @ts-ignore
        getNotOks(msg.content).toString()
    )
  }
}
