import { v4 as uuidv4 } from 'uuid';
import { InlineKeyboard } from 'grammy';

export class MyResponse {
  public id = uuidv4();
  public title: string;
  public description: string;
  public message_text: string;
  public keyboard: InlineKeyboard | null;

  constructor(
    title: string,
    message_text: string,
    keyboard?: InlineKeyboard | null
  ) {
    this.title = title;
    this.description = message_text;
    this.message_text = message_text;
    this.keyboard = keyboard || null;
  }
  returnResponse() {
    return {
      type: 'article',
      id: this.id,
      title: this.title,
      description: this.description,
      thumb_url:
        'https://wp-contets-s3-bucket.s3.amazonaws.com/wp-content/uploads/2022/09/24073415/1_org_zoom-703-800x1200.jpg',
      input_message_content: {
        message_text: this.message_text,
        parse_mode: 'HTML',
      },
      reply_markup: this.keyboard ? this.keyboard : null,
    };
  }
}
