import ImageKit from "imagekit"
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters);
    } catch (error) {

        console.error("ImageKit authentication error:", error);

        return NextResponse.json(
            { error: "Authentication failed" },
            {
                status: 500,
            }
        );
    }
}
