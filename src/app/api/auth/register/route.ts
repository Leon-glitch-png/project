import {NextResponse, NextRequest} from "next/server";
import {hashPassword,userSchema} from "@/lib/schema";
import {prisma} from "@/lib/prisma";

export async function POST(req:NextRequest){
    try{
        const {data,success,error}  = userSchema.safeParse(await req.json());
        if(success){
            const existingUser = await prisma.user.findUnique({
                where:{
                    email:data.email,
                }
            })
            if(existingUser){
               return  NextResponse.json({status:400,message:"User already exist",data:existingUser});
            }else {
                const hashedPassword = await hashPassword(data.password);
                const user = await prisma.user.create({
                    data:{
                        email:data.email,
                        password:hashedPassword
                    }
                })
               return  NextResponse.json({status:200,message:"User register successfully",data:user});
            }
        }else{
            return NextResponse.json({status:400,message:error.message});
        }
    }catch(err){
        console.error(err);
       return  NextResponse.json({status:500,message:"Something went wrong"});
    }

}








