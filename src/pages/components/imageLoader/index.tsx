import React, { useState, useEffect } from "react";
import CustomAvatar from "src/@core/components/mui/avatar";

interface ImageLoaderProps {
  src: string;
  alt: string;
}
const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoading(false);
    img.onerror = () => setError(true);
  }, [src]);

  if (loading) {
    return (
      <CustomAvatar skin="light" color={"primary"} sx={{ mr: 3, width: 34, height: 34, fontSize: "1rem" }}>
        {alt}
      </CustomAvatar>
    );
  }

  if (error) {
    return (
      <CustomAvatar skin="light" color={"primary"} sx={{ mr: 3, width: 34, height: 34, fontSize: "1rem" }}>
        {alt}
      </CustomAvatar>
    );
  }

  return <img src={src} alt={alt} style={{ marginRight: 3, width: 34, height: 34, fontSize: "1rem" }} />;
};

export default ImageLoader;
