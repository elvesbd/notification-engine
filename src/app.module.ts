import { SendGridModule } from '@anchan828/nest-sendgrid';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationSchema } from './model/notification.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/notification'),
    MongooseModule.forFeature([
      { name: 'notification', schema: NotificationSchema },
    ]),
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
console.log(process.env.EMAIL_ID, process.env.EMAIL_PASS);
