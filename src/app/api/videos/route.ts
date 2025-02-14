import {NextRequest,NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {getServerSession} from "next-auth";
import {nextAuthOption} from "@/lib/nextAuthOption";
import {videoSchema} from "@/lib/schema";

export async function GET() {
    try{
        const data = await prisma.video.findMany();

        if (data.length > 0) {
            return NextResponse.json(data, {status: 200})


        } else {
            return NextResponse.json([], {status: 200})
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Failed to get video."},{status:500});
    }
}


export async function POST(req:NextRequest){
    try{
        const session  = await getServerSession(nextAuthOption);
        if(!session){
            return NextResponse.json({message:"You are not authorized to access this page"},{status:401});
        }
        const {data, success,error} = videoSchema.safeParse(await req.json());
        if(!success){
            return NextResponse.json({message:"Missing required field",error},{status:400})

        }
        const video  = await prisma.video.create({
            data:{
                title:data.title,
                description:data.description,
                videoUrl:data.videoUrl,
                thumbnailUrl:data.thumbnailUrl
            }
        })

        return NextResponse.json({message:"Video uploaded successfully ",video},{status:200})

    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Failed to create video.",error:err},{status:500})
    }
}


