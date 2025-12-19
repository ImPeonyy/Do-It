export interface UserProfile {
    username: string;
    formattedJoinDate: string;
    badges: string[];
    points: number;
    streakDays?: number;
}