// import {FormEvent, useState} from "react";
// import Link from "next";
// import {useRouter} from "next/navigation";
// import axios from "axios";
// import {NextResponse} from "next/server";
//
//
// export function Register(){
//     const router = useRouter();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [error, setError] = useState<string|null>(null);
//
//     const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if(password !== confirmPassword){
//             setError("Passwords don't match");
//         }
//
//         try {
//         const response  = await axios.post("/api/auth/register",{
//             email,
//             password
//
//         },{
//             withCredentials:true
//         })
//             if(response.status === 200){
//                 return NextResponse.json({message:"Successfully registered",response:response.data},{status:200});
//
//             }else{
//                 return NextResponse.json({message:"Something went wrong"},{status:500});
//             }
//
//         }catch(e){
//             console.error(e);
//         }
//
//     }
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//
//             </form>
//
//         </div>
//     )
//
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Notification";
import Link from "next/link";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const { showNotification } = useNotification();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showNotification("Passwords do not match", "error");
            return;
        }

        try {
        const response  = await axios.post("/api/auth/register",{
            email,
            password

        },{
            withCredentials:true
        })
            if(response.status === 200){
                showNotification("Registration successful! Please log in.", "success");
                router.push("/login");

            }else{
                throw new Error(response.statusText || "Registration failed");
            }


        } catch (error) {
            showNotification(
                error instanceof Error ? error.message : "Registration failed",
                "error"
            );
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link href={"/login"} className="text-blue-500 hover:text-blue-600">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}