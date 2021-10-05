import { Document } from 'mongoose';

export interface Notification extends Document {
  userId: number;
  type: 'email' | 'whatsapp';
  response: any;
  status: 'SUCCESS' | 'ERROR';
}
