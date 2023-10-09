const { getData, insertData } = require("../database/databaseManagement");

async function StartCommand(msg, match, bot) {
  const chatID = msg.chat.id;
  const savedUserdata = await getData({ id: chatID }, "Users");
  const userData = await bot.getChat(chatID);
  if (savedUserdata == 0) {
    userData.credits = 0;
    userData.filesDone = 0;
    userData.invites = 0;
    await insertData(userData, "Users");
    bot.sendMessage(chatID, "Welcome to the bot");
  }
}

module.exports = StartCommand;
