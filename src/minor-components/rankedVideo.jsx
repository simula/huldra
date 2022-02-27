import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getImageDownloadUrl } from "../utils/firebase";

const RankedVideo = ({ url, width, height, className, label }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    setSubscribed(true);
    (async () => {
      subscribed &&
        (await getImageDownloadUrl(url).then((res) => setVideoUrl(res)));
    })();
    return () => setSubscribed(false);
  }, [url, subscribed]);
  return (
    <div className={className}>
      <span className="video-label">{label}</span>
      <ReactPlayer width={width} height={height} controls url={videoUrl} />
    </div>
  );
};

export default RankedVideo;
