export interface UserDetail {
  id: number;
  mezonUserId?: number;
  username: string;
  joinedAt?: string;
  role?: string;
}

export interface LeaderBoard {
  id: number;
  userId: string;
  user?: UserDetail;
  totalAnswers: number;
  correctAnswers: number;
  points: number;
  streakDays: number;
  lastAnswerDate: string;
  badges: string[];
}
