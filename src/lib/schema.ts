import {z} from "zod";
import bcrypt from "bcryptjs";
import {IKUploadResponse} from "imagekitio-next/src/components/IKUpload/props";

export const userSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6,"password must be at least 6 characters"),
})

export type userType = z.infer<typeof userSchema>;

export async function hashPassword(password: string ): Promise<string> {
    return await bcrypt.hash(password,10);

}

export const videoSchema = z.object({
    title:z.string(),
    description:z.string(),
    videoUrl:z.string(),
    thumbnailUrl:z.string()
})
export const video = z.object({
    id: z.string(),
    title:z.string(),
    description:z.string(),
    videoUrl:z.string(),
    thumbnailUrl:z.string(),
    controls:z.boolean(),
})


export type  videoType = z.infer<typeof videoSchema>
export type uploadVideoSchema = z.infer<typeof video>