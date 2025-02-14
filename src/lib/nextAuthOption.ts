import {NextAuthOptions} from "next-auth";

import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";

import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Name", type: "text", placeholder: "Email"},
                password: {label: "Password", type: "password", placeholder: "Password"},

            },
            async authorize(credentials) {
                if(!credentials){
                throw new Error("Email or Password is incorrect");
                }
                try {
                    const isUser = await prisma.user.findUnique({
                        where:{
                            email:credentials.email
                        }
                    })
                    if(!isUser){
                        throw new Error("No user found ");

                    }

                    const  is_valid = await bcrypt.compare(credentials.password,isUser.password);
                    if(is_valid){
                        return {
                            id:isUser.id,
                            email:isUser.email
                        }
                    }else{
                        throw new Error("Invalid password");
                    }

                } catch (err) {
                    console.log("error while authenticating ",err);
                    throw err;
                }


            }

        })

    ],
    session:{
        strategy:"jwt",
        maxAge: 60*60*1000,
    },
    secret:process.env.NEXTAUTH_SECRET,

    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id;
                token.email = user.email;
            }
return token;
        },
        async session({session,token}){

    if(session.user){
        session.user.id = token.id as string;
        session.user.email = token.email;


    }

            return session;
        }
    }

}