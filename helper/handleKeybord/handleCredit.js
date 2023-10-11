async function HandleSearch(msg, bot) {
  bot.sendMessage(
    msg.chat.id,
    "We've found a vast collection of\nover <b>3.09k</b> files.\n\nWhich one would you like to access?",
    {
      reply_markup: {
        disable_web_page_preview: true,
        inline_keyboard: [
          [
            {
              text: "🔍 Search",
              switch_inline_query_current_chat: "",
            },
          ],
        ],
      },
      parse_mode: "HTML",
    }
  );
}

module.exports = HandleSearch;
