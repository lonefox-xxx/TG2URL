const generateDownloadMessage = require("./genarateDocumentMessage");

async function ProcessHistoricalDocument(historicalData, chatID, queryid, bot) {
  try {
    bot.deleteMessage(chatID, queryid);
    const maxFilestoSend = process.env.MAXFILESTOSEND || 2;
    for (let i = 0; i < maxFilestoSend && i < historicalData.length; i++) {
      const element = historicalData[i];
      const userData = await bot.getChat(chatID);
      const msg = generateDownloadMessage(
        element,
        element.urls[0].shortenedUrl,
        element.urls[1].shortenedUrl,
        userData,
        element.uploadedAt
      );
      await bot.sendMessage(chatID, msg, { disable_web_page_preview: true });
    }
  } catch (error) {
    console.error("Error sending messages:", error);
  }
}

module.exports = ProcessHistoricalDocument;
