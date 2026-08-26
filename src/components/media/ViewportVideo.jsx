import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ViewportVideo = ({
  src,
  poster,
  className,
  posterClassName,
  eager = false,
  rootMargin = "320px 0px",
  ariaHidden = true,
}) => {
  const videoRef = useRef(null);
  const hostRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activated, setActivated] = useState(eager);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduceMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActivated(true);
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [reduceMotion, rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    const host = hostRef.current;
    if (!video || !host || reduceMotion || !activated) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(host);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [activated, reduceMotion]);

  return (
    <div ref={hostRef} className={className} aria-hidden={ariaHidden || undefined}>
      {poster && (
        <img
          src={poster}
          alt=""
          className={posterClassName}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      )}
      {!reduceMotion && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload={eager ? "metadata" : "none"}
          poster={poster}
          src={activated ? src : undefined}
        />
      )}
    </div>
  );
};

export default ViewportVideo;
