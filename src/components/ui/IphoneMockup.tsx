import { motion } from 'framer-motion';

interface IphoneMockupProps {
  videoUrl?: string;
  imageUrl?: string;
  className?: string;
  scale?: number;
  link?: string;
}

export function IphoneMockup({ videoUrl, imageUrl, className = '', scale = 1, link }: IphoneMockupProps) {
  const content = (
    <motion.div
      className={`iphone-mockup ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
      whileHover={{ 
        rotate: -2,
        scale: scale * 1.05
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Notch */}
      <div className="iphone-notch" />

      {/* Left buttons */}
      <div className="iphone-btn iphone-btn-silence" />
      <div className="iphone-btn iphone-btn-vol-up" />
      <div className="iphone-btn iphone-btn-vol-down" />

      {/* Right button */}
      <div className="iphone-btn iphone-btn-power" />

      {/* Screen */}
      <div className="iphone-screen">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            className="iphone-screen-content"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            title="App Demo Video"
            loading="lazy"
          />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="App Preview"
            className="iphone-screen-content"
            style={{ objectFit: 'cover' }}
          />
        ) : null}

        {/* Chartreuse glow */}
        <div className="iphone-screen-glow" />
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
        {content}
      </a>
    );
  }

  return content;
}
