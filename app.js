const { Client, IntentsBitField } = require('discord.js')
const _ = require('ansi-colors')
const config = require('./config/bot.json')
const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ],
  ws: { properties: { browser: 'Discord iOS' } }
})

console.log(_.black.red.italic('Starting up the bot...'))

;['aliases', 'commands', 'description', 'category'].forEach(
  x => (bot[x] = new Map())
)
;['cmd', 'events'].forEach(x => {
  console.log(
    _.bold.cyan(
      'Requiring a ' + _.underline.bold.bgGreen.white('LOADER') + ': '
    ) + _.underline(x)
  )
  require('./loader/' + x + '.js')(bot)
})

bot.setMaxListeners(25)
bot.once('ready', () => {
  console.log(_.bold.green('API is ready'))
  console.log(
    _.cyan('Entered as: ') +
      _.underline(bot.user?.username + '#' + bot.user?.discriminator)
  )
})
bot.on('messageCreate', msg => {
  if (
    // @ts-ignore
    msg.content == `<@${bot.user.id}>` ||
    // @ts-ignore
    msg.content == `<@!${bot.user.id}>`
  )
    msg.channel.send(
      `My prefix is: \`${config.prefix}\`\nyou then can use \`${config.prefix}help\` to get more information on commands you can use!`
    )
})

bot.login(require('./config/private.json').bot_token)
