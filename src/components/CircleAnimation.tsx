"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../public/lotties/Loading Motion.json";

export function CircleAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-96 h-96">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
} 