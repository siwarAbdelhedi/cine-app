import React from 'react';
import '../styles/VideoBackground.css';

const VideoBackground: React.FC = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
