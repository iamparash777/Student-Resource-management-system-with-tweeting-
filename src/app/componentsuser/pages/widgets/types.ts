// types.ts
import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  username: string;
  userId: string;
  content: string;
  timestamp: Timestamp | null;
  likes: number;
  comments: number;
  shares: number;
}
