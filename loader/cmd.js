const { readdirSync } = require("fs");
const _ = require("ansi-colors");
const config = require("../config/bot.json");
module.exports = async (
  /** @type {{ commands: { set: (arg0: any, arg1: any) => void; values: () => import("querystring").ParsedUrlQueryInput | undefined; }; aliases: { set: (arg0: any, arg1: any) => any; }; }} */ bot
) => {
  let count = 0;
  const load = (/** @type {string} */ dirs) => {
    const commands = readdirSync("./pkg/cmds/" + dirs).filter((d) =>
      d.endsWith(".js")
    );
    console.log(
      _.bold("== Commands to load == ") + "../pkg/cmds/" + dirs
    );
    for (let f of commands) {
      //try {
      let cmd = require("../pkg/cmds/" + dirs + "/" + f);

      bot.commands.set(cmd.config.name, cmd);

      if (cmd.config.aliases)
        cmd.config.aliases.forEach((a) => bot.aliases.set(a, cmd.config.name));
      console.log(
        "\t" +
          (count + 1) +
          ") Command | " +
          _.underline.magenta(cmd.config.name) +
          " has loaded" +
          " | Category: " +
          cmd.config.category +
          " | In: " +
          "../pkg/cmds/" +
          dirs +
          "/" +
          f
      );
      //} catch (er) {
      //  console.log(
      //    _.white.underline.bold.italic.bgRedBright("Failed to load: ") +
      //      "../cmds/" +
      //      dirs +
      //      "/" +
      //      f +
      //      " | Reason: " +
      //      er
      //  );
      //}
      count += 1;
    }
  };
  config.commands.categories.forEach((x) => load(x.toLowerCase()));
};