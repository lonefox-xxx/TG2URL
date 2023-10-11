const { getData, insertData } = require("../database/databaseManagement");

async function StartCommand(msg, match, bot) {
  const chatID = msg.chat.id;

  const data = await Promise.allSettled([
    getData({ id: chatID }, "Users"),
    bot.getChat(chatID),
  ]);
  const savedUserdata = data[0];
  const userData = data[1];

  if (savedUserdata == 0) {
    userData.credits = 0;
    userData.filesDone = 0;
    userData.invites = 0;
    insertData(userData, "Users");
    bot.sendMessage(chatID, "Welcome to the bot");
  }

  msg.chat.type == "private" &&
    bot.sendMessage(chatID, "menu", {
      reply_markup: JSON.stringify({
        keyboard: [
          ["👤 profile", "🔎 Search"],
          ["🆘 help", "👥 invite"],
          ["📁 My Files"],
        ],
        one_time_keyboard: false,
        resize_keyboard: true,
        selective: true,
      }),
    });
}

module.exports = StartCommand;
