async function handleNonDocumentMessage(msg, chatID, bot) {
  const commands = (await bot.getMyCommands()).map((x) => x.command);
  const text = msg.text.replace("/", "");

  if (!commands.includes(text)) {
    bot.sendMessage(chatID, "Plz upload a file...");
  }
}

module.exports = handleNonDocumentMessage;
