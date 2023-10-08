const ProcessHistoricalDocument = require("../../utils/ProcessHistoricalDocument");
const handleNonDocumentMessage = require("../../utils/handleNonDocumentMessage");
const ProcessDocument = require("../../utils/proccessDocument");
const { getData } = require("../database/databaseManagement");

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
    const historicalData = await getData(query);
    if (historicalData.length == 0) {
      console.log("file not found in Database");
      await ProcessDocument(msg, chatID, queryid, bot);
    } else {
      console.log("file found in Database");
      await ProcessHistoricalDocument(historicalData, chatID, queryid, bot);
    }
  } else {
    await handleNonDocumentMessage(msg, chatID, bot);
  }
}

module.exports = HandleMessages;
