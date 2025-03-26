// src/components/youtube-video-card.tsx
import React from "react";

interface YouTubeVideoCardProps {
  locationName: string;
}

const YouTubeVideoCard = ({ locationName }: YouTubeVideoCardProps) => {
  // You can create a map of city names to YouTube video IDs or handle the query more intelligently.
  // For now, let's just set a default video or example based on location.
  const youtubeSearchQuery = `${locationName} travel video`;

  // Example video IDs for known locations (replace these with real IDs from YouTube)
  const videoIds: { [key: string]: string } = {
    "Budapest": "e10pVhxNOco",  // Example video ID for Budapest
    "Paris": "REDVbTQxMXo",     // Example video ID for Paris
    "New York": "lkkyTUpyIyk",
    "Kingston": "mpDu7JBEyhw"  // Example video ID for New York
  };

  // Use the video ID for the city or default to a fallback
  const videoId = videoIds[locationName]// Default to a known video if not found

  return (
    <div className="card">
      <h3 className="text-xl font-bold">Explore {locationName} on YouTube</h3>
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={`YouTube video for ${locationName}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeVideoCard;
