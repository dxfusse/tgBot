const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = '8179159056:AAFp_2akr_bkTcq1t6bXnxoUT6xV0EhBvf4';
const WEB_APP_URL = 'https://dxfusse.github.io/tgBot/';

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    '👋 Привет! Открой мини-приложение:',
    Markup.inlineKeyboard([
      Markup.button.webApp('🚀 Открыть Mini App', WEB_APP_URL)
    ])
  );
});

// Получение данных из Mini App
bot.on('web_app_data', (ctx) => {
  const data = JSON.parse(ctx.message.web_app_data.data);

  ctx.reply(
    `📩 Данные получены:\n` +
    `Тип: ${data.type}\n` +
    `Время: ${new Date(data.time).toLocaleString()}`
  );
});

bot.launch();

console.log('🤖 Бот запущен');
