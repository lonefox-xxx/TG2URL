const ProcessHistoricalDocument = require("../../utils/ProcessHistoricalDocument");
const handleNonDocumentMessage = require("../../utils/handleNonDocumentMessage");
const ProcessDocument = require("../../utils/proccessDocument");
const { getData } = require("../database/databaseManagement");
const HandleKeybord = require("../handleKeybord/KeybordHandler");

async function HandleMessages(msg, meta, bot) {
  const chatID = msg.chat.id;
  const { message_id: queryid } = msg;

  if (msg.document) {
    const query = {
      $or: [
        { file_name: msg.document.file_name },
        { file_unique_id: msg.document.file_unique_id },
        { file_id: msg.document.file_id },
      ],
    };
    const historicalData = await getData(query, "fileDataset");
    if (historicalData.length == 0) {
      await ProcessDocument(msg, chatID, queryid, bot);
    } else {
      await ProcessHistoricalDocument(historicalData, chatID, queryid, bot);
    }
  } else {
    // console.log(msg);
    if (!msg.text) return;
    const commands = (await bot.getMyCommands()).map((x) => x.command);
    const text = msg.text.replace("/", "") || "text";

    if (!commands.includes(text)) {
      if (msg.chat.type != "private" && !msg.document && !msg.via_bot)
        await handleNonDocumentMessage(msg, chatID, bot);
      else {
        const handeledKeyboard = await HandleKeybord(msg, bot);
        !handeledKeyboard &&
          !msg.via_bot &&
          bot.sendMessage(chatID, "Sorry , Plz send me a document");
      }
    }
  }
}

module.exports = HandleMessages;
