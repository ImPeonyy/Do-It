"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "./session";

export async function loginAction(code: string, state: string) {
  const cookieStore = await cookies();
  console.log("code", code);
  console.log("state", state);
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, state }),
  });
  const data = await response.json();
  const accessToken = data.access_token;

  session.accessToken = accessToken;

  await session.save();
}
