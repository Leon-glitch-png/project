// "use client"
//
// import { ImageKitProvider } from "imagekitio-next";
// import {SessionProvider} from "next-auth/react";
//
//
// const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
// const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
//
// export default function Providers({children}:{children:React.ReactNode}) {
//     const authenticator = async () => {
//         try {
//             const response = await fetch("/api/imagekit-auth");
//
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Request failed with status ${response.status}: ${errorText}`);
//             }
//
//             const data = await response.json();
//             const { signature, expire, token } = data;
//             return { signature, expire, token };
//         } catch (error) {
//             console.log(error);
//             throw new Error(`Authentication request failed: ${error}`);
//         }
//     };
//
//     return (
//         <SessionProvider >
//             <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
//
//                 {/* ...client side upload component goes here */}
//                 {children}
//
//             </ImageKitProvider>
//         </SessionProvider>
//
//     );
// }

"use client";

import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "imagekitio-next";
import { NotificationProvider } from "./Notification";
import React from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;

export default function Providers({ children }: { children: React.ReactNode }) {
        const authenticator = async () => {
        try {
            const response = await fetch("/api/imagekit-auth");

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            console.log(error);
            throw new Error(`Authentication request failed: ${error}`);
        }
    };
    return (
        <SessionProvider refetchInterval={5 * 60}>
            <NotificationProvider>
                <ImageKitProvider
                    publicKey={publicKey}
                    urlEndpoint={urlEndpoint}
                    authenticator={authenticator}
                >
                    {children}
                </ImageKitProvider>
            </NotificationProvider>
        </SessionProvider>
    );
}