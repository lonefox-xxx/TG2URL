const path = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const sleep = require("./sleep");
const GetReference = require("./getReference");
const { insertData } = require("../helper/database/databaseManagement");
const generateDownloadMessage = require("./genarateDocumentMessage");

async function ProcessDocument(msg, chatID, queryid, bot) {
  bot.deleteMessage(chatID, queryid);
  const { message_id } = await bot.sendMessage(chatID, "Downloading File...");

  const file = await bot.getFile(msg.document.file_id);
  file.file_name = msg.document.file_name.replace(/[^\w\s]/g, " ").trim();

  if (!file.file_path) {
    return bot.editMessageText(`Invalid File Type`, { chat_id: chatID, message_id });
  }

  bot.editMessageText(`Uploading File...`, { chat_id: chatID, message_id });
  const identifier = `movie_${file.file_unique_id}_${new Date().getTime()}`;

  try {
    await exec(`ia upload ${identifier} ${file.file_path} --metadata="mediatype:movie" --metadata="blah:arg"`);
    bot.editMessageText(`Getting Links...`, { chat_id: chatID, message_id });
    await sleep(10000);

    const { urls } = await GetReference(identifier, file.file_size, 25);
    const uploadedAt = new Date().getTime();
    const filedata = {
      file_name: file.file_name,
      file_unique_id: file.file_unique_id,
      file_id: file.file_id,
      file_size: file.file_size,
      file_type: path.extname(file.file_path),
      urls,
      updaterID: chatID,
      uploadedAt,
    };

    await insertData(filedata, "fileDataset");

    const downloadMessage = generateDownloadMessage(file, urls[0].shortenedUrl, urls[1].shortenedUrl, await bot.getChat(chatID), uploadedAt);

    bot.editMessageText(downloadMessage, { chat_id: chatID, message_id });
  } catch (err) {
    console.error(err);
  }
}

module.exports = ProcessDocument;
