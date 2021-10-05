//import { SendGridService } from '@anchan828/nest-sendgrid';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, TextContent, IMessage } from '@zenvia/sdk';
import { Model } from 'mongoose';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
  ) {}

  private client = new Client(process.env.ZENVIA_TOKEN);

  async sendEmail(userId: number, email: string, name: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'User Created',
        text: `Hello ${name}, your user created with success!`,
        html: `<strong>Hello ${name}, your user created with success!</strong>`,
      })
      .then(async (response) => {
        await this.createMongoNotification(
          userId,
          'email',
          response,
          'SUCCESS',
        );
      })
      .catch(async (err) => {
        await this.createMongoNotification(userId, 'email', err, 'ERROR');
      });
  }

  async sendMessageWhatsapp(
    userId: number,
    phone: string,
    name: string,
  ): Promise<void> {
    const whatsapp = this.client.getChannel('whatsapp');
    const content = new TextContent(
      `Hello ${name}, your user 2 created with success!`,
    );
    await whatsapp
      .sendMessage(process.env.KEYWORD, phone, content)
      .then(
        async ({
          channel,
          contents,
          from,
          to,
          direction,
          id: messageId,
        }: IMessage) => {
          const response: any = {
            channel,
            contents,
            from,
            to,
            direction,
            messageId,
          };

          await this.createMongoNotification(
            userId,
            'whatsapp',
            response,
            'SUCCESS',
          );
        },
      )
      .catch(async (err) => {
        await this.createMongoNotification(userId, 'whatsapp', err, 'ERROR');
      });
  }

  private async createMongoNotification(
    userId: number,
    type: 'whatsapp' | 'email',
    response: any,
    status: 'SUCCESS' | 'ERROR',
  ): Promise<void> {
    const notification: NotificationDto = {
      userId,
      type,
      response,
      status,
    };

    const createNotification = new this.notificationModel(notification);
    await createNotification.save();
  }
}
