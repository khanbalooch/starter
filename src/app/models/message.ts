import { User } from './user';

export interface Message {
  userID: number;
  userMessaged: string;
  text: string;
  user: User;
  datestamp: string;
}
