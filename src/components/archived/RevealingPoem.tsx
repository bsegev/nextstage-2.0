import { useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const lines = [
  <>In a world of <span className="relative"><span className="relative font-medium">templates</span> and <span className="relative font-medium">AI tools</span><motion.div className="absolute -inset-1 bg-gradient-to-r from-accent-100/50 via-accent-200/50 to-accent-300/30 rounded-sm" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, margin: "-10%" }} transition={{ duration: 0.5 }} style={{ transformOrigin: 'left' }} /></span></>,
  
  <>Where <i>complexity</i> often <i>rules</i></>,
  
  <>You need <i>more</i> than just <span className="relative"><span className="relative font-medium">another solution</span><motion.div className="absolute -inset-1 bg-gradient-to-r from-accent-100/50 via-accent-200/50 to-accent-300/30 rounded-sm" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, margin: "-10%" }} transition={{ duration: 0.5 }} style={{ transformOrigin: 'left' }} /></span></>,
  
  <>You need <span className="relative"><span className="relative font-medium">clarity</span><motion.div className="absolute -inset-1 bg-gradient-to-r from-accent-100/50 via-accent-200/50 to-accent-300/30 rounded-sm" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, margin: "-10%" }} transition={{ duration: 0.5 }} style={{ transformOrigin: 'left' }} /></span> and <span className="relative"><span className="relative font-medium">execution</span><motion.div className="absolute -inset-1 bg-gradient-to-r from-accent-100/50 via-accent-200/50 to-accent-300/30 rounded-sm" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, margin: "-10%" }} transition={{ duration: 0.5 }} style={{ transformOrigin: 'left' }} /></span></>,
];

type GridPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

type GridLayout = {
  [key in GridPosition]: {
    x: number | string;
    y: number | string;
    width: number;
    height: number;
  }
};

type Drawing = {
  path: string;
  position: GridPosition;
  viewBox: string;
};

// Grid layout helper
const grid: GridLayout = {
  topLeft: { 
    x: "20vw", 
    y: "15vh", 
    width: 200, 
    height: 200 
  },
  topRight: { 
    x: "calc(80vw - 200px)", 
    y: "15vh", 
    width: 200, 
    height: 200 
  },
  bottomLeft: { 
    x: "20vw", 
    y: "calc(85vh - 200px)", 
    width: 200, 
    height: 200 
  },
  bottomRight: { 
    x: "calc(80vw - 200px)", 
    y: "calc(85vh - 200px)", 
    width: 200, 
    height: 200 
  }
};

// SVG paths for each drawing - simplified for finger drawing effect
const drawings: Record<string, Drawing> = {
  paths: {
    // Y-shaped arrow showing choice/split - simpler version
    path: "M50,10 L50,40 L20,70 M50,40 L80,70",
    position: "topLeft",
    viewBox: "0 0 100 100"
  },
  question: {
    // Simpler question mark
    path: "M30,20 C30,10 70,10 70,30 C70,50 30,50 30,70 M30,85 L30,95",
    position: "topRight",
    viewBox: "0 0 100 100"
  },
  happyFace: {
    // Simple smiley face with filled eyes, drawn in sequence: eyes -> smile -> head
    path: "M35,40 a2,2 0 1,0 0,4 a2,2 0 1,0 0,-4 M65,40 a2,2 0 1,0 0,4 a2,2 0 1,0 0,-4 M35,60 C35,70 65,70 65,60 M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
    position: "bottomLeft",
    viewBox: "0 0 100 100",
  },
  check: {
    // Simple checkmark
    path: "M20,50 L40,70 L80,20",
    position: "bottomRight",
    viewBox: "0 0 100 100"
  }
};

