//import { SendGridService } from '@anchan828/nest-sendgrid';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Client, TextContent } from '@zenvia/sdk';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  private client = new Client(process.env.ZENVIA_TOKEN);

  async sendEmail(email: string, name: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'User Created',
        text: `Hello ${name}, your user created with success!`,
        html: `<strong>Hello ${name}, your user created with success!</strong>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendSms(phone: string, name: string): Promise<void> {
    const whatsapp = this.client.getChannel('whatsapp');
    const content = new TextContent(
      `Hello ${name}, your user 2 created with success!`,
    );
    await whatsapp.sendMessage(process.env.KEYWORD, phone, content);
  }
}
