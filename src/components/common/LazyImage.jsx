import { useState, useCallback } from "react";

/**
 * Optimized lazy loading image component for better performance
 */
const LazyImage = ({
  src,
  alt,
  className = "",
  fallback = "/contact-p-p.png",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      className={`${className} ${loaded ? "loaded" : "loading"}`}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;
