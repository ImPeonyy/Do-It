"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "./session";
import { redirect } from "next/navigation";

const INTERNAL_API_URL = process.env.INTERNAL_API_URL!;

export async function loginAction(code: string, state: string) {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

    const response = await fetch(`${INTERNAL_API_URL}/oauth/login`, {
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

export async function logoutAction() {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    session.accessToken = undefined;
    await session.save();
}

export async function redirectToOauthAction() {
    const response = await fetch(`${INTERNAL_API_URL}/oauth/redirect-oauth`, 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    redirect(data.url);
}
