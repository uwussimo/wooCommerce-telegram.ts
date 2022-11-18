import 'dotenv/config'; // Load .env file
import { Bot, InlineKeyboard } from 'grammy';
import { MyResponse } from './types/MyResponse';
const bot = new Bot(process.env.BOT_TOKEN || '');

// import messagesJSON from './data/messages.json';

import { WooCommerceService } from './services/woo';

const woo = new WooCommerceService(
  process.env.WOO_USERNAME || '',
  process.env.WOO_PASSWORD || '',
  'https://ipekyolu.uz/wp-json/wc/v3'
);

bot.command('start', (ctx) => {
  console.log(ctx.match);

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

bot.on('inline_query', async (ctx) => {
  const query = ctx.inlineQuery.query;
  const products = await woo.getProducts(query).then((res) => res);

  // console.log(products[0].images[0].src);
  const results = products.map((product: any) => {
    let image = product.images[0]?.src;
    let description = product.description
      .replace(/<[^>]+>/g, '')
      .replace(/(^[ \t]*\n)/gm, '')
      .split('\n')[4];
    return new MyResponse(
      product.name,
      description,
      image,
      new InlineKeyboard().url('Buy', product.permalink)
    ).returnResponse();
  });
  // const responces = messagesJSON
  //   .filter(
  //     (msg) =>
  //       msg.user_id == ctx.from.id && msg.title.includes(ctx.inlineQuery.query)
  //   )
  //   .map((message) => {
  //     return new MyResponse(
  //       message.title,
  //       message.message,
  //       new InlineKeyboard().url(
  //         message.url_text || 'Powered by @tmplsbot',
  //         message.url || 'https://t.me/tmplsbot'
  //       )
  //     ).returnResponse();
  //   });

  // if (responces.length == 0) {
  //   responces.push(
  //     new MyResponse(
  //       '❌ Sizda hech qanday habar topilmadi...',
  //       "Iltimos botga kirib xabar qo'shing",
  //       new InlineKeyboard().url(
  //         'Powered by @tmplsbot',
  //         'https://t.me/tmplsbot'
  //       )
  //     ).returnResponse()
  //   );
  // }

  //@ts-ignore
  ctx.answerInlineQuery(results, { cache_time: 0 }); // 0 means no caching
});

// Start the bot.
bot.start();