export function RevealingPoem() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Create smooth spring-based scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    mass: 0.1
  });

  // Pre-calculate all transforms at the top level
  const backgroundOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0.7]);
  
  // Text animation transforms
  const text1Transform = {
    opacity: useTransform(smoothProgress, [0.1, 0.15], [0, 1]),
    y: useTransform(smoothProgress, [0.1, 0.15], [20, 0])
  };
  
  const text2Transform = {
    opacity: useTransform(smoothProgress, [0.25, 0.3], [0, 1]),
    y: useTransform(smoothProgress, [0.25, 0.3], [20, 0])
  };
  
  const text3Transform = {
    opacity: useTransform(smoothProgress, [0.4, 0.45], [0, 1]),
    y: useTransform(smoothProgress, [0.4, 0.45], [20, 0])
  };
  
  const text4Transform = {
    opacity: useTransform(smoothProgress, [0.55, 0.6], [0, 1]),
    y: useTransform(smoothProgress, [0.55, 0.6], [20, 0])
  };

  const textTransforms = [text1Transform, text2Transform, text3Transform, text4Transform];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[300vh] bg-surface-50 overflow-visible will-change-transform"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-visible">
        {/* Background image - Add loading optimization */}
        <div className="absolute inset-0">
          <img 
            src="/windshield.png" 
            alt=""
            className="w-full h-full object-cover object-center opacity-90"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Frosted glass effect - base layer */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-[30px] bg-surface-50/40 will-change-[opacity,transform]"
          style={{ opacity: backgroundOpacity }}
        />
        
        {/* SVG Drawings - Add hardware acceleration hints */}
        <svg className="absolute inset-0 w-full h-full overflow-visible md:scale-100 scale-90 will-change-transform">
          <defs>
            {/* Noise filter for frosted texture */}
            <filter id="noise" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
            </filter>

            {/* Radial gradient for softer edges */}
            <radialGradient id="softEdge">
              <stop offset="0%" stopColor="black" />
              <stop offset="90%" stopColor="black" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>

            <mask id="frost-mask">
              <rect width="100%" height="100%" fill="white" filter="url(#noise)" />
              {Object.entries(drawings).map(([key, { path, position, viewBox }], index) => (
                <motion.g 
                  key={key}
                  style={{
                    transform: `translate(${
                      position === 'topRight' || position === 'bottomRight' 
                        ? 'calc(90vw - 300px)'
                        : '10vw'
                    }, ${
                      position === 'bottomLeft' || position === 'bottomRight'
                        ? 'calc(85vh - 300px)'
                        : '15vh'
                    })`
                  }}
                  className="md:translate-x-[20vw] md:last:translate-x-[calc(80vw-450px)]"
                >
                  <svg 
                    width={300} 
                    height={300} 
                    className="md:w-[450px] md:h-[450px]" 
                    viewBox={viewBox} 
                    overflow="visible"
                  >
                    {/* Main path with soft edges */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      style={{
                        opacity: useTransform(
                          smoothProgress,
                          [
                            // Start fade in slightly before drawing begins
                            index === 0 ? 0.08 : 
                            index === 1 ? 0.23 :
                            index === 2 ? 0.38 :
                            0.53,
                            // Complete fade in as drawing starts
                            index === 0 ? 0.1 : 
                            index === 1 ? 0.25 :
                            index === 2 ? 0.4 :
                            0.55
                          ],
                          [0, 1]
                        )
                      }}
                    >
                      <motion.path
                        d={path}
                        fill="none"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        style={{
                          pathLength: useTransform(
                            smoothProgress,
                            [
                              index === 0 ? 0.1 : 
                              index === 1 ? 0.25 :
                              index === 2 ? 0.4 :
                              0.55,
                              index === 0 ? 0.2 :
                              index === 1 ? 0.35 :
                              index === 2 ? 0.5 :
                              0.75
                            ],
                            [0, 1]
                          ),
                          scale: 1
                        }}
                      />
                      {/* Remove the extra circles */}
                      {key === 'happyFace' && (
                        <>
                        </>
                      )}
                    </motion.g>
                  </svg>
                </motion.g>
              ))}
            </mask>
          </defs>
        </svg>

        {/* Frost layer - Add hardware acceleration */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-[40px] overflow-visible will-change-[opacity,transform]"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
            WebkitMaskImage: 'url(#frost-mask)',
            maskImage: 'url(#frost-mask)',
            opacity: useTransform(smoothProgress, [0, 0.8], [1, 0.9])
          }}
        >
          {/* Additional noise texture */}
          <div 
            className="absolute inset-0 mix-blend-overlay opacity-70"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
              backgroundSize: '300px 300px'
            }}
          />
        </motion.div>

        {/* Text container */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-col items-center gap-6 sm:gap-8 my-20">
            {lines.map((line, index) => (
              <motion.span
                key={index}
                className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-light text-primary-900 will-change-transform"
                initial={{ opacity: 0, y: 20 }}
                style={textTransforms[index]}
              >
                {line}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 