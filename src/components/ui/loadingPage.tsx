import React from "react";
import { type LoadingPageProps } from "project-types";

const LoadingPage: React.FC<LoadingPageProps> = (LoadingPageProps) => {
  return (
    <div className="m-5 w-max bg-black p-5 text-white">
      {LoadingPageProps.text}
    </div>
  );
};

export default LoadingPage;
