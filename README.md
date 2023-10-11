# TG2URL

TG2URL is a Telegram bot that allows users to convert Telegram files into public links. It is built using Node.js and uses MongoDB for data storage.

## Features

- Convert Telegram files to public links
- Search for files
- Handle inline queries
- Handle keyboard inputs
- Handle messages

## Getting Started

To get started with the bot, you need to have Node.js and MongoDB installed on your machine.

1. Clone the repository
2. Install the dependencies using `npm install`
3. Create a `.env` file in the root directory and add your environment variables
4. Start the bot using `node bot.js`

## Environment Variables

The bot uses the following environment variables:

- `BOT_TOKEN`: Your Telegram bot token
- `BASE_API_URL`: The base API URL for your bot
- `URLSHORTX_API_KEY`: Your URLShortX API key
- `PORT`: The port on which your bot runs
- `MAXFILESTOSEND`: The maximum number of files to send

## Code Structure

- `bot.js`: The main file that starts the bot
- `helper/`: Contains helper functions and classes for handling commands, inline queries, keyboard inputs, and messages
- `utils/`: Contains utility functions for processing documents, generating URLs, and handling non-document messages
- `helper/database/`: Contains functions for managing the database

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.

## Contact

For any questions or concerns, please open an issue on GitHub.

[View the project on GitHub](https://github.com/lonefox-xxx
