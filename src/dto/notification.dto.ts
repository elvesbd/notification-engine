export class NotificationDto {
  userId: number;
  type: 'email' | 'whatsapp';
  response: any;
  status: 'SUCCESS' | 'ERROR';
}
