import React from "react";
import animationData from "../../assets/lottie/lazy-loader.json";
import Lottie from "react-lottie";

const LazyLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="lazy__loader">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};
export default LazyLoader;
