import { NextResponse } from "next/server";
import { getSession } from "@/src/libs/sessions/session.service";

const INTERNAL_API = process.env.INTERNAL_API_URL!;
const INTERNAL_SECRET = process.env.INTERNAL_SECRET!;

async function proxy(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
    const auth = await getSession();
    if (!auth || !auth.accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = auth.user;

    const path = (await params).path.join("/");
    const urlObj = new URL(req.url);
    const searchParams = urlObj.searchParams.toString();
    const url = searchParams ? `${INTERNAL_API}/${path}?${searchParams}` : `${INTERNAL_API}/${path}`;

    const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.text();

    const headers: Record<string, string> = {
        "Content-Type": req.headers.get("content-type") || "application/json",
        "x-internal-secret": INTERNAL_SECRET,
        Authorization: `Bearer ${auth.accessToken}`,
    };

    if (user?.id) {
        headers["x-user-id"] = user.id.toString();
    }

    const beRes = await fetch(url, {
        method: req.method,
        body,
        headers,
    });
    console.log("beResxxs", beRes);
    const resBody = await beRes.text();
    console.log("resBodyxxs", resBody);

    return new NextResponse(resBody, {
        status: beRes.status,
        headers: {
            "Content-Type": beRes.headers.get("content-type") || "application/json",
        },
    });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
