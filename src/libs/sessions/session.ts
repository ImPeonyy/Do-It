import { SessionOptions } from "iron-session";

export interface SessionData {
  accessToken?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "doit_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
