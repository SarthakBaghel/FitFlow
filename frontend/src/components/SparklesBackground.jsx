import { memo } from "react";
import { SparklesCore } from "@/components/ui/sparkles";

const SparklesBackground = memo(function SparklesBackground() {
  return (
    <SparklesCore
      background="transparent"
      minSize={0.4}
      maxSize={1}
      particleDensity={5}
      particleColor="#FFFFFF"
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
});

export default SparklesBackground;
