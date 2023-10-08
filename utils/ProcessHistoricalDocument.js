async function ProcessHistoricalDocument(historicalData, chatID, queryid, bot) {
  bot.sendMessage(
    chatID,
    `File Downloaded\n\nFileID : ${
      historicalData[0].file_unique_id
    }\n\nFile Size : ${(historicalData[0].file_size / (1024 * 1024)).toFixed(
      2
    )} mb\n\nLink1 : ${historicalData[0].urls[0]}\n\nLink2 : ${
      historicalData[0].urls[1]
    }`
  );
}

module.exports = ProcessHistoricalDocument;