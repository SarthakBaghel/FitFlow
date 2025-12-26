import { memo } from "react";
import { SparklesCore } from "@/components/ui/sparkles";

const SparklesBackground = memo(function SparklesBackground() {
  return (
    <>
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={5}
        className="absolute inset-0 w-full h-full"
        particleColor="#FFFFFF"
      />
    </>
  );
});

export default SparklesBackground;
