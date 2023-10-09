const generateDownloadMessage = require("./genarateDocumentMessage");
const util = require("util");
const sleep = require("./sleep");
const GetReference = require("./getReference");
const { insertData } = require("../helper/database/databaseManagement");
const exec = util.promisify(require("child_process").exec);

async function ProcessDocument(msg, chatID, queryid, bot) {
  bot.deleteMessage(chatID, queryid);

  const { message_id } = await bot.sendMessage(chatID, "Downloading File...");
  // const down = await bot.downloadFile(msg.document.file_id, "../downloads");
  // return console.log(down);
  const file = await bot.getFile(msg.document.file_id);
  file.file_name = msg.document.file_name;

  const userData = await bot.getChat(chatID);

  if (!file.file_path) {
    return bot.editMessageText(`Invalid File Type`, {
      chat_id: chatID,
      message_id,
    });
  }

  bot.editMessageText(`Uploading File...`, { chat_id: chatID, message_id });
  const identifier =
    "movie_" + file.file_unique_id + "_" + new Date().getTime();

  try {
    const { stdout, stderr } = await exec(
      `ia upload ${identifier}  ${file.file_path} --metadata="mediatype:movie" --metadata="blah:arg"`
    );
    console.log(stdout, stderr);

    await sleep(1000 * 10);
    const { urls, status, msg, data } = await GetReference(
      identifier,
      file.file_size,
      25
    );
    const uploadedAt = new Date().getTime();
    const filedata = {
      file_name: file.file_name,
      file_unique_id: file.file_unique_id,
      file_id: file.file_id,
      file_size: file.file_size,
      urls,
      updaterID: chatID,
      uploadedAt,
    };

    await insertData(filedata);

    bot.editMessageText(
      generateDownloadMessage(
        file,
        urls[0].shortenedUrl,
        urls[1].shortenedUrl,
        userData,
        uploadedAt
      ),
      {
        chat_id: chatID,
        message_id,
      }
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = ProcessDocument;
