async function StartCommand(msg, match , bot) {
  const chatID = msg.chat.id;
  return bot.sendMessage(chatID, "Welcome to the bot");
}

module.exports = StartCommand;