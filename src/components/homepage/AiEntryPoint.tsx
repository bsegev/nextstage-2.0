"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SparklesIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { preloadImage, preloadVideo } from '../../utils/preload';

const questions = [
  {
    question: "How do I turn my business idea into reality?",
    response: "Reduce time from idea to launch by weaving strategy and design into decision-making. We'll identify what matters most to users, then build only what creates real value."
  },
  {
    question: "What do I need to build a strong digital presence?",
    response: "Start with clarity, not complexity. Your digital footprint should tell one cohesive story across all touchpoints, making every interaction count toward building trust."
  },
  {
    question: "How can I make my brand stand out online?",
    response: "Focus on value over volume. We'll craft experiences that demonstrate expertise through results, not promises. Users remember brands that solve real problems exceptionally well."
  }
];

interface AiEntryPointProps {
  onComplete: () => void;
}

// Animation cache type
interface AnimationCache {
  [key: string]: number;
}

declare global {
  interface Window {
    __animationCache: AnimationCache;
  }
}

const assetsToPreload = {
  videos: [
    '/videos/ns_hero_bg_vid (1).mp4',
  ],
  images: [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CCFsxRTCZvCqB3oJFvQvePpyd0hO0L.png',
  ],
  fonts: [
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap',
  ]
};

