import Lottie from 'lottie-react';
import animationData from '../../public/lotties/linear-chart.json';

export function TransformationLoop() {
  return (
    <div className="relative w-full max-w-3xl mx-auto h-[400px] overflow-hidden">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="w-full h-full"
      />
    </div>
  );
} 