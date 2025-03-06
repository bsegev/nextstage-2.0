'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { IconBrush, IconEraser, IconDeviceFloppy, IconArrowBack, IconArrowForward, IconTrash, IconPaint } from "@tabler/icons-react";
import Image from 'next/image';

const MAX_HISTORY = 20; // Limit history size to prevent memory bloat
const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 2000;

const colors = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000',
  '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80', '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
];

export function PlayPaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState<'brush' | 'eraser' | 'bucket'>('brush');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [showTools, setShowTools] = useState(true);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Adjust canvas height based on screen size
      if (mobile) {
        // On mobile, make canvas height responsive to viewport
        const viewportHeight = window.innerHeight;
        const toolbarHeight = 120; // Approximate height of toolbars
        setCanvasHeight(Math.min(500, viewportHeight - toolbarHeight));
      } else {
        setCanvasHeight(600); // Desktop height
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize canvas and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    contextRef.current = context;
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Save initial state
    const initialState = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setHistory([initialState]);
    setCurrentStep(0);

    // Cleanup function
    return () => {
      // Clear canvas
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      // Clear refs
      contextRef.current = null;
      // Clear history to free memory
      setHistory([]);
      setCurrentStep(-1);
    };
  }, []);

  const saveToHistory = () => {
    const context = contextRef.current;
    if (!context) return;

    const currentState = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Limit history size by removing oldest entries when exceeding MAX_HISTORY
    const newHistory = history.slice(Math.max(0, currentStep + 1 - MAX_HISTORY), currentStep + 1);
    newHistory.push(currentState);
    
    setHistory(newHistory);
    setCurrentStep(Math.min(currentStep + 1, MAX_HISTORY - 1));
  };

  const undo = () => {
    if (currentStep > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const previousState = history[currentStep - 1];
      context.putImageData(previousState, 0, 0);
      setCurrentStep(currentStep - 1);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const nextState = history[currentStep + 1];
      context.putImageData(nextState, 0, 0);
      setCurrentStep(currentStep + 1);
    }
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'my-painting.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  // Mouse event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    if (tool === 'bucket') {
      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
      return;
    }

      const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

      const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
      context.lineTo(x, y);
      context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    context.lineWidth = tool === 'eraser' ? 40 : 4;
      context.lineCap = 'round';
    context.lineJoin = 'round';
      context.stroke();
  };

  // Touch event handlers
  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling while drawing
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    if (tool === 'bucket') {
      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling while drawing
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    
    context.lineTo(x, y);
    context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    context.lineWidth = tool === 'eraser' ? 40 : 4;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      saveToHistory();
    }
    setIsDrawing(false);
  };

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setPosition({
      x: e.clientX - (containerRef.current?.offsetLeft || 0),
      y: e.clientY - (containerRef.current?.offsetTop || 0)
    });
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const left = e.clientX - position.x;
      const top = e.clientY - position.y;
      if (containerRef.current) {
        containerRef.current.style.left = `${left}px`;
        containerRef.current.style.top = `${top}px`;
      }
    }
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const setBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const toggleTools = () => {
    setShowTools(!showTools);
  };

  return (
    <>
      <section className="relative py-8 md:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-12 md:mb-16">
              {/* Label */}
              <motion.div 
                className="inline-flex items-center gap-2 sm:gap-3 mb-6"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div 
                  className="h-px w-6 sm:w-8 bg-gradient-to-r from-blue-500/80 to-purple-500/80"
                  initial={{ width: 0 }}
                  whileInView={{ width: "2rem" }}
                  transition={{ duration: 0.8 }}
                />
                <span className="font-mono text-xs sm:text-sm tracking-wider text-ethereal-dark uppercase">
                  Digital Canvas
                </span>
                <motion.div 
                  className="h-px w-6 sm:w-8 bg-gradient-to-r from-purple-500/80 to-emerald-500/80"
                  initial={{ width: 0 }}
                  whileInView={{ width: "2rem" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              {/* Main Heading with Gradient */}
              <div className="relative mb-6 sm:mb-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ethereal-dark">
                  Express Your Creativity{' '}
                  <span className="block mt-2 sm:mt-3">
                    <span className="aurora-text-gradient-light relative">
                      With Digital Paint
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </span>
                  </span>
                </h2>
              </div>

              {/* Subheading */}
              <p className="font-sans text-lg sm:text-xl text-ethereal-dark/70 max-w-3xl leading-relaxed">
                Create beautiful digital artwork with our intuitive painting tool. Perfect for sketching ideas, exploring color combinations, or just having fun.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4 md:gap-8">
              {/* Canvas Section - Full width on mobile, 2/3 width on desktop */}
              <div className="col-span-12 lg:col-span-8 order-1">
                <div 
                  ref={containerRef}
                  className="bg-ethereal-dark/95 backdrop-blur-ethereal border border-ethereal-glass-border shadow-2xl rounded-2xl mx-auto overflow-hidden" 
                  style={{ width: '100%' }}
                >
                  {/* Title Bar */}
                  <div 
                    className="bg-gradient-to-r from-blue-600/90 to-emerald-600/90 backdrop-blur-sm text-white px-4 py-2.5 flex justify-between items-center"
                    onMouseDown={isMobile ? undefined : startDragging}
                    onMouseMove={isMobile ? undefined : onDrag}
                    onMouseUp={isMobile ? undefined : stopDragging}
                    onMouseLeave={isMobile ? undefined : stopDragging}
                  >
                    <div className="flex items-center gap-3">
                      <IconBrush className="w-5 h-5 text-white/90" />
                      <span className="font-medium font-mono tracking-wide">Digital Paint</span>
                    </div>
                    {isMobile && (
                      <button 
                        onClick={toggleTools}
                        className="px-2 py-1 bg-white/10 rounded text-xs font-medium"
                      >
                        {showTools ? 'Hide Tools' : 'Show Tools'}
                      </button>
                    )}
                    {!isMobile && (
                    <div className="flex gap-2">
                      <button className="h-6 w-6 p-0 min-w-0 text-white/90 hover:bg-white/10 rounded-lg">_</button>
                      <button className="h-6 w-6 p-0 min-w-0 text-white/90 hover:bg-white/10 rounded-lg">□</button>
                      <button className="h-6 w-6 p-0 min-w-0 text-white/90 hover:bg-white/10 rounded-lg">×</button>
                    </div>
                    )}
                  </div>

                  {/* Menu Bar - Hide on mobile */}
                  {!isMobile && (
                  <div className="bg-ethereal-dark/50 border-b border-ethereal-glass-border/20 px-4 py-1.5 text-sm font-medium text-ethereal-text-secondary/80">
                    <div className="flex gap-6">
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">File</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">Edit</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">View</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">Image</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">Options</span>
                      <span className="hover:text-ethereal-text-primary cursor-pointer transition-colors">Help</span>
                    </div>
                  </div>
                  )}

                  <div className="flex flex-col md:flex-row">
                    {/* Mobile Toolbar - Horizontal on top for mobile */}
                    {isMobile && showTools && (
                      <div className="w-full bg-ethereal-dark/50 border-b border-ethereal-glass-border/20 p-2 flex justify-center gap-2">
                        <button
                          className={`w-10 h-10 p-0 min-w-0 rounded-xl transition-all duration-200 ${
                            tool === 'brush' 
                              ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 shadow-sm' 
                              : 'text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10'
                          }`}
                          onClick={() => setTool('brush')}
                        >
                          <IconBrush className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          className={`w-10 h-10 p-0 min-w-0 rounded-xl transition-all duration-200 ${
                            tool === 'eraser' 
                              ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 shadow-sm' 
                              : 'text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10'
                          }`}
                          onClick={() => setTool('eraser')}
                        >
                          <IconEraser className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          className={`w-10 h-10 p-0 min-w-0 rounded-xl transition-all duration-200 ${
                            tool === 'bucket' 
                              ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 shadow-sm' 
                              : 'text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10'
                          }`}
                          onClick={() => setTool('bucket')}
                        >
                          <IconPaint className="w-5 h-5 mx-auto" />
                        </button>
                        <div className="h-10 w-px bg-ethereal-glass-border/20 mx-1" />
                        <button
                          className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 disabled:opacity-40 transition-all duration-200"
                          onClick={undo}
                          disabled={currentStep <= 0}
                        >
                          <IconArrowBack className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 disabled:opacity-40 transition-all duration-200"
                          onClick={redo}
                          disabled={currentStep >= history.length - 1}
                        >
                          <IconArrowForward className="w-5 h-5 mx-auto" />
                        </button>
                        <div className="h-10 w-px bg-ethereal-glass-border/20 mx-1" />
                        <button
                          className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 transition-all duration-200"
                          onClick={saveCanvas}
                        >
                          <IconDeviceFloppy className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 transition-all duration-200"
                          onClick={clearCanvas}
                        >
                          <IconTrash className="w-5 h-5 mx-auto" />
                        </button>
                      </div>
                    )}

                    {/* Desktop Toolbar - Vertical on side for desktop */}
                    {!isMobile && (
                    <div className="w-14 bg-ethereal-dark/50 border-r border-ethereal-glass-border/20 p-2 flex flex-col gap-2">
                      <button
                        className={`w-10 h-10 p-0 min-w-0 rounded-xl transition-all duration-200 ${
                          tool === 'brush' 
                            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 shadow-sm' 
                            : 'text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10'
                        }`}
                        onClick={() => setTool('brush')}
                      >
                        <IconBrush className="w-5 h-5" />
                      </button>
                      <button
                        className={`w-10 h-10 p-0 min-w-0 rounded-xl transition-all duration-200 ${
                          tool === 'eraser' 
                            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 shadow-sm' 
                            : 'text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10'
                        }`}
                        onClick={() => setTool('eraser')}
                      >
                        <IconEraser className="w-5 h-5" />
                      </button>
                      <button
                        className={`w-10 h-10 p-0 min-w-0 rounded-xl transition-all duration-200 ${
                          tool === 'bucket' 
                            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 shadow-sm' 
                            : 'text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10'
                        }`}
                        onClick={() => setTool('bucket')}
                      >
                        <IconPaint className="w-5 h-5" />
                      </button>
                      <div className="h-px bg-ethereal-glass-border/20 my-2" />
                      <button
                        className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 disabled:opacity-40 transition-all duration-200"
                        onClick={undo}
                        disabled={currentStep <= 0}
                      >
                        <IconArrowBack className="w-5 h-5" />
                      </button>
                      <button
                        className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 disabled:opacity-40 transition-all duration-200"
                        onClick={redo}
                        disabled={currentStep >= history.length - 1}
                      >
                        <IconArrowForward className="w-5 h-5" />
                      </button>
                      <div className="h-px bg-ethereal-glass-border/20 my-2" />
                      <button
                        className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 transition-all duration-200"
                        onClick={saveCanvas}
                      >
                        <IconDeviceFloppy className="w-5 h-5" />
                      </button>
                      <button
                        className="w-10 h-10 p-0 min-w-0 rounded-xl text-ethereal-text-secondary hover:bg-ethereal-glass-highlight/10 transition-all duration-200"
                        onClick={clearCanvas}
                      >
                        <IconTrash className="w-5 h-5" />
                      </button>
                    </div>
                    )}

                    {/* Canvas */}
                    <div className="flex-grow bg-white" style={{ height: `${canvasHeight}px` }}>
                      <canvas
                        ref={canvasRef}
                        width={2000}
                        height={2000}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        onTouchStart={startDrawingTouch}
                        onTouchMove={drawTouch}
                        onTouchEnd={stopDrawing}
                        onTouchCancel={stopDrawing}
                        className="w-full h-full touch-none"
                      />
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="bg-ethereal-dark/50 border-t border-ethereal-glass-border/20 p-2 sm:p-3">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-1.5">
                      {colors.map((c) => (
                        <button
                          key={c}
                          className={`w-6 h-6 sm:w-8 sm:h-8 p-0 min-w-0 rounded-lg transition-all duration-200 ${
                            color === c 
                              ? 'ring-2 ring-blue-400/60 ring-offset-1 sm:ring-offset-2 ring-offset-ethereal-dark/50' 
                              : 'hover:ring-1 hover:ring-ethereal-glass-highlight/30 hover:ring-offset-1 hover:ring-offset-ethereal-dark/50'
                          }`}
                          style={{ backgroundColor: c }}
                          onClick={() => setColor(c)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Status Bar - Hide on mobile */}
                  {!isMobile && (
                  <div className="bg-ethereal-dark/50 px-4 py-2 text-sm text-ethereal-text-secondary/70 border-t border-ethereal-glass-border/20 flex justify-between items-center">
                    <span>Ready</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-ethereal-dark/30 rounded">2000 x 2000 px</span>
                      <span className="px-2 py-1 bg-ethereal-dark/30 rounded">{tool === 'brush' ? 'Brush Tool' : tool === 'eraser' ? 'Eraser Tool' : 'Bucket Tool'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions Section - Full width on mobile, 1/3 width on desktop */}
              <div className="col-span-12 lg:col-span-4 order-2 mt-4 lg:mt-0">
                <div className="bg-ethereal-dark/95 backdrop-blur-ethereal border border-ethereal-glass-border shadow-2xl rounded-2xl overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-serif text-white mb-3 sm:mb-4">Reference Guide</h3>
                    <div className="prose prose-invert">
                      <p className="text-sm sm:text-base text-ethereal-text-secondary mb-4 sm:mb-6">
                        Start with a horizon line at 1/3 height. Add mountains using triangular shapes above, varying their heights. Place a sun in one upper corner. Add trees using simple vertical lines for trunks and cloud-like shapes for foliage. Finish with small v-shaped birds in the sky.
                      </p>
                    </div>
                    
                    <div className="mt-4 sm:mt-8">
                      <h4 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">Community Showcase</h4>
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src="/images/paint_image.jpg"
                          alt="Example landscape with basic shapes"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-ethereal-text-secondary italic">
                        By @community_artist - "Mountain Sunset"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


