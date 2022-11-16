import 'dotenv/config'; // Load .env file
import { Bot, InlineKeyboard } from 'grammy';
import { MyResponse } from './types/MyResponse';
const bot = new Bot(process.env.BOT_TOKEN || '');

import messagesJSON from './data/messages.json';

bot.command('start', (ctx) => {
  ctx.reply(
    'Welcome to the bot! Please select an option from the keyboard below.',
    {
      reply_markup: {
        // Inline keyboard
        inline_keyboard: [
          [
            {
              text: 'Add new message',
              callback_data: 'add',
            },
          ],
          [
            {
              text: 'Show all messages',
              callback_data: 'show',
            },
          ],
        ],
      },
    }
  );
});

bot.command('add', (ctx) => {
  ctx.reply('Currently this feature does not work!');
});

bot.on('inline_query', (ctx) => {
  console.log(ctx.from?.id, ctx.from?.first_name);
  const responces = messagesJSON
    .filter(
      (msg) =>
        msg.user_id == ctx.from.id && msg.title.includes(ctx.inlineQuery.query)
    )
    .map((message) => {
      return new MyResponse(
        message.title,
        message.message,
        new InlineKeyboard().url(
          message.url_text || 'Powered by @tmplsbot',
          message.url || 'https://t.me/tmplsbot'
        )
      ).returnResponse();
    });

  if (responces.length == 0) {
    responces.push(
      new MyResponse(
        "Sizda habarlar yo'q",
        "Iltimos botga kirib xabar qo'shing",
        new InlineKeyboard().url(
          'Powered by @tmplsbot',
          'https://t.me/tmplsbot'
        )
      ).returnResponse()
    );
  }

  //@ts-ignore
  ctx.answerInlineQuery(responces, { cache_time: 0 }); // 0 means no caching
});

// Start the bot.
bot.start();
