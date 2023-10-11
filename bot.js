require("dotenv").config({ path: "./.env" });
const telegram = require("node-telegram-bot-api");
const StartCommand = require("./helper/commands/startCommand");
const HelpCommand = require("./helper/commands/helpCommand");
const cors = require("cors");
const express = require("express");
const HandleInlineQuerys = require("./helper/handleInlineQuerys/handleInlineQuerys");
const HandleMessages = require("./helper/handleMessage/handleMessages");
const app = express();
const port = process.env.PORT || 5757;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const token = process.env.BOT_TOKEN;
const baseApiUrl = process.env.BASE_API_URL;
const bot = new telegram(token, { polling: true, baseApiUrl: baseApiUrl });

// sserver
app.get("/", (req, res) => res.send("OK"));

// Handle Commands
bot.onText(/\/start/, (msg, match) => StartCommand(msg, match, bot));
bot.onText(/\/help/, (msg, match) => HelpCommand(msg, match, bot));

// Handle Messages
bot.on("message", async (msg, meta) => HandleMessages(msg, meta, bot));

// Handle Inline Querys
bot.on("inline_query", async (query) => HandleInlineQuerys(query, bot));

bot.on("chosen_inline_result", (query) => console.log(query));

app.listen(port, async () => {
  const me = await bot.getMe();
  console.log(`${me.username} is Listening for messages`);
});
