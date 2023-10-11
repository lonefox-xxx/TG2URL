const { getData } = require("../database/databaseManagement");
const generateDownloadMessage = require("../../utils/genarateDocumentMessage");
const HandeleSize = require("../../utils/sizeHandler");

async function HandleInlineQuerys(queryData, bot) {
  const { query } = queryData;
  const id = query ? { file_name: { $regex: query, $options: "i" } } : false;
  const queryDatalogs = await getData(id, "fileDataset");

  const inlineData = await Promise.all(
    queryDatalogs.map(async (item, i) => {
      return {
        type: "article",
        id: i,
        title: item.file_name,
        description: HandeleSize(item.file_size),
        input_message_content: {
          disable_web_page_preview: true,
          message_text: generateDownloadMessage(
            item,
            item.urls[0].shortenedUrl,
            item.urls[1].shortenedUrl,
            await bot.getChat(item.updaterID),
            item.uploadedAt
          ),
        },
        reply_markup: {
          disable_web_page_preview: true,
          inline_keyboard: [
            [
              {
                text: "🔍 Search Again",
                switch_inline_query_current_chat: query,
              },
            ],
          ],
        },
      };
    })
  );

  bot.answerInlineQuery(queryData.id, inlineData, {
    disable_web_page_preview: true,
    cache_time: 0,
  });
}

module.exports = HandleInlineQuerys;
