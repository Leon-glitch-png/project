"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "@/components/VideoFeed";
import { uploadVideoSchema } from "@/lib/schema";
// import { apiClient } from "@/lib/api-client";
import axios from "axios";
export default function Home() {
  const [videos, setVideos] = useState<uploadVideoSchema[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // const data = await apiClient.getVideos();
        const response = await axios.get("/api/videos",{
          withCredentials: true
        })
        if(response.status ===200){
          setVideos(response.data);
        }else{
          throw new Error("Error occurred while fetching videos");
        }

      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>
        <VideoFeed videos={videos} />
      </main>
  );
}