export function AiEntryPoint({ onComplete }: AiEntryPointProps) {
  // Check if we've already shown the entry point in this session
  useEffect(() => {
    const hasSeenEntryPoint = sessionStorage.getItem('hasSeenEntryPoint');
    if (hasSeenEntryPoint) {
      onComplete();
      return;
    }
  }, [onComplete]);

  const [displayedText, setDisplayedText] = useState('');
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showNextIndicator, setShowNextIndicator] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mainContentProgress, setMainContentProgress] = useState(0);
  const [welcomeText, setWelcomeText] = useState('');
  const [welcomeSubtext, setWelcomeSubtext] = useState('');

  // Welcome text typing animation
  useEffect(() => {
    if (!isLoaded) return;

    const text = "Welcome to NextStage";
    const subtext = "Helping founders turn ideas into assets. Feel free to explore the common questions below or enter the site to see how we can work together.";
    let currentIndex = 0;
    let currentSubIndex = 0;
    let timeout: NodeJS.Timeout;

    const typeText = () => {
      if (currentIndex <= text.length) {
        setWelcomeText(text.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(typeText, 50);
      } else if (currentSubIndex <= subtext.length) {
        setWelcomeSubtext(subtext.slice(0, currentSubIndex));
        currentSubIndex++;
        timeout = setTimeout(typeText, 30);
      }
    };

    typeText();
    return () => clearTimeout(timeout);
  }, [isLoaded]);

  // Preload assets
  useEffect(() => {
    const totalAssets = assetsToPreload.videos.length + assetsToPreload.images.length + assetsToPreload.fonts.length;
    let loadedAssets = 0;

    const updateProgress = () => {
      loadedAssets++;
      const progress = (loadedAssets / totalAssets) * 100;
      setLoadingProgress(progress);
      if (loadedAssets === totalAssets) {
        setIsLoaded(true);
        // Start simulating main content loading progress
        simulateMainContentLoading();
      }
    };

    // Preload videos
    assetsToPreload.videos.forEach(async videoSrc => {
      try {
        await preloadVideo(videoSrc);
        updateProgress();
      } catch (err) {
        console.error('Failed to preload video:', videoSrc, err);
        updateProgress(); // Still update progress even if load fails
      }
    });

    // Preload images
    assetsToPreload.images.forEach(async imageSrc => {
      try {
        await preloadImage(imageSrc);
        updateProgress();
      } catch (err) {
        console.error('Failed to preload image:', imageSrc, err);
        updateProgress();
      }
    });

    // Preload fonts
    assetsToPreload.fonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      link.onload = updateProgress;
      link.onerror = () => {
        console.error('Failed to preload font:', fontUrl);
        updateProgress();
      };
    });

    // Initialize Framer Motion animations
    const preloadAnimations = () => {
      const animations = [
        { duration: 0.8, ease: "easeInOut" },
        { duration: 1.5, ease: "easeOut" },
        { duration: 5, ease: "easeInOut" }
      ];
      
      // Initialize animation cache
      if (typeof window !== 'undefined') {
        window.__animationCache = window.__animationCache || {};
        
        // Pre-calculate animation values
        animations.forEach(animation => {
          const { duration, ease } = animation;
          const easeFunction = typeof ease === 'string' ? 
            (t: number) => t : // Default linear ease if string
            (ease as (t: number) => number); // Use ease function if provided
            
          for (let progress = 0; progress <= 1; progress += 0.1) {
            const key = `${duration}-${ease}-${progress}`;
            if (!window.__animationCache[key]) {
              window.__animationCache[key] = easeFunction(progress);
            }
          }
        });
      }
    };

    preloadAnimations();
  }, []);

  // Simulate main content loading progress
  const simulateMainContentLoading = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
      }
      setMainContentProgress(Math.min(progress, 100));
    }, 500);
  };

  // Handle question typing animation
  useEffect(() => {
    if (isTypingResponse) return;

    const currentQuestionText = questions[currentQuestion].question;
    let timeout: NodeJS.Timeout;

    if (displayedText.length < currentQuestionText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentQuestionText.slice(0, displayedText.length + 1));
      }, 35);
    } else {
      setIsTypingDone(true);
      timeout = setTimeout(() => {
        setShowResponse(true);
        setIsTypingResponse(true);
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, currentQuestion, isTypingResponse]);

  // Handle response typing animation
  useEffect(() => {
    if (!isTypingResponse) return;

    const currentResponseText = questions[currentQuestion].response;
    let timeout: NodeJS.Timeout;

    if (displayedResponse.length < currentResponseText.length) {
      timeout = setTimeout(() => {
        setDisplayedResponse(currentResponseText.slice(0, displayedResponse.length + 1));
      }, 25);
    } else {
      timeout = setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setShowNextIndicator(true);
        }
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayedResponse, currentQuestion, isTypingResponse]);

  // Handle cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setShowResponse(false);
      setShowNextIndicator(false);
      setIsTypingDone(false);
      setIsTypingResponse(false);
      setDisplayedText('');
      setDisplayedResponse('');
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleBeginJourney = () => {
    setIsExiting(true);
    sessionStorage.setItem('hasSeenEntryPoint', 'true');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        onComplete();
      }, 50);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#1C1C1C]">
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div 
            className="fixed inset-0 bg-gradient-to-br from-[#FFFFF0] to-[#1C1C1C] z-[100] flex flex-col items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Loading indicators */}
            {!isLoaded ? (
              <div className="absolute bottom-8 left-8 font-mono text-xs text-[#FFFFF0]/60">
                Loading Assets: {Math.round(loadingProgress)}%
              </div>
            ) : mainContentProgress < 100 && (
              <div className="absolute bottom-8 left-8 font-mono text-xs text-[#FFFFF0]/60">
                Loading Site: {Math.round(mainContentProgress)}%
              </div>
            )}

            {/* Only show content when loaded */}
            {isLoaded && (
              <>
                {/* Aurora background effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="aurora-bg" style={{
                    backgroundImage: `url(${encodeURI('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CCFsxRTCZvCqB3oJFvQvePpyd0hO0L.png')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.15,
                    mixBlendMode: 'screen'
                  }} />
                  <div className="mystical-accent-1"></div>
                  <div className="mystical-accent-2"></div>
                  <div className="mystical-accent-3"></div>
                </div>

                <div className="flex flex-col items-center gap-6 md:gap-12 max-w-3xl w-full">
                  {/* Welcome Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center space-y-2 md:space-y-4"
                  >
                    <motion.h1 
                      className="text-3xl md:text-6xl text-[#FFFFF0] font-serif"
                    >
                      {welcomeText}
                      {welcomeText.length < "Welcome to NextStage".length && (
                        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}>|</span>
                      )}
                    </motion.h1>
                    <motion.p 
                      className="text-lg md:text-2xl text-[#FFFFF0]/80 font-light px-4 md:px-0"
                    >
                      {welcomeSubtext}
                      {welcomeText.length === "Welcome to NextStage".length && 
                       welcomeSubtext.length < "Helping founders turn ideas into assets. Feel free to explore the common questions below or enter the site to see how we can work together.".length && (
                        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}>|</span>
                      )}
                    </motion.p>
                  </motion.div>

                  {/* Chat Interface */}
                  {welcomeSubtext.length === "Helping founders turn ideas into assets. Feel free to explore the common questions below or enter the site to see how we can work together.".length && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="w-full relative px-4 md:px-0"
                    >
                      <div className="bg-gradient-to-br from-[#FFFFF0]/10 to-[#1C1C1C]/90 rounded-2xl shadow-2xl overflow-hidden border border-[#FFFFF0]/20 backdrop-blur-sm">
                        {/* Header */}
                        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[#FFFFF0]/20 flex items-center gap-3">
                          <SparklesIcon className="w-4 h-4 md:w-5 md:h-5 text-[#FFFFF0]/80" />
                          <span className="font-mono text-xs md:text-sm text-[#FFFFF0]/80">Strategic Design Partner</span>
                        </div>

                        {/* Chat area */}
                        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 space-y-3 md:space-y-4">
                              <motion.p 
                                key={`q-${currentQuestion}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xl md:text-2xl text-[#FFFFF0] font-serif"
                              >
                                {displayedText}
                                {!isTypingDone && (
                                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} 
                                                transition-opacity duration-75 text-[#FFFFF0]`}>|</span>
                                )}
                              </motion.p>
                              
                              {showResponse && (
                                <motion.div
                                  key={`r-${currentQuestion}`}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="space-y-3 md:space-y-4"
                                >
                                  <p className="text-base md:text-lg text-[#FFFFF0]/80">
                                    {displayedResponse}
                                    {isTypingResponse && displayedResponse.length < questions[currentQuestion].response.length && (
                                      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} 
                                                    transition-opacity duration-75 text-[#FFFFF0]`}>|</span>
                                    )}
                                  </p>
                                  
                                  {/* Show entry point after each response */}
                                  {displayedResponse.length === questions[currentQuestion].response.length && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.5 }}
                                      className="space-y-3 md:space-y-4"
                                    >
                                      <div className="h-px w-12 bg-[#FFFFF0]/50" />
                                      <div className="flex flex-col gap-2 md:gap-3">
                                        <button 
                                          onClick={handleBeginJourney}
                                          className="w-full py-2.5 md:py-3 px-4 bg-[#FFFFF0]/10 backdrop-blur-sm
                                                   rounded-lg transition-all duration-300 relative overflow-hidden 
                                                   group border border-[#FFFFF0]/20 hover:bg-[#FFFFF0]/20"
                                        >
                                          <span className="relative z-10 aurora-text-gradient font-bold block text-sm md:text-base">
                                          See Website
                                          </span>
                                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                                       transition-opacity duration-700 bg-gradient-to-r 
                                                       from-[#FFFFFF]/20 via-[#E6E9FF]/20 to-[#FFFFFF]/20" />
                                        </button>
                                        {currentQuestion < questions.length - 1 && showNextIndicator && (
                                          <button
                                            onClick={handleNextQuestion}
                                            className="text-xs md:text-sm text-[#FFFFF0]/60 hover:text-[#FFFFF0]/80 
                                                     transition-colors flex items-center justify-center gap-2"
                                          >
                                            <span>Explore another question</span>
                                            <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4" />
                                          </button>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 md:px-6 py-3 md:py-4 bg-[#1C1C1C]/70 flex justify-between items-center">
                          <span className="text-[10px] md:text-xs text-[#FFFFF0]/60 font-mono">
                            {currentQuestion + 1} / {questions.length}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 