import { v4 as uuidv4 } from 'uuid';
import { InlineKeyboard } from 'grammy';

export class MyResponse {
  public id = uuidv4();
  public title: string;
  public description: string;
  public message_text: string;
  public thumbnail_url: string | null;
  public keyboard: InlineKeyboard | null;

  constructor(
    title: string,
    description: string,
    thumbnail_url: string | null,
    keyboard?: InlineKeyboard | null
  ) {
    this.title = title;
    this.description = description;
    this.message_text = `<b>${title}</b>\n${description}`;
    this.thumbnail_url = thumbnail_url;
    this.keyboard = keyboard || null;
  }
  returnResponse() {
    return {
      type: 'article',
      id: this.id,
      title: this.title,
      description: this.description,
      thumb_url: this.thumbnail_url,
      input_message_content: {
        message_text: this.message_text,
        parse_mode: 'HTML',
      },
      reply_markup: this.keyboard ? this.keyboard : null,
    };
  }
}
