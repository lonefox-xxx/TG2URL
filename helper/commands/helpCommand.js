async function HelpCommand(msg, match , bot) {
  const chatID = msg.chat.id;
  return bot.sendMessage(
    chatID,
    "This is a bot for the convert telegram files to public link"
  );
}

module.exports = HelpCommand;
