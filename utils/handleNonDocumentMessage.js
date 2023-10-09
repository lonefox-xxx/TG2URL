const { getData } = require("../helper/database/databaseManagement");
const generateDownloadMessage = require("./genarateDocumentMessage");

async function handleNonDocumentMessage(msg, chatID, bot) {
  const commands = (await bot.getMyCommands()).map((x) => x.command);
  if (!msg.document) {
    const text = msg.text.replace("/", "") || "text";
    if (!commands.includes(text)) {
      try {
        const query = { file_name: { $regex: text, $options: "i" } };
        const { message_id } = await bot.sendMessage(
          chatID,
          "Searching For The file you requested...",
          {
            reply_to_message_id: msg.message_id,
            disable_web_page_preview: true,
          }
        );
        const data = await getData(query, "fileDataset");
        if (data.length > 0) {
          const userData = await bot.getChat(data[0].updaterID);
          const msg = generateDownloadMessage(
            data[0],
            data[0].urls[0].shortenedUrl,
            data[0].urls[1].shortenedUrl,
            userData,
            data[0].uploadedAt
          );
          bot.editMessageText(msg, {
            chat_id: chatID,
            message_id,
            disable_web_page_preview: true,
          });
        } else {
          bot.editMessageText("No results found", {
            chat_id: chatID,
            message_id,
            disable_web_page_preview: true,
          });
        }
      } catch (error) {}
    }
  }
}

module.exports = handleNonDocumentMessage;
