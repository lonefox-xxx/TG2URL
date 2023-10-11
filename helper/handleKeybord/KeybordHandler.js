const HandleSearch = require("./handleCredit");
const HandleHelp = require("./handleHelp");
const HandleInvite = require("./handleInvite");
const HandleMyFiles = require("./handleMy_Files");
const HandleProfile = require("./handleProfile");

function HandleKeybord(msg, bot) {
  return new Promise(async (resolve, reject) => {
    switch (msg.text) {
      case "👤 profile":
        await HandleProfile(msg, bot);
        resolve(true);
        break;

      case "🔎 Search":
        await HandleSearch(msg, bot);
        resolve(true);
        break;

      case "🆘 help":
        await HandleHelp(msg, bot);
        resolve(true);
        break;

      case "👥 invite":
        await HandleInvite(msg, bot);
        resolve(true);
        break;

      case "📁 My Files":
        await HandleMyFiles(msg, bot);
        resolve(true);
        break;

      default:
        resolve(false);
        break;
    }
  });
}

module.exports = HandleKeybord;
