import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const VideoLazyLoad = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [ref, inView]);

  return (
    <div ref={ref}>
      {isVisible && (
        <video
          className="absolute left-0 top-0 h-full w-full rounded-xl object-cover object-center"
          autoPlay={true}
          muted
          controls
        >
          <source src="/video/formbold.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoLazyLoad;
