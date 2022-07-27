import { SMSService } from '../../../services/sms';
import { SmsMessage } from '../domain/SmsMessage';
export class VerficationService {
  async send(options: SmsMessage) {
    const message = options.message;
    const smsService = new SMSService({
      message: {
        messageId: '1',
        recipient: options.phoneNumber,
        text: message
      }
    });
    try {
      await smsService.sendMessage();
    } catch (e) {
      console.log(e);
    }
  }
}
