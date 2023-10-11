const { getData } = require("../helper/database/databaseManagement");
const generateDownloadMessage = require("./genarateDocumentMessage");

async function handleNonDocumentMessage(msg, chatID, bot) {
  const text = msg.text.replace("/", "") || "text";
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
      bot.editMessageText(
        `Discovered Over <b>${data.length} Results</b>.\n\nClick To Select Your Desierd Files.`,
        {
          chat_id: chatID,
          message_id,
          disable_web_page_preview: true,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Select Files",
                  switch_inline_query_current_chat: text,
                },
              ],
            ],
          },
        }
      );
    } else {
      bot.editMessageText("No results found", {
        chat_id: chatID,
        message_id,
        disable_web_page_preview: true,
      });
    }
  } catch (error) {}
}

module.exports = handleNonDocumentMessage;
