const { getData } = require("../helper/database/databaseManagement");

async function handleNonDocumentMessage(msg, chatID, bot) {
  const commands = (await bot.getMyCommands()).map((x) => x.command);

  if (!commands.includes(text) && !msg.document) {
    try {
      const text = msg.text.replace("/", "") || "text";
      const query = { file_name: { $regex: text, $options: "i" } };
      const { message_id } = await bot.sendMessage(
        chatID,
        "Searching For The file you requested...",
        { reply_to_message_id: msg.message_id }
      );
      const data = await getData(query, "fileDataset");
      if (data.length > 0) {
        bot.editMessageText(
          `I found ${data.length} results for your search, please be more specific`,
          { chat_id: chatID, message_id }
        );
      } else {
        bot.editMessageText("No results found", {
          chat_id: chatID,
          message_id,
        });
      }
    } catch (error) {}
  }
}

module.exports = handleNonDocumentMessage;
