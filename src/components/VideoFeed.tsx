import { uploadVideoSchema } from "@/lib/schema";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
    videos: uploadVideoSchema[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
                <VideoComponent key={video.id?.toString()} video={video} />
            ))}

            {videos.length === 0 && (
                <div className="col-span-full text-center py-12">
                    <p className="text-base-content/70">No videos found</p>
                </div>
            )}
        </div>
    );
}