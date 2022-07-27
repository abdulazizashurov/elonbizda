import axios from 'axios';
import Application from '../../app';

type SmsMessage = {
  recipient: string;
  messageId: string;
  text: string;
};

type SmsServiceOptions = {
  message: SmsMessage;
};
export class SMSService {
  private token: string;
  private adress: string;

  private recipient: string;
  private messageId: string;
  private messageText: string;
  constructor(options: SmsServiceOptions) {
    this.token = Application.resolve('config').services.playmobile.token;
    this.adress = Application.resolve('config').services.playmobile.host;

    this.recipient = options.message.recipient;
    this.messageId = options.message.messageId;
    this.messageText = options.message.text;
  }
  async sendMessage() {
    const messageRequestBody = {
      messages: [
        {
          recipient: this.recipient,
          'message-id': this.messageId,
          sms: {
            originator: '3700',
            content: {
              text: this.messageText
            }
          }
        }
      ]
    };
    const messageRequestConfig = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${this.token}`
      }
    };

    const result = await axios.post(this.adress, messageRequestBody, messageRequestConfig);
    console.log('Send Sms Status', result.statusText);
    try {
    } catch (e) {
      console.log(e);
    }
  }
}
