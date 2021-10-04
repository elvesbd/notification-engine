//import { SendGridService } from '@anchan828/nest-sendgrid';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string, name: string): Promise<void> {
    console.log(email, name);
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
}
